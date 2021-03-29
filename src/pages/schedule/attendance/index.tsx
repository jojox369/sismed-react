import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { RouteParams } from '../../../@types/router';
import { ScheduleDetails } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { Button, ConfirmButton } from '../../../assets/styles/global';
import TextAreaComponent from '../../../components/form/TextArea';
import Spinner from '../../../components/spinner';
import ClinicalRecordService from '../../../services/clinical-record';
import ScheduleService from '../../../services/schedule';
import { Content, ButtonArea, ButtonsGroup, Container, FieldsArea, OldRegisters, PatientArea, TextArea } from './styles';
import PreviousRecordsComponent from '../../../components/clinical-record/previous-record';
import { ConfirmModal, Error, PatientDetails } from '../../../components';
import { PreviousRecords } from '../../../@types/clinical-record';

const Attendance = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();
	const [scheduling, setScheduling] = useState({} as ScheduleDetails);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [previousRecords, setPreviousRecords] = useState<PreviousRecords[]>([]);

	const [confirmModal, setConfirmModal] = useState(false);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await ScheduleService.getById(+id);
			setScheduling(data);

			getPreviousRegisters(data.patient.id, data.employee.id);
		} catch {
			Message('Não foi possível obter as informações desse agendamento', 1);
			setHasError(true);
			setLoading(false);
		}
	};

	const getPreviousRegisters = async (patientId: number, medicId: number) => {
		try {
			const { data } = await ClinicalRecordService.getPreviousRegisters(patientId, medicId);
			setPreviousRecords(data);
		} catch {
			Message('Não foi possível obter as informações dos registros anteriores do paciente', 1);
		} finally {
			setLoading(false);
		}
	};

	const finishAttendance = async () => {
		setConfirmModal(false);
		setLoading(true);

		const data = {
			id: +id,
			finished: 1,
			attended: 1,
		};
		try {
			await ScheduleService.update(data);
			history.push('/schedule');
		} catch {
			Message('Erro ao tentar finalizar o atendimento', 1);
			setLoading(false);
		}
		return;
	};

	useEffect(() => {
		getData();
	}, []);

	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Este campo é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const clinicalRegister = {
				employeeId: scheduling.employee.id,
				patientId: scheduling.patient.id,
				scheduleId: scheduling.id,
				description: formRef.current?.getFieldValue('description'),
			};

			const response = await ClinicalRecordService.save(clinicalRegister);
			const copyArray = [...previousRecords];
			copyArray.unshift(response.data);

			setPreviousRecords(copyArray);
			Message('Registro clínico salvo com sucesso', 0);
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
				Message(err.response.data.message, 1);
			}
		}
	};

	return (
		<>
			{!loading && scheduling.id && (
				<>
					<Container>
						<ConfirmModal
							handleClose={() => setConfirmModal(false)}
							isOpen={confirmModal}
							confirmButtonTitle='Finalizar'
							onClickConfirmButton={finishAttendance}
						>
							Deseja finalizar o atendimento?
						</ConfirmModal>
						<Content>
							<PatientArea>
								<PatientDetails patient={scheduling.patient} />
							</PatientArea>

							<FieldsArea>
								<TextArea>
									<Form ref={formRef} onSubmit={handleSubmit} id='form'>
										<TextAreaComponent name='description' title='Digite o registro cliníco' />
									</Form>
								</TextArea>

								<ButtonsGroup>
									<ButtonArea>
										<Button form='form'>Salvar Registro</Button>
									</ButtonArea>

									<ButtonArea>
										<ConfirmButton onClick={() => setConfirmModal(true)}>Finalizar Atendimento</ConfirmButton>
									</ButtonArea>
								</ButtonsGroup>
							</FieldsArea>
						</Content>
						<OldRegisters>
							<PreviousRecordsComponent previousRecords={previousRecords} />
						</OldRegisters>
					</Container>
				</>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default Attendance;
