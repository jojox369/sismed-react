import React from 'react';
import Input from '../input';
import { Container, Option, Results, SearchBox } from './styles';

interface Props {
	dataSource: any[];
	display: boolean;
	searchText: string;
	noDataLabel: string;
	onSelectedOption: React.MouseEventHandler<HTMLDivElement>;
	onChangeText: React.ChangeEventHandler<HTMLInputElement>;
}

const AutoComplete: React.FC<Props> = ({ dataSource, display, onSelectedOption, searchText, onChangeText, noDataLabel }) => {
	return (
		<Container>
			<SearchBox>
				<Input label='Nome' fieldActive={!!searchText} name='autoCompleteData' onChange={onChangeText} value={searchText} required />
			</SearchBox>
			{display && dataSource && (
				<Results>
					{dataSource.map((value: Record<string, any>, i) => (
						<Option key={i} id={value.id.toString()} onClick={onSelectedOption}>
							{value.name}
						</Option>
					))}
				</Results>
			)}
			{display && dataSource.length === 0 && searchText && (
				<Results>
					<Option onClick={onSelectedOption}>{noDataLabel}</Option>
				</Results>
			)}
		</Container>
	);
};

export default AutoComplete;
