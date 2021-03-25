import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { Medic } from '../../../@types/employee';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { Procedure } from '../../../@types/procedure';
import { ScheduleDetails } from '../../../@types/schedule';
import { Button } from '../../../assets/styles/global';
import { ButtonsArea, Container, Content, EmployeeArea, Form, PatientArea, SchedulingArea } from './styles';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import ProcedureService from '../../../services/procedure';
import { Message } from '../../../assets/functions';
import { PatientDetails, EmployeeDetails, SchedulingDetails, Spinner, Error } from '../../../components';
import * as Yup from 'yup';

interface SaveForm {
	autoCompleteData: string;
	date: string;
	employeeId: string;
	healthInsurance: string;
	healthInsuranceType: string;
	procedureId: string;
	time: string;
	patient: { id: number; name: string; cellPhone: string; cpf: string };
}
const initialState = {
	id: 0,
	date: '',
	time: '',
	firstTime: 0,
	finished: 0,
	paid: 0,
	attended: 0,
	notes: '',
	employee: { id: 0, name: '', crm: '', specialty: '' },
	patient: { id: 0, name: '', cpf: '', dateBirth: '' },
	healthInsuranceType: { id: 0, name: '', healthInsurance: { id: 0, name: '' } },
	procedure: { id: 0, name: '', value: 0, healthInsurance: { id: 0, name: '' } },
};
const Register = () => {
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>(initialState);
	const [medics, setMedics] = useState<Medic[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const formRef = useRef<FormHandles>(null);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await EmployeeService.getMedics();

			setMedics(data);
		} catch {
			Message('Não foi possivel recuperar a lista de médicos', 1);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	/* **************** Employee functions ************** */
	const changeEmployee = async (id: number) => {
		try {
			const { data } = await EmployeeService.getById(id);
			setScheduling({ ...scheduling, employee: data });
		} catch {
			Message('Erro ao tentar recuperar as informações do médico', 1);
		}

		try {
			const { data } = await EmployeeService.getHealthInsurancesAccepted(id);
			setHealthInsuranceTypes(data);
		} catch {
			Message('Não foi possivel recuperar a lista de convênios aceitos pelo médico', 1);
		}
	};

	/* **************** Schedule functions ************** */
	const onHealthInsuranceChange = async (id: number, name: string) => {
		setScheduling({
			...scheduling,
			healthInsuranceType: { id: 0, name: '', healthInsurance: { ...scheduling.healthInsuranceType.healthInsurance, id, name } },
		});

		try {
			const { data } = await ProcedureService.list(id);
			setProcedures(data);
		} catch {
			Message('Não foi possivel recuperar a lista de procedimentos ', 1);
		}
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

	const onSubmit: SubmitHandler<SaveForm> = async (dataForm, { reset }) => {
		setLoading(true);
		try {
			const schema = Yup.object().shape({
				autoCompleteData: Yup.string().required('Este campo é obrigatório'),
				date: Yup.string().required('Este campo é obrigatório'),
				employeeId: Yup.string().required('Este campo é obrigatório'),
				healthInsurance: Yup.string().required('Este campo é obrigatório'),
				healthInsuranceType: Yup.string(),
				procedureId: Yup.string().required('Este campo é obrigatório'),
				time: Yup.string().required('Este campo é obrigatório'),
				patient: Yup.object().shape({
					id: Yup.string(),
					cpf: Yup.string().required('Este campo é obrigatório'),
					cellPhone: Yup.string().required('Este campo é obrigatório'),
					dateBirth: Yup.string().required('Este campo é obrigatório'),
				}),
			});

			await schema.validate(dataForm, {
				abortEarly: false,
			});

			const healthInsuranceTypeId = dataForm.healthInsuranceType ? +dataForm.healthInsuranceType : +dataForm.healthInsurance;

			const save = {
				employeeId: +dataForm.employeeId,
				healthInsuranceTypeId,
				procedureId: +dataForm.procedureId,
				date: dataForm.date,
				time: dataForm.time,
				patient: {
					...dataForm.patient,
					name: dataForm.autoCompleteData,
					cellPhone: dataForm.patient.cellPhone.replace(/\D/g, ''),
					healthInsuranceTypeId,
				},
			};

			await ScheduleService.save(save);
			Message('Paciente agendamento com sucesso', 0);
			setMedics([]);
			setHealthInsuranceTypes([]);
			setProcedures([]);
			setScheduling(initialState);
			reset();
		} catch (err) {
			const validationErrors: Record<string, any> = {};
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					validationErrors[error.path as string] = error.message;
				});
				formRef.current?.setErrors(validationErrors);
			}
			if (err.response) {
				Message('Erro ao tentar agendar o paciente', 1);
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
			{!loading && (
				<Container>
					<ButtonsArea>
						<Button form='form'>Agendar</Button>
					</ButtonsArea>
					<Content>
						<Form onSubmit={onSubmit} id='form' ref={formRef}>
							<PatientArea>
								<PatientDetails patient={scheduling.patient} edit={true} />
							</PatientArea>

							<EmployeeArea>
								<EmployeeDetails employee={scheduling.employee} changeEmployee={changeEmployee} medics={medics} edit={true} />
							</EmployeeArea>

							<SchedulingArea>
								<SchedulingDetails
									scheduling={scheduling}
									healthInsuranceTypes={healthInsuranceTypes}
									procedures={procedures}
									onSelectChange={onSelectChange}
									onHealthInsuranceChange={onHealthInsuranceChange}
									onNotesChange={onNotesChange}
									newScheduling={true}
								/>
							</SchedulingArea>
						</Form>
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default Register;
