import React, { useEffect, useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { RouteParams } from '../../../@types/router';
import { ScheduleAttendance } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { Button, ConfirmButton } from '../../../assets/styles/global';
import TextAreaComponent from '../../../components/form/TextArea';
import Spinner from '../../../components/spinner';
import ClinicalRegisterService from '../../../services/clinical-register';
import ScheduleService from '../../../services/schedule';
import { Main, ButtonArea, ButtonsGroup, Container, FieldsArea, OldRegisters, PatientArea, TextArea } from './styles';
import PreviousRegistersComponent from '../../../components/clinical-register/previous-registers';
import { ConfirmModal, PatientDetails } from '../../../components';
import { PreviousRegisters } from '../../../@types/clinical-register';

const Attendance = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();
	const [scheduling, setScheduling] = useState({
		id: 0,
		firstTime: 0,
		employeeId: 0,
		notes: '',
		patient: {
			id: 0,
			name: '',
			age: '',
			cellPhone: '',
		},
	} as ScheduleAttendance);
	const [loading, setLoading] = useState(false);
	const [previousRegisters, setPreviousRegisters] = useState<PreviousRegisters[]>([]);

	const [confirmModal, setConfirmModal] = useState(false);

	const getData = async () => {
		setLoading(true);
		try {
			const response = await ScheduleService.getById(+id);
			setScheduling(response.data);
			getPreviousRegisters(response.data.patient.id, response.data.employeeId);
		} catch {
			Message('Não foi possível obter as informações desse agendamento', 1);
		}
	};

	const getPreviousRegisters = async (patientId: number, medicId: number) => {
		try {
			const response = await ClinicalRegisterService.getByPatient(patientId, medicId);
			setPreviousRegisters(response.data);
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
			setLoading(false);
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
				employeeId: scheduling.employeeId,
				patientId: scheduling.patient.id,
				scheduleId: scheduling.id,
				description: formRef.current?.getFieldValue('description'),
			};

			const response = await ClinicalRegisterService.save(clinicalRegister);
			const copyArray = [...previousRegisters];
			copyArray.unshift(response.data);

			setPreviousRegisters(copyArray);
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
			{!loading ? (
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
						<Main>
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
						</Main>
						<OldRegisters>
							<PreviousRegistersComponent previousRegisters={previousRegisters} />
						</OldRegisters>
					</Container>
				</>
			) : (
				<Spinner color='#000000' />
			)}
		</>
	);
};

export default Attendance;
