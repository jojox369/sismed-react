import React, { useEffect, useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import { CellNumberFormatter, Message } from '../../../assets/functions';
import { ButtonContainer, Container, Content, Header, LinkButton, SearchBox } from '../../../assets/styles/global';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import PatientService from '../../../services/patient';

interface PatientList {
	id: number;
	name: string;
	cellNumber: string;
	age: string;
}

const columns = ['Prontuário', 'Nome', 'Idade', 'Celular'];

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false },
	{ name: 'CPF', labelText: 'Digite o cpf do paciente', active: false },
];

const ListPatient = () => {
	const [searchOptions, setSearchOptions] = useState(options);
	const [patients, setPatients] = useState<PatientList[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [activeSearchField, setActiveSearchField] = useState(0);
	const [maxLength, setMaxLength] = useState(60);

	const getData = async () => {
		try {
			const { data } = await PatientService.list();
			const formattedData = data.map((patient: PatientList) => ({
				...patient,
				cellNumber: CellNumberFormatter(patient.cellNumber),
			}));

			setPatients(formattedData);
		} catch (error) {
			console.log(error);
			setHasError(true);
			Message('Erro ao listar os pacientes', 1);
		} finally {
			setLoading(false);
		}
	};

	const onClickSearchItem = (arrayPosition: number) => {
		const arrayCopy = searchOptions.map(element => {
			if (element.active) {
				element.active = false;
			}
			return element;
		});
		arrayCopy[arrayPosition].active = true;
		setSearchOptions(arrayCopy);
		setSearchInputLabel(arrayCopy[arrayPosition].labelText);
		if (arrayPosition === 2) {
			setMaxLength(11);
		} else {
			setMaxLength(60);
		}
		setActiveSearchField(arrayPosition);
	};

	const onSearchValueChange = async (value: string) => {
		if (value) {
			try {
				if (activeSearchField === 0) {
					return;
				}
				if (activeSearchField === 1) {
					return;
				}
				if (activeSearchField === 2) {
					return;
				}
				if (activeSearchField === 3) {
					alert(value);
				}
			} catch {
				Message('Erro ao tentar pesquisar os registros clínicos', 1);
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
								options={searchOptions}
								onClickItem={onClickSearchItem}
								inputLabel={searchInputLabel}
								onSearchValueChange={onSearchValueChange}
								inputMaxLength={maxLength}
							/>
						</SearchBox>
						<ButtonContainer>
							<LinkButton to='#'>
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
