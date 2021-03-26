import React, { useState } from 'react';
import { FaUserInjured } from 'react-icons/fa';
import { Message, CpfFormatter } from '../../../assets/functions';
import PatientService from '../../../services/patient';
import AutoComplete from '../../form/auto-complete';
import Input from '../../form/input';
import InformationCard from '../../information-card';
import { Container, DetailsArea } from './styles';

interface Patient {
	id: number;
	name: string;
	age?: string;
	cpf: string;
}

interface Props {
	patient: Patient;
	edit?: boolean;
}

interface FieldsActive {
	cellPhone: boolean;
	cpf: boolean;
}

const PatientDetails: React.FC<Props> = ({ patient, edit }) => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [display, setDisplay] = useState(false);
	const [showFields, setShowFields] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [patientDetails, setPatientDetails] = useState(patient);
	const [nextId, setNextId] = useState(0);
	const [fieldsActive, setFieldsActive] = useState<FieldsActive>({} as FieldsActive);

	const getNextId = async () => {
		try {
			const { data } = await PatientService.getNextId();
			setNextId(data.nextId);
		} catch {
			Message('Erro ao recuperar o prontuário do paciente', 1);
		} finally {
			setShowFields(true);
		}
	};

	const onSelectedOption = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const divId = event.currentTarget.id;
		if (divId) {
			const selectedPatient = patients.filter(patient => patient.id === +divId);
			setPatientDetails(selectedPatient[0]);
			setSearchText(selectedPatient[0].name);
			setDisplay(false);
		} else {
			setDisplay(false);
			getNextId();
		}
	};

	const onChangeSearchText = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);

		if (searchText.length > 1) {
			try {
				const { data } = await PatientService.getByName(searchText);
				setPatients(data);
				setDisplay(true);
			} catch {
				Message('Não possivel listar os pacientes', 1);
			}
		} else {
			setPatients([]);
			setDisplay(false);
		}
	};

	const preRegisterOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFieldsActive({
			...fieldsActive,
			[name.split('.')[1]]: value ? true : false,
		});
	};

	return (
		<Container>
			<FaUserInjured size='80' />
			<DetailsArea>
				{!edit ? (
					<>
						<InformationCard id='name' title='Nome' content={patientDetails.name} />
						<InformationCard id='id' title='Prontuário' content={patientDetails.id} />
						<InformationCard id='age' title='CPF' content={CpfFormatter(patientDetails.cpf)} />
						<InformationCard id='age' title='Idade' content={patientDetails.age} />
					</>
				) : (
					<>
						<AutoComplete
							dataSource={patients}
							onSelectedOption={onSelectedOption}
							display={display}
							searchText={searchText}
							onChangeText={onChangeSearchText}
							noDataLabel='Realizar Pré Cadastro'
						/>
						{patientDetails.id !== 0 && (
							<>
								<Input label='Prontuário' name='patient.id' value={patientDetails.id} fieldActive={true} readOnly />
								<InformationCard id='cpf' title='CPF' content={CpfFormatter(patientDetails.cpf)} />
								<InformationCard id='age' title='Idade' content={patientDetails.age} />
							</>
						)}
						{showFields && (
							<>
								<Input label='Prontuário' name='patient.id' defaultValue={nextId} fieldActive={true} readOnly />
								<Input label='CPF' name='patient.cpf' mask='cpf' fieldActive={fieldsActive.cpf} onChange={preRegisterOnChange} required />
								<Input
									label='Celular'
									name='patient.cellPhone'
									fieldActive={fieldsActive.cellPhone}
									onChange={preRegisterOnChange}
									mask='cellPhone'
									required
								/>
								<Input label='Data de nascimento' type='date' name='patient.dateBirth' fieldActive={false} required />
							</>
						)}
					</>
				)}
			</DetailsArea>
		</Container>
	);
};

export default PatientDetails;
