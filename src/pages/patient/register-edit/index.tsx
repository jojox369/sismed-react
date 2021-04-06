import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../../@types/patient';
import { HealthInsurance } from '../../../@types/health-insurance';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { RouteParams } from '../../../@types/router';
import {
	maritalStatusOptions,
	nationalityOptions,
	SchoolingOptions,
	sexTypeOptions,
	situationsOptions,
	stateOptions,
} from '../../../assets/select-options';
import {
	ButtonsContainerForm,
	ConfirmButton,
	Container,
	Content,
	DangerButton,
	Form,
	HeaderForm,
	PageTitle,
	Title,
} from '../../../assets/styles/global';
import { Input, Select, Error, Spinner } from '../../../components';
import * as Yup from 'yup';
import HealthInsuranceService from '../../../services/health-insurance';
import HealthInsuranceTypeService from '../../../services/health-insurance-type';
import PatientService from '../../../services/patient';
import {
	Message,
	GetAddress,
	StringFormatter,
	CpfFormatter,
	RgFormatter,
	PhoneFormatter,
	CellNumberFormatter,
	ZipCodeFormatter,
} from '../../../assets/functions';

const initialState = {
	id: 0,
	name: '',
	cellNumber: '',
	cpf: '',
	dateBirth: '',
	email: '',
	emittingDate: '',
	emittingOrgan: '',
	healthInsuranceNumber: '',
	jobPhone: '',
	maritalStatus: '',
	nationality: '',
	naturalness: '',
	phone: '',
	profession: '',
	recommendation: '',
	rg: '',
	schooling: '',
	sex: '',
	situation: '',
	validity: '',
	address: {
		zipCode: '',
		street: '',
		number: '',
		complement: '',
		neighborhood: '',
		city: '',
		state: '',
	},
	healthInsuranceType: { id: 0, name: '', healthInsurance: { id: 0, name: '' } },
};

