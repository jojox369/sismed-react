import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { ClinicalRegistersList } from '../../../@types/clinical-register';
import { Message } from '../../../assets/functions';
import { Button } from '../../../assets/styles/global';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import ClinicalRegisterService from '../../../services/clinical-register';
import { ButtonContainer, Container, Content, Header, SearchBox, TableText } from './styles';

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false },
	{ name: 'Data', labelText: 'Digite data do registro', active: false },
];

const columns = ['Prontuario', 'Nome', 'Quantidade'];

const ClinicalRegisterList = () => {
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
			const { data } = await ClinicalRegisterService.getAll();
			const formattedArray = data.map((clinicalRegister: ClinicalRegistersList) => {
				return {
					prontuario: (
						<TableText to={`/clinical-registers/save?patientId=${clinicalRegister.patient.id}`}>{clinicalRegister.patient.id}</TableText>
					),
					nome: clinicalRegister.patient.name,
					quantidade: clinicalRegister.amount ? clinicalRegister.amount : ' - ',
				};
			});
			setClinicalRegisters(formattedArray);
		} catch (err) {
			console.log(err);
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
					const { data } = await ClinicalRegisterService.getByPatientName(value);
					setClinicalRegisters(data);
				}
				if (activeSearchField === 1) {
					const { data } = await ClinicalRegisterService.getByPatientId(+value);
					setClinicalRegisters(data);
				}
				if (activeSearchField === 2) {
					const { data } = await ClinicalRegisterService.getByDate(value);
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
			{!loading && !hasError && (
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
						<Table
							dataSource={clinicalRegisters}
							hasNoDataLabel='Nenhum Registro encontrado'
							title='Registros Clínicos'
							columns={columns}
						/>
					</Content>
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default ClinicalRegisterList;
