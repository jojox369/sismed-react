/* eslint-disable prettier/prettier */
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core';
import styled from 'styled-components'

import { cpf, currency, zipCode } from './masks';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	mask?: 'zipCode' | 'cpf' | 'rg' | 'cnpj' | 'currency';

	fieldActive: boolean;
}

interface DivProps {
	focused: boolean;
	error: string | undefined;
	required: boolean | undefined;
}



const InputContainer = styled.div<DivProps>`
	width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: ${(props) => (props.focused ? '#fff' : 'rgba(255, 255, 255, 0.8)')};
	margin-top: 30px;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

	&:hover{
		background-color: rgba(255, 255, 255, 0.45);
  	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
	}

	& input{
		width: 100%;
		height: 56px;
		position: relative;
		padding: 0px 16px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		font-weight: 400;
		line-height: normal;
		background-color: transparent;
		color: #282828;
		outline: none;
		box-shadow: ${(props) => props.error ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px transparent'};
		transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
			0.1s padding ease-in-out;
		-webkit-appearance: none;
	}



	& input:disabled::-webkit-input-placeholder {
  	color: -internal-light-dark(graytext, rgb(170, 170, 170));
		
	}
	
	& input:enabled::-webkit-input-placeholder {
  	color: ${(props) => props.error ? '#ec392f' : '#0287CE'} ;
		
	}

	& input:focus::-webkit-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input::-moz-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input:-ms-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input:-moz-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}

	& input + label{
		position: absolute;
		top: 15px;
		left: 16px;
		font-size: 15px;
		font-weight: 600;
		line-height: 24px;
		color: #0287CE;
		pointer-events: none;
		transition: 0.1s all ease-in-out;
	}

	

	${(props) =>
		props.focused && `
			background-color: #ffffff;
			box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
			& input{
				padding: 24px 16px 8px 16px;
				box-shadow: 0px 4px 20px 0px #0287CE;
			}
			& input + label{
				top: 4px;
				opacity: 1;
				color: #0287CE;
				font-size: 12px;

			}
			& input:enabled::-webkit-input-placeholder {
  			color: transparent;
			}	
		`
	}

	${(props) =>
		props.error && `
			& input::-webkit-input-placeholder {
  			color: #ec392f;
			}
			& input + label{
  			color: ${props.focused ? '#0287CE' : '#ec392f'};

			}
`
	}



	${(props) =>
		props.required && `
		& input + label::after {
				content:' *';
  			color: #ec392f;
			}
			
		`

	}
	
`

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
