import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import {
	CellNumberFormatter,
	CpfFormatter,
	GetAddress,
	Message,
	PhoneFormatter,
	RgFormatter,
	StringFormatter,
	ZipCodeFormatter,
} from '../../../assets/functions';
import {
	employeeTypes,
	maritalStatusOptions,
	nationalityOptions,
	schoolingOptions,
	sexTypeOptions,
	stateOptions,
} from '../../../assets/select-options';
import {
	ButtonsContainerForm,
	ConfirmButton,
	Container,
	Content,
	DangerButton,
	HeaderForm,
	PageTitle,
	Title,
	Form,
} from '../../../assets/styles/global';
import { ConfirmModal, Error, Input, Select, Spinner } from '../../../components';
import * as Yup from 'yup';
import { Employee } from '../../../@types/employee';
import { HealthInsurance } from '../../../@types/health-insurance';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import EmployeeService from '../../../services/employee';

const initialState = {
	name: '',
	cpf: '',
	rg: '',
	emittingOrgan: '',
	emittingDate: '',
	phone: '',
	cellNumber: '',
	sex: '',
	dateBirth: '',
	email: '',
	maritalStatus: '',
	schooling: '',
	naturalness: '',
	nationality: '',
	beginDate: '',
	dismissalDate: '',
	crm: '',
	specialty: '',
	recoveryCode: '',
	password: '',
	profile: { id: '', type: '' },
	address: {
		zipCode: '',
		street: '',
		number: '',
		complement: '',
		neighborhood: '',
		city: '',
		state: '',
	},
};

