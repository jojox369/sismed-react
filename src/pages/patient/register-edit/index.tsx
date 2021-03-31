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
import { ButtonsContainerForm, ConfirmButton, Container, Content, Form, HeaderForm } from '../../../assets/styles/global';
import { Input, Select, Error, Spinner } from '../../../components';
import * as Yup from 'yup';
import HealthInsuranceService from '../../../services/health-insurance';
import HealthInsuranceTypeService from '../../../services/health-insurance-type';
import { Message } from '../../../assets/functions';

const RegisterEditPatient = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const [showInsuranceTypes, setShowInsuranceTypes] = useState(false);
	const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	const getData = async () => {
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
		if (id > 1) {
			try {
				const { data } = await HealthInsuranceTypeService.listByInsurance(id);
				setHealthInsuranceTypes(data);
				setShowInsuranceTypes(true);
			} catch {
				Message('Erro ao tentar listar os planos do convênio', 1);
			}
		} else {
			setShowInsuranceTypes(false);
		}
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	const onSubmit: SubmitHandler<Patient> = (data, { reset }) => {
		console.log(data);
		const verifyData = {
			...data,
			healthInsuranceType: {
				...data.healthInsuranceType,
				healthInsurance: {
					...data.healthInsuranceType.healthInsurance,
					id: data.nationality?.toLowerCase() === 'selecione um' ? '' : data.nationality,
				},
			},
		};
		const schema = Yup.object().shape({
			name: Yup.string().required('Este campo é obrigatório'),
			cellPhone: Yup.string(),
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
				name: Yup.string(),
				healthInsurance: Yup.object().shape({ id: Yup.string().required('Este campo é obrigatório'), name: Yup.string() }),
			}),
		});
	};

	return (
		<>
			{!loading && !hasError && (
				<Container>
					<HeaderForm>
						<ButtonsContainerForm>
							<ConfirmButton form='form'>Salvar</ConfirmButton>
						</ButtonsContainerForm>
					</HeaderForm>
					<Content>
						<Form onSubmit={onSubmit} id='form' ref={formRef}>
							<div>
								<Input name='name' label='Nome' fieldActive={false} />
								<Input name='dateBirth' label='Data de Nascimento' type='date' fieldActive={false} />
								<Input name='cpf' label='CPF' mask='cpf' fieldActive={false} />
								<Input name='rg' label='RG' mask='rg' fieldActive={false} />
								<Input name='emittingOrgan' label='Orgão Emissor' fieldActive={false} />
								<Input name='emittingDate' label='Data de Emissão' fieldActive={false} />
								<Input name='naturalness' label='Naturalidade' fieldActive={false} />
								<Select
									name='nationality'
									label='Nacionalidade'
									options={nationalityOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
								/>
							</div>
							<div>
								<Input name='phone' label='Telefone Fixo' mask='phone' fieldActive={false} />
								<Input name='jobPhone' label='Telefone do Trabalho' mask='phone' fieldActive={false} />
								<Input name='cell_number' label='Celular' mask='cellPhone' fieldActive={false} />
								<Input name='email' type='email' label='Email' fieldActive={false} />
								<Select name='sex' label='Sexo' options={sexTypeOptions()} fieldActive={false} defaultLabel='Selecione um' />
								<Select
									name='marital_status'
									label='Estado Civil'
									options={maritalStatusOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
								/>
								<Select
									name='schooling'
									label='Escolaridade'
									options={SchoolingOptions()}
									fieldActive={false}
									defaultLabel='Selecione um'
								/>
								<Input name='profession' label='Profissão' fieldActive={false} />
							</div>

							<div>
								<Input name='recommendation' label='Recomendação' fieldActive={false} />
								<Select
									onChange={e => onInsuranceChange(+e.target.value)}
									name='healthInsuranceType.healthInsurance.id'
									label='Convênio'
									fieldActive={false}
									options={healthInsurances}
									defaultLabel='Selecione um'
								/>
								{showInsuranceTypes && (
									<Select
										name='healthInsuranceType.id'
										label='Plano'
										fieldActive={false}
										options={healthInsuranceTypes}
										defaultLabel='Selecione um'
									/>
								)}
								<Input name='healthInsuranceNumber' label='Carteira Convenio' fieldActive={false} />
								<Input name='validity' type='date' label='Validade' fieldActive={false} />
								{id && <Select name='situation' label='Situação' fieldActive={false} options={situationsOptions()} />}
							</div>
							<div>
								<Input name='address.zipCode' label='CEP' mask='zipCode' fieldActive={false} />
								<Input name='address.street' label='Logradouro' fieldActive={false} disabled />
								<Input name='address.number' label='Número' fieldActive={false} disabled />
								<Input name='address.complement' label='Complemento' fieldActive={false} disabled />
								<Input name='address.district' label='Bairro' fieldActive={false} disabled />
								<Input name='address.city' label='Cidade' fieldActive={false} disabled />
								<Select
									name='address.state'
									label='Estado'
									fieldActive={false}
									options={stateOptions()}
									defaultLabel='Selecione um'
									disabled
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
