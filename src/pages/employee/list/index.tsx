import React, { useEffect, useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import { CpfFormatter, Message } from '../../../assets/functions';
import { ButtonContainer, Container, Content, Header, LinkButton, SearchBox, TableLink } from '../../../assets/styles/global';
import { SearchComponent, Spinner, Table, Error } from '../../../components';
import EmployeeService from '../../../services/employee';

interface EmployeeList {
	id: number;
	name: string;
	cpf: string;
	profile: number;
}

interface ListPatients {
	nome: string;
	matricula: React.ReactElement;
	cpf: string;
	cargo: string;
}

const columns = ['Matricula', 'Nome', 'CPF', 'Cargo'];
const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do funcionário', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do funcionário', active: false },
	{ name: 'CPF', labelText: 'Digite o cpf do funcionário', active: false },
];
const List = () => {
	const [searchOptions, setSearchOptions] = useState(options);
	const [employees, setEmployees] = useState<ListPatients[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [activeSearchField, setActiveSearchField] = useState(0);
	const [maxLength, setMaxLength] = useState(60);

	const formatData = (data: EmployeeList[]) => {
		const formattedData = data.map(employee => ({
			nome: employee.name,
			matricula: <TableLink to={`emplouee/edit/${employee.id}`}> {employee.id}</TableLink>,
			cpf: CpfFormatter(employee.cpf),
			cargo: employee.profile === 3 ? 'Funcionário(a)' : 'Médico(a)',
		}));
		setEmployees(formattedData);
	};

	const getData = async () => {
		try {
			const { data } = await EmployeeService.list();
			formatData(data);
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
							<LinkButton to='/employee/register'>
								<RiUserAddLine />
								Novo Funcionário
							</LinkButton>
						</ButtonContainer>
					</Header>
					<Content>
						<Table dataSource={employees} title='Funcionários' hasNoDataLabel='Sem funcionários para listar' columns={columns} />
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default List;
