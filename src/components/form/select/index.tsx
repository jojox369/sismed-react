import React, { useState } from 'react';
import { Container, Select, Option, Label } from './styles';
import { StringFormatter } from '../../../assets/functions';

export interface SelectOptions {
	id: number;
	name: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: SelectOptions[];
	defaultLabel?: string;
	register?: any;
	error?: string;
	label: string;
	fieldActive: boolean;
}

const SelectComponent: React.FC<Props> = ({ options, defaultLabel, fieldActive, register, error, label, ...props }) => {
	const [focused, setFocused] = useState(false);
	const isFocused = focused || fieldActive;
	return (
		<Container error={error} focused={isFocused} required={props.required}>
			<Label>{label}</Label>
			<Select
				defaultValue={props.defaultValue ? props.defaultValue : undefined}
				ref={register}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			>
				<Option value={undefined} hidden>
					{defaultLabel}
				</Option>
				{options.map(option => (
					<Option key={option.id} value={option.id}>
						{option.name && StringFormatter(option.name)}
					</Option>
				))}
			</Select>
		</Container>
	);
};

export default SelectComponent;
