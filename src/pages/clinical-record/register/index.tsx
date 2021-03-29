import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientSchedule } from '../../../@types/patient';
import { RouteParams } from '../../../@types/router';
import { Message } from '../../../assets/functions';
import { Button } from '../../../assets/styles/global';
import { Spinner, Error, PatientDetails, TextArea } from '../../../components';
import PatientService from '../../../services/patient';
import ClinicalRecordService from '../../../services/clinical-record';
import { Container, Header, ButtonsArea, Content, PatientArea, ClinicalRecordArea, Form } from './styles';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { userLogged } from '../../../redux/User/User.selects';
import { BsFileCheck } from 'react-icons/bs';

interface SaveForm {
	description: string;
}

const Register = () => {
	const { id } = useParams<RouteParams>();
	const user = useSelector(userLogged);

	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [patient, setPatient] = useState<PatientSchedule>({} as PatientSchedule);
	const formRef = useRef<FormHandles>(null);

	const getPatientDetails = async () => {
		try {
			const { data } = await PatientService.getById(+id);
			setPatient(data);
		} catch {
			Message('Erro ao tentar buscar as informações do paciente', 1);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getPatientDetails();
	}, []);

	const onSubmit: SubmitHandler<SaveForm> = async (data, { reset }) => {
		setLoading(true);
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Este campo é obrigatório'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const saveData = {
				patientId: patient.id,
				description: data.description,
				employeeId: user.id,
			};

			await ClinicalRecordService.save(saveData);
			Message('Registro salvo com sucesso', 0);
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
				Message('Erro ao tentar salvar o registro clínico', 1);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{!loading && !hasError && (
				<Container>
					<Header>
						<ButtonsArea>
							<Button type='submit' form='form'>
								<BsFileCheck />
								Salvar
							</Button>
						</ButtonsArea>
					</Header>
					<Content>
						<PatientArea>
							<PatientDetails patient={patient} />
						</PatientArea>
						<ClinicalRecordArea>
							<Form onSubmit={onSubmit} id='form' ref={formRef}>
								<TextArea name='description' title='Digite o registro clínico' required />
							</Form>
						</ClinicalRecordArea>
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default Register;
