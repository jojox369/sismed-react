import React, { useEffect, useState } from 'react';
import { ClinicalRegistersList } from '../../../@types/clinical-register';
import { CutString, DateTimeFormatter, Message } from '../../../assets/functions';
import { Button } from '../../../assets/styles/global';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import ClinicalRegisterService from '../../../services/clinical-register';

import { Container, Content, Header, SearchBox, TableText, ListRegisters, ButtonContainer } from './styles';

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false },
	{ name: 'Data', labelText: 'Digite data do registro', active: false },
];

const ClinicalRegisterList = () => {
	const [searchOptions, setSearchOptions] = useState(options);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [inputType, setInputType] = useState('text');
	const [activeSearchField, setActiveSearchField] = useState(0);
	const [clinicalRegisters, setClinicalRegisters] = useState<Array<Record<string, any>>>([{}]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [columns, setColumns] = useState(['Prontuario', 'Nome', 'Quantidade']);
	const [tableTitle, setTableTitle] = useState('Registros Clínicos');
	const [showListRegistersButton, setShowListRegistersButton] = useState(false);
	const [changingState, setChangingState] = useState(false);

	const getData = async () => {
		try {
			const { data } = await ClinicalRegisterService.getAll();

			setClinicalRegisters(formatData(data));
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
					setClinicalRegisters(formatData(data));
				}
				if (activeSearchField === 1) {
					const { data } = await ClinicalRegisterService.getByPatientId(+value);
					setClinicalRegisters(formatData(data));
				}
				if (activeSearchField === 2) {
					const { data } = await ClinicalRegisterService.getByDate(value);
					setClinicalRegisters(formatData(data));
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

	const formatData = (clinicalRegisters: ClinicalRegistersList[]) => {
		return clinicalRegisters.map((clinicalRegister: ClinicalRegistersList) => {
			return {
				prontuario: (
					<TableText
						to={`/clinical-record/save/${clinicalRegister.patient.id}`}
						title='Clique para adicionar um novo registro clínico para esse paciente'
					>
						{clinicalRegister.patient.id}
					</TableText>
				),
				nome: clinicalRegister.patient.name,
				quantidade: clinicalRegister.amount ? (
					<ListRegisters
						onClick={() => showPatientRegisters(clinicalRegister.patient.id, clinicalRegister.patient.name)}
						title='Clique para listar os registros clínicos desse paciente'
					>
						{clinicalRegister.amount}
					</ListRegisters>
				) : (
					<span> - </span>
				),
			};
		});
	};

	const showPatientRegisters = async (patientId: number, patientName: string) => {
		setChangingState(true);

		try {
			const { data } = await ClinicalRegisterService.getPatientRegisters(patientId);
			const formattedData = data.map((clinicalRegister: ClinicalRegistersList) => {
				return {
					dataHora: DateTimeFormatter(clinicalRegister.date, clinicalRegister.time),
					descricao: (
						<TableText to={`clinical-record/edit/${clinicalRegister.id}`}> {CutString(clinicalRegister.description, 15)}</TableText>
					),
				};
			});
			setClinicalRegisters(formattedData);
			setColumns(['Data-Hora', 'Descrição']);
			setTableTitle(patientName);
			setShowListRegistersButton(true);
			setSearchOptions([{ name: 'Data', labelText: 'Digite data do registro', active: true }]);
			setInputType('date');
			setActiveSearchField(3);
		} catch (err) {
			Message('Erro ao tentar listar os registros do paciente selecionado', 1);
		} finally {
			setChangingState(false);
		}
	};

	const listAllRegisters = async () => {
		setChangingState(true);
		await getData();
		setShowListRegistersButton(false);
		setColumns(['Prontuario', 'Nome', 'Quantidade']);
		setTableTitle('Registros Clínicos');
		setSearchOptions(options);
		setInputType('text');
		setChangingState(false);
	};

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	return (
		<>
			{!loading && !hasError && (
				<Container>
					{!changingState && (
						<>
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
								{showListRegistersButton && (
									<ButtonContainer>
										<Button onClick={listAllRegisters}>Listar Registros</Button>
									</ButtonContainer>
								)}
							</Header>

							<Content>
								<Table dataSource={clinicalRegisters} hasNoDataLabel='Nenhum Registro encontrado' title={tableTitle} columns={columns} />
							</Content>
						</>
					)}
					{changingState && <Spinner />}
				</Container>
			)}
			{loading && <Spinner />}
			{hasError && <Error />}
		</>
	);
};

export default ClinicalRegisterList;
