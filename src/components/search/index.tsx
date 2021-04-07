import React, { useState } from 'react';
import Input from '../form/no-form-input';
import { Container, DropDownBox, DropDownList, ListItem } from './styles';
import { AiOutlineDown } from 'react-icons/ai';
import { OnlyLetters, OnlyNumbers } from '../../assets/functions';

interface OptionsInfo {
	name: string;
	labelText: string;
	active: boolean;
	maxLength?: number;
	onlyNumbers?: boolean;
	inputType?: string;
}

interface Props {
	options: OptionsInfo[];
	onClickItem: (arrayPosition: number) => void;
	onSearchValueChange: (value: string) => void;
}

const SearchComponent: React.FC<Props> = ({ options, onClickItem, onSearchValueChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [searchOptions, setSearchOptions] = useState(options);
	const [searchInputLabel, setSearchInputLabel] = useState(options[0].labelText);
	const [inputMaxLength, setInputMaxLength] = useState(options[0].maxLength);
	const [onlyNumbers, setOnlyNumbers] = useState(options[0].onlyNumbers);
	const [inputType, setInputType] = useState(options[0].inputType);

	const onClick = (i: number, active: boolean) => {
		if (!active) {
			onClickItem(i);
			onClickSearchItem(i);
			setInputValue('');
		}
		setIsOpen(false);
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
		setInputMaxLength(arrayCopy[arrayPosition].maxLength);
		setOnlyNumbers(arrayCopy[arrayPosition].onlyNumbers);
		setInputType(arrayCopy[arrayPosition].inputType);
	};

	const inputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (!inputType) {
			if (onlyNumbers) {
				setInputValue(OnlyNumbers(value));
				onSearchValueChange(OnlyNumbers(value));
			} else {
				setInputValue(OnlyLetters(value));
				onSearchValueChange(OnlyLetters(value));
			}
		} else {
			setInputValue(value);
		}
	};

	return (
		<Container>
			<Input
				type={inputType}
				label={searchInputLabel}
				onChange={inputValueChange}
				value={inputValue}
				fieldActive={!!inputValue}
				maxLength={inputMaxLength}
			/>
			<DropDownBox>
				<AiOutlineDown style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
				{isOpen && (
					<DropDownList>
						{options.map((option, i) => (
							<ListItem key={Math.random()} active={option.active} onClick={() => onClick(i, option.active)}>
								{option.name}
							</ListItem>
						))}
					</DropDownList>
				)}
			</DropDownBox>
		</Container>
	);
};

export default SearchComponent;
