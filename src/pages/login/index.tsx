import React, { useRef, useState } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form, FormHeader, Field } from './styles';

import { Input } from '../../components/form';
import { Container } from './styles';
import * as Yup from 'yup';
import { Button } from '../../assets/styles/global';
import Spinner from '../../components/spinner';
import UserService from '../../services/user';
import { Message } from '../../assets/functions';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/User/User.actions';

interface FormData {
	username: string;
	password: string;
}

interface Fields {
	username: boolean;
	password: boolean;
}

const LoginPage = () => {
	const formRef = useRef<FormHandles>(null);
	const dispatch = useDispatch();
	const [fieldsActives, setFieldsActives] = useState<Fields>({} as Fields);
	const [buttonEnable, setButtonEnable] = useState(true);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;

		setFieldsActives({
			...fieldsActives,
			[name]: true,
		});
	};

	const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
		setButtonEnable(false);
		try {
			const schema = Yup.object().shape({
				username: Yup.string().required('Este campo é obrigatório'),
				password: Yup.string().required('Este campo é obrigatório'),
			});
			await schema.validate(data, {
				abortEarly: false,
			});
			const response = await UserService.auth(data);
			dispatch(login(response.data));
			reset();
		} catch (err) {
			setButtonEnable(true);
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
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<FormHeader>
					<p>Bem-vindo</p>
					<p>Realize o seu login para continuar</p>
				</FormHeader>
				<Field>
					<Input name='username' id='username' label='CPF' mask='cpf' fieldActive={fieldsActives.username} onChange={onChange} />
				</Field>

				<Field>
					<Input type='password' name='password' id='password' label='Senha' fieldActive={fieldsActives.password} onChange={onChange} />
				</Field>

				<Field>
					<Button type='submit' disabled={!buttonEnable}>
						{buttonEnable && 'Acessar'}
						{!buttonEnable && <Spinner />}
					</Button>
				</Field>
			</Form>
		</Container>
	);
};

export default LoginPage;
