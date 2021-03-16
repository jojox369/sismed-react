import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import { ScheduleDetails } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { ConfirmModal, EmployeeDetails, Error, PatientDetails, SchedulingDetails } from '../../../components';
import Spinner from '../../../components/spinner';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import ProcedureService from '../../../services/procedure';
import { Container, EmployeeArea, PatientArea, SchedulingArea, ButtonsArea, Content, Form } from './styles';
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
	const history = useHistory();
	const { id } = useParams<RouteParams>();
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>({} as ScheduleDetails);
	const [medics, setMedics] = useState<Employee[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const [confirmModal, setConfirmModal] = useState(false);
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

	const onSubmit: SubmitHandler<EditForm> = async dataForm => {
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

	const reschedule = async () => {
		setLoading(true);
		const date = formRef.current?.getFieldValue('date');
		const time = formRef.current?.getFieldValue('time');
		const employeeId = +formRef.current?.getFieldValue('employeeId');
		const healthInsuranceTypeId = +formRef.current?.getFieldValue('healthInsuranceType');
		const procedureId = +formRef.current?.getFieldValue('procedureId');
		const patientId = scheduling.patient.id;
		const notes = scheduling.notes;

		const schedulingData = {
			id: scheduling.id,
			date,
			time,
			employeeId,
			healthInsuranceTypeId,
			procedureId,
			patientId,
			notes,
		};

		try {
			await ScheduleService.reschedule(schedulingData);
			Message('Reagendamento realizado com sucesso', 0);
		} catch (err) {
			if (err.response.status === 409) {
				Message('Médico já possui agendamento para dia e hora informados', 1);
			}
		} finally {
			setLoading(false);
		}
	};

	const deleteScheduling = async () => {
		setLoading(true);
		setConfirmModal(false);
		try {
			await ScheduleService.delete(scheduling.id);
			history.push('/schedule');
			Message('Agendamento excluído com sucesso', 0);
		} catch {
			Message('Erro ao tentar excluir o agendamento', 1);
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
						<ConfirmModal
							handleClose={() => setConfirmModal(false)}
							isOpen={confirmModal}
							confirmButtonTitle='Excluir'
							onClickConfirmButton={deleteScheduling}
						>
							Tem certeza que deseja excluir o agendamento?
						</ConfirmModal>
						<ButtonsArea>
							{scheduling.finished === 0 && (
								<>
									<ConfirmButton form='form'>Atualizar</ConfirmButton>
									<DangerButton onClick={() => setConfirmModal(true)}>Excluir</DangerButton>
									<Button onClick={reschedule}>Remarcar</Button>
								</>
							)}
						</ButtonsArea>

						<Content>
							<PatientArea>
								<PatientDetails patient={scheduling.patient} />
							</PatientArea>
							<Form onSubmit={onSubmit} id='form' ref={formRef}>
								<EmployeeArea>
									<EmployeeDetails
										employee={scheduling.employee}
										changeEmployee={changeEmployee}
										medics={medics}
										edit={scheduling.finished === 0}
									/>
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
							</Form>
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
