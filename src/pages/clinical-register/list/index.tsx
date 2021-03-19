import React, { useState } from 'react';

import { Container, Header, Content, SearchBox } from './styles';
import { SearchComponent } from '../../../components';
import { ValidateDate } from '../../../assets/functions';

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

	const onSearchValueChange = (value: string) => {
		if (inputType === 'date') {
			ValidateDate(value);
		}
	};

	return (
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
			<Content></Content>
		</Container>
	);
};

export default ClinicalRegisterList;
