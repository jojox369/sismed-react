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
import { Input, Select } from '../../../components';

const initialState = {
	id: 0,
	name: '',
	cellPhone: '',
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
	address: { zipCode: '', street: '', number: 0, complement: '', district: '', city: '', state: '' },
	healthInsuranceType: { id: 0, name: '', healthInsurance: { id: 0, name: '' } },
};

const RegisterEditPatient = () => {
	const { id } = useParams<RouteParams>();
	const formRef = useRef<FormHandles>(null);
	const [patient, setPatient] = useState(initialState);
	const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);

	const onSubmit: SubmitHandler<Patient> = (data, { reset }) => {
		console.log(data.healthInsuranceType.id);
	};

	useEffect(() => {
		setPatient({
			...patient,
			healthInsuranceType: { ...patient.healthInsuranceType, healthInsurance: { ...patient.healthInsuranceType.healthInsurance, id: 0 } },
		});
	}, []);
	return (
		<Container>
			<HeaderForm>
				<ButtonsContainerForm>
					<ConfirmButton form='form'>Salvar</ConfirmButton>
				</ButtonsContainerForm>
			</HeaderForm>
			<Content>
				<Form onSubmit={onSubmit} id='form' ref={formRef}>
					<div>
						<Input name='name' label='Nome' fieldActive={false} required />
						<Input name='dateBirth' label='Data de Nascimento' type='date' fieldActive={false} />
						<Input name='cpf' label='CPF' mask='cpf' fieldActive={false} required />
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
						<Input name='cell_number' label='Celular' mask='cellPhone' fieldActive={false} required />
						<Input name='email' type='email' label='Email' fieldActive={false} />
						<Select name='sex' label='Sexo' options={sexTypeOptions()} fieldActive={false} defaultLabel='Selecione um' />
						<Select
							name='marital_status'
							label='Estado Civil'
							options={maritalStatusOptions()}
							fieldActive={false}
							defaultLabel='Selecione um'
						/>
						<Select name='schooling' label='Escolaridade' options={SchoolingOptions()} fieldActive={false} defaultLabel='Selecione um' />
						<Input name='profession' label='Profissão' fieldActive={false} />
					</div>

					<div>
						<Input name='recommendation' label='Recomendação' fieldActive={false} />
						<Select
							name='healthInsuranceType.healthInsurance.id'
							label='Convênio'
							fieldActive={false}
							options={healthInsurances}
							defaultLabel='Selecione um'
							required
						/>
						{patient.healthInsuranceType.healthInsurance.id > 1 && (
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
						<Input name='zipCode' label='CEP' mask='zipCode' fieldActive={false} />
						<Input name='street' label='Logradouro' fieldActive={false} disabled />
						<Input name='number' label='Número' fieldActive={false} disabled />
						<Input name='complement' label='Complemento' fieldActive={false} disabled />
						<Input name='district' label='Bairro' fieldActive={false} disabled />
						<Input name='city' label='Cidade' fieldActive={false} disabled />
						<Select name='state' label='Estado' fieldActive={false} options={stateOptions()} defaultLabel='Selecione um' disabled />
					</div>
				</Form>
			</Content>
		</Container>
	);
};

export default RegisterEditPatient;
