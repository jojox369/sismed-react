import React, { useState } from 'react';
import Input from '../form/no-form-input';
import { Container, DropDownBox, DropDownList, ListItem } from './styles';
import { AiOutlineDown } from 'react-icons/ai';

interface OptionsInfo {
	name: string;
	labelText: string;
	active: boolean;
}

interface Props {
	options: OptionsInfo[];
	onClickItem: (arrayPosition: number) => void;
	onSearchValueChange: (value: string) => void;
	inputLabel: string;
	inputType?: string;
}

const SearchComponent: React.FC<Props> = ({ options, onClickItem, inputLabel, inputType, onSearchValueChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const onClick = (i: number) => {
		onClickItem(i);
		setIsOpen(false);
		setInputValue('');
	};

	const inputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		onSearchValueChange(target.value);
		setInputValue(target.value);
	};
	return (
		<Container>
			<Input type={inputType} label={inputLabel} fieldActive={!!inputValue} onChange={inputValueChange} value={inputValue} />
			<DropDownBox>
				<AiOutlineDown style={{ marginTop: 20, marginLeft: 5, cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
				{isOpen && (
					<DropDownList>
						{options.map((option, i) => (
							<ListItem key={Math.random()} active={option.active} onClick={() => onClick(i)}>
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
