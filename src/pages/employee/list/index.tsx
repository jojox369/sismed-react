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

const columns = ['Matrícula', 'Nome', 'CPF', 'Cargo'];
const options = [
	{ name: 'Funcionário', labelText: 'Digite o nome do funcionário', active: true, onlyNumbers: false },
	{ name: 'Matrícula', labelText: 'Digite a matricula do funcionário', active: false, onlyNumbers: true },
	{ name: 'CPF', labelText: 'Digite o cpf do funcionário', active: false, mask: 'cpf', maxLength: 11, onlyNumbers: true },
];
const List = () => {
	const [employees, setEmployees] = useState<ListPatients[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeSearchField, setActiveSearchField] = useState(0);

	const formatData = (data: EmployeeList[]) => {
		const formattedData = data.map(employee => ({
			nome: employee.name,
			matricula: <TableLink to={`employee/edit/${employee.id}`}> {employee.id}</TableLink>,
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
					const { data } = await EmployeeService.searchByName(value);
					formatData(data);
				}
				if (activeSearchField === 1) {
					const { data } = await EmployeeService.searchById(+value);
					formatData(data);
				}
				if (activeSearchField === 2) {
					const { data } = await EmployeeService.searchByCpf(value);
					formatData(data);
				}
			} catch {
				Message('Erro ao tentar pesquisar os funcionários', 1);
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
