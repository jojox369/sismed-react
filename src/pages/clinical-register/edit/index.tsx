import React, { useEffect, useRef, useState } from 'react';
import { Container, Header, Content, ClinicalRegisterDetails, TextAreaBox, ButtonsArea } from './styles';
import ClinicalRegisterService from '../../../services/clinical-register';
import { useHistory, useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import { BrDateFormatter, Message, TimeFormatter } from '../../../assets/functions';
import { Error, PatientDetails, Spinner, InformationCard, InformationTextArea, TextArea, ConfirmModal } from '../../../components';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Button, DangerButton } from '../../../assets/styles/global';
import { FaFileMedical } from 'react-icons/fa';
import { BsFileCheck } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import * as Yup from 'yup';

interface SaveForm {
	description: string;
}

const initialState = {
	id: 0,
	date: '',
	time: '',
	description: '',
	patient: {
		age: '',
		id: 0,
		name: '',
		cpf: '',
	},
	editable: false,
};

const Edit = () => {
	const { id } = useParams<RouteParams>();
	const history = useHistory();
	const [clinicalRegister, setClinicalRegister] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const formRef = useRef<FormHandles>(null);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await ClinicalRegisterService.getById(+id);
			setClinicalRegister(data);
		} catch {
			Message('Erro ao tentar listar as informações do registro clínico', 1);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const onSubmit: SubmitHandler<SaveForm> = async dataForm => {
		setLoading(true);
		try {
			const schema = Yup.object().shape({
				description: Yup.string().required('Este campo é obrigatório'),
			});

			await schema.validate(dataForm, {
				abortEarly: false,
			});

			const { data } = await ClinicalRegisterService.update({ id: +id, description: dataForm.description });
			setClinicalRegister({ ...clinicalRegister, description: data.description });
			Message('Registro clínico atualizado com sucesso', 0);
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const validationErrors: Record<string, any> = {};
				err.inner.forEach(error => {
					validationErrors[error.path as string] = error.message;
				});
				formRef.current?.setErrors(validationErrors);
			}
			if (err.response) {
				Message('Erro ao tentar atualizar o registro clínico', 1);
			}
		} finally {
			setLoading(false);
		}
	};

	const deleteRegister = async () => {
		setShowModal(false);
		setLoading(true);
		try {
			await ClinicalRegisterService.delete(+id);
			Message('Registro clínico excluido com sucesso', 0);
			history.push('/clinical-registers');
		} catch {
			Message('Não foi possivel excluir o registro clínico', 1);
			setLoading(false);
		}
	};

	return (
		<>
			{!loading && !hasError && (
				<Container>
					<ConfirmModal
						handleClose={() => setShowModal(false)}
						isOpen={showModal}
						confirmButtonTitle='Excluir'
						onClickConfirmButton={deleteRegister}
					>
						Tem certeza que deseja excluir o registro clínico?
					</ConfirmModal>
					<Header>
						<ButtonsArea>
							<Button form='form'>
								<BsFileCheck /> Salvar
							</Button>
							<DangerButton onClick={() => setShowModal(true)}>
								<MdDeleteForever />
								Excluir
							</DangerButton>
						</ButtonsArea>
					</Header>
					<Content>
						<PatientDetails patient={clinicalRegister.patient} />
						<ClinicalRegisterDetails>
							<FaFileMedical size='80' />
							<InformationCard id='date' title='Data' content={BrDateFormatter(clinicalRegister.date)} />
							<InformationCard id='time' title='Hora' content={TimeFormatter(clinicalRegister.time)} />
							{!clinicalRegister.editable && (
								<InformationTextArea id='description' title='Descrição' content={`${clinicalRegister.description}`} />
							)}
							<Form onSubmit={onSubmit} id='form' ref={formRef}>
								<TextAreaBox>
									{clinicalRegister.editable && (
										<TextArea title='Descrição' defaultValue={clinicalRegister.description} name='description' />
									)}
								</TextAreaBox>
							</Form>
						</ClinicalRegisterDetails>
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default Edit;
