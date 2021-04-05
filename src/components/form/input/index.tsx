import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { InputContainer, Input, Label } from './styles';

import { cellPhone, cpf, currency, zipCode, phone, textInput, rg } from '../../../assets/masks';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	mask?: 'zipCode' | 'cpf' | 'rg' | 'cnpj' | 'currency' | 'cellPhone' | 'phone' | 'text';

	fieldActive: boolean;
	isRequired?: boolean;
}

const InputComponent: React.FC<Props> = ({ label, mask, fieldActive, isRequired, ...props }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [focused, setFocused] = useState(false);
	const { fieldName, registerField, defaultValue, error } = useField(props.name as string);
	const [hasValue, setHasValue] = useState(false);
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

	const handleKeyUp = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			if (mask === 'zipCode') {
				zipCode(e);
			} else if (mask === 'currency') {
				currency(e);
			} else if (mask === 'cpf') {
				cpf(e);
			} else if (mask === 'rg') {
				rg(e);
			} else if (mask === 'cellPhone') {
				cellPhone(e);
			} else if (mask === 'phone') {
				phone(e);
			} else if (mask === 'text') {
				textInput(e);
			}
		},
		[mask],
	);

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

	const isFocused = focused || fieldActive || props.type === 'date' || hasValue;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value) {
			setHasValue(true);
			setHasError('');
		} else {
			setHasValue(false);
			setHasError(error);
		}
	};

	return (
		<InputContainer focused={isFocused} error={hasError} required={isRequired} inputDisabled={props.disabled}>
			<Input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onKeyUp={handleKeyUp}
				ref={inputRef}
				focused={isFocused}
				defaultValue={defaultValue}
				autoComplete='off'
				onChange={onChange}
				error={hasError}
				{...props}
			/>
			<Label htmlFor={props.id} focused={isFocused} error={hasError} required={isRequired} inputDisabled={props.disabled}>
				{renderLabel()}
			</Label>
		</InputContainer>
	);
};

export default InputComponent;
