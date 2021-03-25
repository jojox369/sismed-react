import React, { useEffect, useState } from 'react';
import { ClinicalRegistersList } from '../../../@types/clinical-register';
import { Message } from '../../../assets/functions';
import { Error, SearchComponent, Spinner, Table } from '../../../components';
import ClinicalRegisterService from '../../../services/clinical-register';
import { Container, Content, Header, SearchBox, TableText } from './styles';

interface ListData {
	prontuario: JSX.Element;
	nome: string;
	quantidade: string;
}

const options = [
	{ name: 'Paciente', labelText: 'Digite o nome do paciente', active: true },
	{ name: 'Prontuario', labelText: 'Digite o prontuario do paciente', active: false },
	{ name: 'Data', labelText: 'Digite data do registro', active: false },
];

const columns = ['Prontuario', 'Nome', 'Quantidade'];

const formatData = (clinicalRegisters: ClinicalRegistersList[]) => {
	return clinicalRegisters.map((clinicalRegister: ClinicalRegistersList) => {
		return {
			prontuario: (
				<TableText
					to={`/clinical-registers/save/${clinicalRegister.patient.id}`}
					title='Clique para adicionar um novo registro clínico para esse paciente'
				>
					{clinicalRegister.patient.id}
				</TableText>
			),
			nome: clinicalRegister.patient.name,
			quantidade: clinicalRegister.amount ? clinicalRegister.amount : ' - ',
		};
	});
};

const ClinicalRegisterList = () => {
	const [searchOptions, setSearchOptions] = useState(options);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [inputType, setInputType] = useState('text');
	const [activeSearchField, setActiveSearchField] = useState(0);
	const [clinicalRegisters, setClinicalRegisters] = useState<ListData[]>([]);
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);

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
								inputType={inputType}
								onSearchValueChange={onSearchValueChange}
							/>
						</SearchBox>
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
