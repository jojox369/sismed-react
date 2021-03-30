import React, { useEffect, useState } from 'react';
import { ClinicalRecordsList } from '../../../@types/clinical-record';
import { CutString, DateTimeFormatter, Message, StringFormatter } from '../../../assets/functions';
import { Button } from '../../../assets/styles/global';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import ClinicalRecordService from '../../../services/clinical-record';

import { Container, Content, Header, SearchBox, TableLink, ButtonContainer } from '../../../assets/styles/global';
import { ListRegisters } from './styles';
import { RiUserReceivedLine } from 'react-icons/ri';

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
	const [clinicalRegisters, setClinicalRecords] = useState<Array<Record<string, any>>>([{}]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [columns, setColumns] = useState(['Prontuario', 'Nome', 'Quantidade']);
	const [tableTitle, setTableTitle] = useState('Registros Clínicos');
	const [showListPatientsButton, setShowListPatientsButton] = useState(false);
	const [changingState, setChangingState] = useState(false);

	const getData = async () => {
		try {
			const { data } = await ClinicalRecordService.getAll();

			setClinicalRecords(formatData(data));
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
					const { data } = await ClinicalRecordService.getByPatientName(value);
					setClinicalRecords(formatData(data));
				}
				if (activeSearchField === 1) {
					const { data } = await ClinicalRecordService.getByPatientId(+value);
					setClinicalRecords(formatData(data));
				}
				if (activeSearchField === 2) {
					const { data } = await ClinicalRecordService.getByDate(value);
					setClinicalRecords(formatData(data));
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

	const formatData = (clinicalRegisters: ClinicalRecordsList[]) => {
		return clinicalRegisters.map((clinicalRegister: ClinicalRecordsList) => {
			return {
				prontuario: (
					<TableLink
						to={`/clinical-record/save/${clinicalRegister.patient.id}`}
						title='Clique para adicionar um novo registro clínico para esse paciente'
					>
						{clinicalRegister.patient.id}
					</TableLink>
				),
				nome: StringFormatter(clinicalRegister.patient.name),
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
			const { data } = await ClinicalRecordService.getPatientRegisters(patientId);
			const formattedData = data.map((clinicalRegister: ClinicalRecordsList) => {
				return {
					dataHora: DateTimeFormatter(clinicalRegister.date, clinicalRegister.time),
					descricao: (
						<TableLink to={`clinical-record/edit/${clinicalRegister.id}`}> {CutString(clinicalRegister.description, 15)}</TableLink>
					),
				};
			});
			setClinicalRecords(formattedData);
			setColumns(['Data-Hora', 'Descrição']);
			setTableTitle(patientName);
			setShowListPatientsButton(true);
			setSearchOptions([{ name: 'Data', labelText: 'Digite data do registro', active: true }]);
			setInputType('date');
			setActiveSearchField(3);
		} catch (err) {
			Message('Erro ao tentar listar os registros do paciente selecionado', 1);
		} finally {
			setChangingState(false);
		}
	};

	const listAllPatients = async () => {
		setChangingState(true);
		await getData();
		setShowListPatientsButton(false);
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
								{showListPatientsButton && (
									<ButtonContainer>
										<Button onClick={listAllPatients}>
											<RiUserReceivedLine /> Listar Pacientes
										</Button>
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
