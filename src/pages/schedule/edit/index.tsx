import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import { ScheduleDetails } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { EmployeeDetails, Error, PatientDetails, SchedulingDetails } from '../../../components';
import Spinner from '../../../components/spinner';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import ProcedureService from '../../../services/procedure';
import { Container, EmployeeArea, PatientArea, SchedulingArea, ButtonsArea, Content, CustomForm } from './styles';
import { Employee } from '../../../@types/employee';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { Button, DangerButton, ConfirmButton } from '../../../assets/styles/global';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Procedure } from '../../../@types/procedure';
import * as Yup from 'yup';

interface EditForm {
	attended: string;
	date: string;
	employeeId: string;
	healthInsurance: string;
	healthInsuranceType: string;
	paid: string;
	procedureId: string;
	time: string;
}

const Edit = () => {
	const { id } = useParams<RouteParams>();
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>({} as ScheduleDetails);
	const [medics, setMedics] = useState<Employee[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const formRef = useRef<FormHandles>(null);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await ScheduleService.getById(+id);
			getArrays(data.employee.id, data.healthInsuranceType.healthInsurance.id);
			setScheduling(data);
		} catch {
			Message('Não foi possivel recuperar as informações do agendamento', 1);
			setHasError(true);
			setLoading(false);
		}
	};

	const getArrays = async (medicId: number, healthInsuranceId: number) => {
		try {
			const { data } = await EmployeeService.getMedics();

			setMedics(data);
		} catch {
			Message('Não foi possivel recuperar a lista de médicos', 1);
		}
		try {
			const { data } = await EmployeeService.getHealthInsurancesAccepted(medicId);
			setHealthInsuranceTypes(data);
		} catch {
			Message('Não foi possivel recuperar a lista de convênios aceitos pelo médico', 1);
		}

		try {
			const { data } = await ProcedureService.list(healthInsuranceId);
			setProcedures(data);
		} catch {
			Message('Não foi possivel recuperar a lista de procedimentos ', 1);
		} finally {
			setLoading(false);
		}
	};

	const changeEmployee = async (id: number) => {
		try {
			const { data } = await EmployeeService.getById(id);
			setScheduling({ ...scheduling, employee: data });
		} catch {
			Message('Erro ao tentar recuperar as informações do médico', 1);
		}
	};

	const onHealthInsuranceChange = (id: number, name: string) => {
		setScheduling({
			...scheduling,
			healthInsuranceType: { id: 0, name: '', healthInsurance: { ...scheduling.healthInsuranceType.healthInsurance, id, name } },
		});
	};

	const onSelectChange = (id: number, name: string) => {
		setScheduling({
			...scheduling,
			healthInsuranceType: { ...scheduling.healthInsuranceType, id, name },
		});
	};

	const onNotesChange = (notes: string) => {
		setScheduling({ ...scheduling, notes });
	};

	const onSubmit: SubmitHandler<EditForm> = async (dataForm, { reset }) => {
		setLoading(true);
		try {
			const schema = Yup.object().shape({
				attended: Yup.string().required('Este campo é obrigatório'),
				date: Yup.string().required('Este campo é obrigatório'),
				employeeId: Yup.string().required('Este campo é obrigatório'),
				healthInsurance: Yup.string().required('Este campo é obrigatório'),
				healthInsuranceType: Yup.string().required('Este campo é obrigatório'),
				paid: Yup.string().required('Este campo é obrigatório'),
				procedureId: Yup.string().required('Este campo é obrigatório'),
				time: Yup.string().required('Este campo é obrigatório'),
			});

			await schema.validate(dataForm, {
				abortEarly: false,
			});
			const updateScheduling = {
				id: scheduling.id,
				attended: +dataForm.attended,
				employeeId: +dataForm.employeeId,
				healthInsurance: +dataForm.healthInsurance,
				healthInsuranceType: +dataForm.healthInsuranceType,
				paid: +dataForm.paid,
				procedureId: +dataForm.procedureId,
				date: dataForm.date,
				time: dataForm.time,
				notes: scheduling.notes,
			};

			const { data } = await ScheduleService.update(updateScheduling);
			setScheduling(data);
			Message('Agendamento atualizado com sucesso com sucesso', 0);
		} catch (err) {
			const validationErrors: Record<string, any> = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					validationErrors[error.path as string] = error.message;
				});
				formRef.current?.setErrors(validationErrors);
			}
			if (err.response) {
				Message(err.response.data.message, 1);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{!loading && scheduling.id && (
				<>
					<Container>
						<ButtonsArea>
							<ConfirmButton form='form'>Atualizar</ConfirmButton>
							<DangerButton>Excluir</DangerButton>
							<Button>Remarcar</Button>
						</ButtonsArea>
						<Content>
							<PatientArea>
								<PatientDetails patient={scheduling.patient} />
							</PatientArea>
							<CustomForm onSubmit={onSubmit} id='form' ref={formRef}>
								<EmployeeArea>
									<EmployeeDetails employee={scheduling.employee} changeEmployee={changeEmployee} medics={medics} />
								</EmployeeArea>

								<SchedulingArea>
									<SchedulingDetails
										scheduling={scheduling}
										healthInsuranceTypes={healthInsuranceTypes}
										procedures={procedures}
										onSelectChange={onSelectChange}
										onHealthInsuranceChange={onHealthInsuranceChange}
										onNotesChange={onNotesChange}
									/>
								</SchedulingArea>
							</CustomForm>
						</Content>
					</Container>
				</>
			)}{' '}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default Edit;