const RegisterEditPatient = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const [patient, setPatient] = useState(initialState);
	const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const getData = async () => {
		if (id) {
			try {
				const { data } = await PatientService.getById(+id);
				setPatient(data);
			} catch {
				Message('Erro ao tentar buscar as informações do paciente', 1);
				setHasError(true);
			}
		}
		try {
			const { data } = await HealthInsuranceService.searchAll();
			const testArray = [...data, { id: 2, name: 'Teste On Change' }];
			setHealthInsurances(testArray);
		} catch {
			Message('Erro ao tentar recuperar a lista de convenios', 1);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	const onInsuranceChange = async (id: number) => {
		setPatient({
			...patient,
			healthInsuranceType: { ...patient.healthInsuranceType, healthInsurance: { ...patient.healthInsuranceType.healthInsurance, id } },
		});
		if (id > 1) {
			try {
				const { data } = await HealthInsuranceTypeService.listByInsurance(id);
				setHealthInsuranceTypes(data);
			} catch {
				Message('Erro ao tentar listar os planos do convênio', 1);
			}
		}
		const errors = formRef.current?.getErrors();
		formRef.current?.setErrors({ ...errors, 'healthInsuranceType.healthInsurance.id': '' });
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	const address = async (zipCodeSearch: string) => {
		if (zipCodeSearch !== '') {
			const { zipCode, street, complement, neighborhood, city, state } = await GetAddress(zipCodeSearch);
			setPatient({ ...patient, address: { ...patient.address, zipCode, street, complement, neighborhood, city, state } });
			formRef.current?.setFieldValue('address.street', street);
			formRef.current?.setFieldValue('address.complement', complement);
			formRef.current?.setFieldValue('address.neighborhood', neighborhood);
			formRef.current?.setFieldValue('address.city', city);
			formRef.current?.setFieldValue('address.state', state);
			formRef.current?.getFieldRef('address.number').focus();
		}
	};

	const onSubmit: SubmitHandler<Patient> = async (data, { reset }) => {
		const verifyData = {
			...data,
			sex: data.sex === 'Selecione um' ? '' : data.sex,
			maritalStatus: data.maritalStatus === 'Selecione um' ? '' : data.maritalStatus,
			nationality: data.nationality === 'Selecione um' ? '' : data.nationality,
			schooling: data.schooling === 'Selecione um' ? '' : data.schooling,
			healthInsuranceType: {
				...data.healthInsuranceType,
				healthInsurance: {
					...data.healthInsuranceType?.healthInsurance,
					id:
						data.healthInsuranceType.healthInsurance.id?.toString().toLowerCase() === 'Selecione um'
							? ''
							: data.healthInsuranceType.healthInsurance.id?.toString(),
				},
			},
			address: {
				...data.address,
				state: data.address?.state === 'Selecione um' ? '' : data.address?.state,
			},
		};
		const schema = Yup.object().shape({
			name: Yup.string().required('Este campo é obrigatório'),
			cellNumber: Yup.string().required('Este campo é obrigatório'),
			cpf: Yup.string(),
			dateBirth: Yup.string(),
			email: Yup.string(),
			emittingDate: Yup.string(),
			emittingOrgan: Yup.string(),
			healthInsuranceNumber: Yup.string(),
			jobPhone: Yup.string(),
			maritalStatus: Yup.string(),
			nationality: Yup.string(),
			naturalness: Yup.string(),
			phone: Yup.string(),
			profession: Yup.string(),
			recommendation: Yup.string(),
			rg: Yup.string(),
			schooling: Yup.string(),
			sex: Yup.string(),
			situation: Yup.string(),
			validity: Yup.string(),
			address: Yup.object().shape({
				zipCode: Yup.string(),
				street: Yup.string(),
				number: Yup.string(),
				complement: Yup.string(),
				district: Yup.string(),
				city: Yup.string(),
				state: Yup.string(),
			}),
			healthInsuranceType: Yup.object().shape({
				id: Yup.string(),
				healthInsurance: Yup.object().shape({ id: Yup.string().required('Este campo é obrigatório') }),
			}),
		});

		try {
			await schema.validate(verifyData, { abortEarly: false });

			setLoading(true);

			let savePatient = {
				...verifyData,

				cellNumber: verifyData.cellNumber.replace(/\D/g, ''),
				phone: verifyData.phone.replace(/\D/g, ''),
				jobPhone: verifyData.jobPhone?.replace(/\D/g, ''),
				healthInsuranceTypeId:
					data.healthInsuranceType.healthInsurance.id.toString() === '1'
						? +data.healthInsuranceType.healthInsurance.id
						: +data.healthInsuranceType.id,
			};

			if (!id) {
				await PatientService.save(savePatient);

				Message('Paciente salvo com sucesso!', 0);

				reset();
			} else {
				savePatient = { ...savePatient, id: +id };
				const { data } = await PatientService.update(savePatient);
				setPatient(data);
				Message('Paciente atualizado com sucesso!', 0);
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

	return (
		<>
			{!loading && !hasError && (
				<Container>
					<HeaderForm>
						<PageTitle>
							<Title>
								<strong>{id ? 'Editar' : 'Cadastrar'} |</strong> Paciente
							</Title>
						</PageTitle>
						<ButtonsContainerForm>
							<DangerButton>Excluir</DangerButton>
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
									defaultValue={StringFormatter(patient.name)}
									isRequired={true}
								/>
								<Input name='dateBirth' label='Data de Nascimento' type='date' fieldActive={false} defaultValue={patient.dateBirth} />
								<Input name='cpf' label='CPF' mask='cpf' fieldActive={false} defaultValue={CpfFormatter(patient.cpf)} />
								<Input name='rg' label='RG' mask='rg' fieldActive={false} defaultValue={RgFormatter(patient.rg)} />
								<Input
									name='emittingOrgan'
									mask='text'
									label='Orgão Emissor'
									fieldActive={false}
									defaultValue={StringFormatter(patient.emittingOrgan)}
								/>
								<Input name='emittingDate' type='date' label='Data de Emissão' fieldActive={false} defaultValue={patient.emittingDate} />
								<Input
									name='naturalness'
									mask='text'
									label='Naturalidade'
									fieldActive={false}
									defaultValue={StringFormatter(patient.naturalness)}
								/>
								<Select
									name='nationality'
									label='Nacionalidade'
									options={nationalityOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={patient.nationality}
								/>
							</div>
							<div>
								<Input name='phone' label='Telefone Fixo' mask='phone' fieldActive={false} defaultValue={PhoneFormatter(patient.phone)} />
								<Input
									name='jobPhone'
									label='Telefone do Trabalho'
									mask='phone'
									fieldActive={false}
									defaultValue={PhoneFormatter(patient.jobPhone)}
								/>
								<Input
									name='cellNumber'
									label='Celular'
									mask='cellPhone'
									fieldActive={false}
									defaultValue={CellNumberFormatter(patient.cellNumber)}
									isRequired={true}
								/>
								<Input
									name='email'
									type='email'
									label='Email'
									fieldActive={false}
									defaultValue={patient.email ? patient.email.toLowerCase() : ''}
								/>
								<Select
									name='sex'
									label='Sexo'
									options={sexTypeOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={patient.sex}
								/>
								<Select
									name='maritalStatus'
									label='Estado Civil'
									options={maritalStatusOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={patient.maritalStatus}
								/>
								<Select
									name='schooling'
									label='Escolaridade'
									options={SchoolingOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
									defaultValue={patient.schooling}
								/>
								<Input name='profession' label='Profissão' fieldActive={false} defaultValue={StringFormatter(patient.profession)} />
							</div>

							<div>
								<Input
									name='recommendation'
									label='Recomendação'
									fieldActive={false}
									defaultValue={StringFormatter(patient.recommendation)}
								/>
								<Select
									onChange={e => onInsuranceChange(+e.target.value)}
									name='healthInsuranceType.healthInsurance.id'
									label='Convênio'
									fieldActive={false}
									options={healthInsurances}
									defaultLabel='Selecione um'
									defaultValue={patient.healthInsuranceType.healthInsurance.id}
									isRequired={true}
								/>
								{patient.healthInsuranceType.healthInsurance.id > 1 && (
									<Select
										name='healthInsuranceType.id'
										label='Plano'
										fieldActive={false}
										options={healthInsuranceTypes}
										defaultLabel='Selecione um'
										defaultValue={patient.healthInsuranceType.id}
									/>
								)}
								{patient.healthInsuranceType.healthInsurance.id > 1 && (
									<>
										<Input
											name='healthInsuranceNumber'
											label='Carteira Convenio'
											fieldActive={false}
											defaultValue={patient.healthInsuranceNumber}
										/>
										<Input name='validity' type='date' label='Validade' fieldActive={false} defaultValue={patient.validity} />
									</>
								)}
								{id && (
									<Select
										name='situation'
										label='Situação'
										fieldActive={false}
										options={situationsOptions()}
										defaultValue={patient.situation}
									/>
								)}
							</div>
							<div>
								<Input
									name='address.zipCode'
									label='CEP'
									mask='zipCode'
									fieldActive={false}
									onBlur={e => address(e.target.value)}
									defaultValue={ZipCodeFormatter(patient.address.zipCode)}
								/>
								<Input
									name='address.street'
									label='Logradouro'
									fieldActive={!!patient.address.street}
									defaultValue={StringFormatter(patient.address.street)}
								/>
								<Input name='address.number' label='Número' fieldActive={!!patient.address.number} defaultValue={patient.address.number} />
								<Input
									name='address.complement'
									label='Complemento'
									fieldActive={!!patient.address.complement}
									defaultValue={StringFormatter(patient.address.complement)}
								/>
								<Input
									name='address.neighborhood'
									label='Bairro'
									fieldActive={!!patient.address.neighborhood}
									defaultValue={StringFormatter(patient.address.neighborhood)}
								/>
								<Input
									name='address.city'
									label='Cidade'
									fieldActive={!!patient.address.city}
									defaultValue={StringFormatter(patient.address.city)}
								/>
								<Select
									name='address.state'
									label='Estado'
									fieldActive={false}
									options={stateOptions()}
									defaultLabel='Selecione um'
									defaultValue={patient.address.state}
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

export default RegisterEditPatient;
