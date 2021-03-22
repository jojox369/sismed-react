import React, { useEffect, useState } from 'react';

import { Container, Header, Content, SearchBox, TableText, ButtonContainer } from './styles';
import { SearchComponent, Error, Spinner, Table } from '../../../components';
import ClinicalRegisterService from '../../../services/clinical-register';
import { useSelector } from 'react-redux';
import { userLogged } from '../../../redux/User/User.selects';
import { CutString, DateTimeFormatter, Message } from '../../../assets/functions';
import { ClinicalRegistersList } from '../../../@types/clinical-register';
import { Button } from '../../../assets/styles/global';
import { FiPlus } from 'react-icons/fi';

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false },
	{ name: 'Data', labelText: 'Digite data do registro', active: false },
];

const columns = ['Prontuario', 'Data - Hora', 'Descrição'];

const ClinicalRegisterList = () => {
	const { id } = useSelector(userLogged);
	const [searchOptions, setSearchOptions] = useState(options);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [inputType, setInputType] = useState('text');
	const [activeSearchField, setActiveSearchField] = useState(0);
	const [clinicalRegisters, setClinicalRegisters] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await ClinicalRegisterService.getByMedic(id);
			const formattedArray = data.map((clinicalRegister: ClinicalRegistersList) => {
				return {
					prontuario: <TableText to={`/patient/${clinicalRegister.patientId}`}>{clinicalRegister.patientId}</TableText>,
					dataHora: DateTimeFormatter(clinicalRegister.date, clinicalRegister.time),
					descricacao: (
						<TableText to={`clinical-registers/${clinicalRegister.id}`}>{CutString(clinicalRegister.description, 20)}</TableText>
					),
				};
			});
			setClinicalRegisters(formattedArray);
		} catch {
			Message('Erro ao tentar listar os registros clínicos', 1);
			setHasError(true);
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
			setInputType('date');
		} else {
			setInputType('text');
		}
		setActiveSearchField(arrayPosition);
	};

	const onSearchValueChange = async (value: string) => {
		if (value) {
			try {
				if (activeSearchField === 0) {
					const { data } = await ClinicalRegisterService.getByPatientName(value, id);
					setClinicalRegisters(data);
				}
				if (activeSearchField === 1) {
					const { data } = await ClinicalRegisterService.getByPatientId(+value, id);
					setClinicalRegisters(data);
				}
				if (activeSearchField === 2) {
					const { data } = await ClinicalRegisterService.getByDate(value, id);
					setClinicalRegisters(data);
				}
			} catch {
				Message('Erro ao tentar pesquisar os registros clínicos', 1);
			}
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<Container>
				<Header>
					<SearchBox>
						<SearchComponent
							options={searchOptions}
							onClickItem={onClickSearchItem}
							inputLabel={searchInputLabel}
							inputType={inputType}
							onSearchValueChange={onSearchValueChange}
						/>
					</SearchBox>
					<ButtonContainer>
						<Button>
							<FiPlus />
							<span>Novo Registro</span>
						</Button>
					</ButtonContainer>
				</Header>
				<Content>
					{!loading && (
						<Table
							dataSource={clinicalRegisters}
							hasNoDataLabel='Nenhum Registro encontrado'
							title='Registros Clínicos'
							columns={columns}
						/>
					)}
				</Content>
			</Container>
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default ClinicalRegisterList;