const RegisterEdit = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const [employee, setEmployee] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);

	const getData = async () => {
		if (id) {
			try {
				const { data } = await EmployeeService.getById(+id);
				setEmployee(data);
			} catch {
				Message('Erro ao tentar buscar as informações do funcionário', 1);
				setHasError(true);
			} finally {
				setLoading(false);
			}
		}
		/* try {
			const { data } = await HealthInsuranceService.searchAll();
			const testArray = [...data, { id: 2, name: 'Teste On Change' }];
			setHealthInsurances(testArray);
		} catch {
			Message('Erro ao tentar recuperar a lista de convenios', 1);
			setHasError(true);
		} */
	};

	const address = async (zipCodeSearch: string) => {
		if (zipCodeSearch !== '') {
			const { zipCode, street, complement, neighborhood, city, state } = await GetAddress(zipCodeSearch);
			setEmployee({ ...employee, address: { ...employee.address, zipCode, street, complement, neighborhood, city, state } });
			formRef.current?.setFieldValue('address.street', street);
			formRef.current?.setFieldValue('address.complement', complement);
			formRef.current?.setFieldValue('address.neighborhood', neighborhood);
			formRef.current?.setFieldValue('address.city', city);
			formRef.current?.setFieldValue('address.state', state);
			formRef.current?.getFieldRef('address.number').focus();
		}
	};

	const deleteEmployee = () => {
		return;
	};

	const onSubmit: SubmitHandler<Employee> = async (data, { reset }) => {
		const verifyData = {
			...data,
			sex: data.sex === 'Selecione um' ? '' : data.sex,
			maritalStatus: data.maritalStatus === 'Selecione um' ? '' : data.maritalStatus,
			nationality: data.nationality === 'Selecione um' ? '' : data.nationality,
			schooling: data.schooling === 'Selecione um' ? '' : data.schooling,
			address: {
				...data.address,
				state: data.address?.state === 'Selecione um' ? '' : data.address?.state,
			},
			profile: {
				...data.profile,
				id: data.profile.id.toString() === 'Selecione um' ? '' : data.profile.id,
			},
		};
		const schema = Yup.object().shape({
			/* Column 1 */
			name: Yup.string().required('Este campo é obrigatório'),
			dateBirth: Yup.string().required('Este campo é obrigatório'),
			cpf: Yup.string().required('Este campo é obrigatório'),
			rg: Yup.string().required('Este campo é obrigatório'),
			emittingOrgan: Yup.string().required('Este campo é obrigatório'),
			emittingDate: Yup.string().required('Este campo é obrigatório'),
			naturalness: Yup.string().required('Este campo é obrigatório'),
			nationality: Yup.string().required('Este campo é obrigatório'),

			/* Column 2 */
			beginDate: Yup.string().required('Este campo é obrigatório'),
			dismissalDate: Yup.string(),
			phone: Yup.string().required('Este campo é obrigatório'),
			cellNumber: Yup.string().required('Este campo é obrigatório'),
			email: Yup.string().required('Este campo é obrigatório'),
			sex: Yup.string().required('Este campo é obrigatório'),
			maritalStatus: Yup.string().required('Este campo é obrigatório'),
			schooling: Yup.string().required('Este campo é obrigatório'),

			/*Column 3 */
			profile: Yup.object().shape({
				id: Yup.string().required('Este campo é obrigatório'),
			}),
			specialty: Yup.string(),
			crm: Yup.string(),

			/*column 4 */
			address: Yup.object().shape({
				zipCode: Yup.string().required('Este campo é obrigatório'),
				street: Yup.string().required('Este campo é obrigatório'),
				number: Yup.string().required('Este campo é obrigatório'),
				complement: Yup.string(),
				neighborhood: Yup.string().required('Este campo é obrigatório'),
				city: Yup.string().required('Este campo é obrigatório'),
				state: Yup.string().required('Este campo é obrigatório'),
			}),
		});

		try {
			await schema.validate(verifyData, { abortEarly: false });

			setLoading(true);

			let savePatient = {
				...verifyData,

				cellNumber: verifyData.cellNumber.replace(/\D/g, ''),
				phone: verifyData.phone.replace(/\D/g, ''),
				profile: {
					id: +verifyData.profile.id,
				},
			};

			if (!id) {
				await EmployeeService.save(savePatient);

				Message('Funcionário salvo com sucesso!', 0);

				reset();
			} else {
				savePatient = { ...savePatient, id: +id };
				const { data } = await EmployeeService.update(savePatient);
				setEmployee(data);
				Message('Funcionário atualizado com sucesso!', 0);
			}

			setLoading(false);
		} catch (err) {
			const validationErrors: Record<string, any> = {};

			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					validationErrors[error.path as string] = error.message;
				});

				formRef.current?.setErrors(validationErrors);
			}

			if (err.response) {
				Message(`Erro ao tentar ${id ? 'atualizar' : 'cadastrar'} o paciente`, 1);
			}

			setLoading(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);
	return (
		<>
			{!loading && !hasError && (
				<Container>
					<ConfirmModal
						handleClose={() => setConfirmModal(false)}
						isOpen={confirmModal}
						confirmButtonTitle='Excluir'
						onClickConfirmButton={deleteEmployee}
					>
						Tem certeza que deseja excluir o paciente?
					</ConfirmModal>
					<HeaderForm>
						<PageTitle>
							<Title>
								<strong>{id ? 'Editar' : 'Cadastrar'} |</strong> Funcionário
							</Title>
						</PageTitle>
						<ButtonsContainerForm>
							<DangerButton onClick={() => setConfirmModal(true)}>Excluir</DangerButton>
							<ConfirmButton form='form'>Salvar</ConfirmButton>
						</ButtonsContainerForm>
					</HeaderForm>
					<Content>
						<Form onSubmit={onSubmit} id='form' ref={formRef}>
							<div>
								<Input
									name='name'
									label='Nome'
									mask='text'
									fieldActive={false}
									defaultValue={StringFormatter(employee.name)}
									isRequired={true}
								/>
								<Input name='dateBirth' label='Data de Nascimento' type='date' fieldActive={false} defaultValue={employee.dateBirth} />
								<Input name='cpf' label='CPF' mask='cpf' fieldActive={false} defaultValue={CpfFormatter(employee.cpf)} />
								<Input name='rg' label='RG' mask='rg' fieldActive={false} defaultValue={RgFormatter(employee.rg)} />
								<Input
									name='emittingOrgan'
									mask='text'
									label='Orgão Emissor'
									fieldActive={false}
									defaultValue={StringFormatter(employee.emittingOrgan)}
								/>
								<Input name='emittingDate' type='date' label='Data de Emissão' fieldActive={false} defaultValue={employee.emittingDate} />
								<Input
									name='naturalness'
									mask='text'
									label='Naturalidade'
									fieldActive={false}
									defaultValue={StringFormatter(employee.naturalness)}
								/>
								<Select
									name='nationality'
									label='Nacionalidade'
									options={nationalityOptions}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={employee.nationality}
								/>
							</div>
							<div>
								<Input name='beginDate' label='Data Contratação' type='date' fieldActive={false} defaultValue={employee.beginDate} />
								{id && (
									<Input name='dismissalDate' label='Data Dispensa' type='date' fieldActive={false} defaultValue={employee.dismissalDate} />
								)}
								<Input name='phone' label='Telefone Fixo' mask='phone' fieldActive={false} defaultValue={PhoneFormatter(employee.phone)} />

								<Input
									name='cellNumber'
									label='Celular'
									mask='cellPhone'
									fieldActive={false}
									defaultValue={CellNumberFormatter(employee.cellNumber)}
									isRequired={true}
								/>
								<Input
									name='email'
									type='email'
									label='Email'
									fieldActive={false}
									defaultValue={employee.email ? employee.email.toLowerCase() : ''}
								/>
								<Select
									name='sex'
									label='Sexo'
									options={sexTypeOptions}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={employee.sex}
								/>
								<Select
									name='maritalStatus'
									label='Estado Civil'
									options={maritalStatusOptions}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={employee.maritalStatus}
								/>
								<Select
									name='schooling'
									label='Escolaridade'
									options={schoolingOptions}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={employee.schooling}
								/>
							</div>

							<div>
								<Select
									name='profile.id'
									label='Tipo Funcionário'
									options={employeeTypes}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={employee.profile.id}
								/>
								{employee.profile.type.toLowerCase() !== 'outro(a)' && (
									<>
										<Input name='specialty' label='Especialidade' fieldActive={false} defaultValue={StringFormatter(employee.specialty)} />
										<Input name='crm' label='CRM' fieldActive={false} defaultValue={employee.crm} />
									</>
								)}
							</div>
							<div>
								<Input
									name='address.zipCode'
									label='CEP'
									mask='zipCode'
									fieldActive={false}
									onBlur={e => address(e.target.value)}
									defaultValue={ZipCodeFormatter(employee.address.zipCode)}
								/>
								<Input
									name='address.street'
									label='Logradouro'
									mask='text'
									fieldActive={!!employee.address.street}
									defaultValue={StringFormatter(employee.address.street)}
								/>
								<Input
									name='address.number'
									label='Número'
									mask='text'
									fieldActive={!!employee.address.number}
									defaultValue={employee.address.number}
								/>
								<Input
									name='address.complement'
									label='Complemento'
									mask='text'
									fieldActive={!!employee.address.complement}
									defaultValue={StringFormatter(employee.address.complement)}
								/>
								<Input
									name='address.neighborhood'
									label='Bairro'
									mask='text'
									fieldActive={!!employee.address.neighborhood}
									defaultValue={StringFormatter(employee.address.neighborhood)}
								/>
								<Input
									name='address.city'
									label='Cidade'
									mask='text'
									fieldActive={!!employee.address.city}
									defaultValue={StringFormatter(employee.address.city)}
								/>
								<Select
									name='address.state'
									label='Estado'
									fieldActive={false}
									options={stateOptions}
									defaultLabel='Selecione um'
									defaultValue={employee.address.state}
								/>
							</div>
						</Form>
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default RegisterEdit;
