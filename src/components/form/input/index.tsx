/* eslint-disable prettier/prettier */
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core';
import { InputContainer } from './styles';

import { cellPhone, cpf, currency, zipCode } from '../../../assets/masks';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	mask?: 'zipCode' | 'cpf' | 'rg' | 'cnpj' | 'currency' | 'cellPhone';

	fieldActive: boolean;
}

const Input: React.FC<Props> = ({ label, mask, fieldActive, ...props }) => {
	const [focused, setFocused] = useState(false);
	const { fieldName, registerField, defaultValue, error } = useField(props.name as string);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value'
		})
	}, [fieldName, registerField])

	const isFocused = focused || fieldActive || props.type === 'date'

	const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		if (mask === "zipCode") {
			zipCode(e);
		}
		if (mask === "currency") {
			currency(e);
		}
		if (mask === "cpf") {
			cpf(e);
		}
		if(mask ==='cellPhone'){
			cellPhone(e)
		}
	}, [mask])



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

	}


	return (

		<InputContainer focused={isFocused} error={error} required={props.required}>
			<input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onKeyUp={handleKeyUp} ref={inputRef}
				defaultValue={defaultValue}
				autoComplete='off'
				{...props}
			/>
			<label htmlFor={props.id}>
				{renderLabel()}
			</label>
		</InputContainer>

	)
}

export default Input
