import React, { useEffect, useRef, useState } from 'react';
import { Container, Select, Option, Label } from './styles';
import { StringFormatter } from '../../../assets/functions';
import { useField } from '@unform/core';

export interface SelectOptions {
	id: number | string;
	name: string;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: SelectOptions[];
	defaultLabel?: string;
	label: string;
	fieldActive: boolean;
}

const SelectComponent: React.FC<Props> = ({ options, defaultLabel, fieldActive, label, ...props }) => {
	const { fieldName, registerField, defaultValue, error } = useField(props.name as string);
	const inputRef = useRef<HTMLSelectElement>(null);
	const [focused, setFocused] = useState(false);
	const [hasError, setHasError] = useState(error);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	useEffect(() => {
		setHasError(error);
	}, [error]);

	const isFocused = focused || fieldActive;

	const renderLabel = () => {
		if (label) {
			if (error) {
				if (isFocused) {
					return label;
				} else {
					return error;
				}
			}

			return label;
		}
	};
	return (
		<Container error={error} focused={isFocused} required={props.required} selectDisabled={props.disabled}>
			<Label htmlFor={props.id} error={hasError} required={props.required}>
				{renderLabel()}
			</Label>
			<Select
				defaultValue={defaultValue ? defaultValue : undefined}
				ref={inputRef}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				error={hasError}
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
