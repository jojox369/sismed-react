import React, { ReactElement, useEffect, useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import { CpfFormatter, Message, StringFormatter } from '../../../assets/functions';
import { ButtonContainer, Container, Content, Header, LinkButton, SearchBox, TableLink } from '../../../assets/styles/global';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import PatientService from '../../../services/patient';

interface PatientList {
	id: number;
	name: string;
	cpf: string;
	age: string;
}

interface ListPatients {
	nome: string;
	prontuario: ReactElement;
	idade: string;
	cpf: string;
}

const columns = ['Prontuário', 'Nome', 'Idade', 'CPF'];

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false, onlyNumbers: true },
	{ name: 'CPF', labelText: 'Digite o cpf do paciente', active: false, onlyNumbers: true, maxLength: 11 },
];

const ListPatient = () => {
	const [patients, setPatients] = useState<ListPatients[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeSearchField, setActiveSearchField] = useState(0);

	const formatPatientsData = (patients: PatientList[]) => {
		const formattedData = patients.map((patient: PatientList) => ({
			nome: StringFormatter(patient.name),
			prontuario: <TableLink to={`patient/edit/${patient.id}`}>{patient.id}</TableLink>,
			idade: patient.age,
			cpf: CpfFormatter(patient.cpf),
		}));

		setPatients(formattedData);
	};

	const getData = async () => {
		try {
			const { data } = await PatientService.list();
			formatPatientsData(data);
		} catch (error) {
			console.log(error);
			setHasError(true);
			Message('Erro ao listar os pacientes', 1);
		} finally {
			setLoading(false);
		}
	};

	const onSearchValueChange = async (value: string) => {
		if (value) {
			try {
				if (activeSearchField === 0) {
					const { data } = await PatientService.getByName(value);

					formatPatientsData(data);
				}
				if (activeSearchField === 1) {
					const { data } = await PatientService.searchById(+value);
					formatPatientsData(data);
				}
				if (activeSearchField === 2) {
					const { data } = await PatientService.searchByCpf(value);
					formatPatientsData(data);
				}
			} catch {
				Message('Erro ao tentar pesquisar os pacientes', 1);
			}
		} else {
			getData();
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
					<Header>
						<SearchBox>
							<SearchComponent
								options={options}
								onClickItem={activeField => setActiveSearchField(activeField)}
								onSearchValueChange={onSearchValueChange}
							/>
						</SearchBox>
						<ButtonContainer>
							<LinkButton to='/patient/register'>
								<RiUserAddLine />
								Novo Paciente
							</LinkButton>
						</ButtonContainer>
					</Header>
					<Content>
						<Table dataSource={patients} title='Pacientes' hasNoDataLabel='Sem pacientes para listar' columns={columns} />
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default ListPatient;
