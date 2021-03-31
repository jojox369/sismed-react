/* eslint-disable prettier/prettier */
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core';
import { InputContainer, Input, Label } from './styles';

import { cellPhone, cpf, currency, zipCode, phone } from '../../../assets/masks';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	mask?: 'zipCode' | 'cpf' | 'rg' | 'cnpj' | 'currency' | 'cellPhone' | 'phone';

	fieldActive: boolean;
}

const InputComponent: React.FC<Props> = ({ label, mask, fieldActive, ...props }) => {
	const [focused, setFocused] = useState(false);
	const [hasValue, setHasValue] = useState(false)
	const { fieldName, registerField, defaultValue, error } = useField(props.name as string);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value'
		})
	}, [fieldName, registerField])

	

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
		if(mask ==='phone'){
			phone(e)
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

	const isFocused = focused || fieldActive || props.type === 'date' || hasValue
	const onChange = (e:  React.ChangeEvent<HTMLInputElement>)=>{
		const {value} = e.target
		if(value){
			setHasValue(true)
		}else{
			setHasValue(false)

		}
	}


	return (

		<InputContainer focused={isFocused} error={error} required={props.required} inputDisabled={props.disabled}>
			<Input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onKeyUp={handleKeyUp} 
				ref={inputRef}
				focused={isFocused}
				defaultValue={defaultValue}
				autoComplete='off'
				onChange={onChange}
				{...props}
			/>
			<Label htmlFor={props.id} focused={isFocused} error={error} required={props.required} inputDisabled={props.disabled}>
				{renderLabel()}
			</Label>
		</InputContainer>

	)
}

export default InputComponent
