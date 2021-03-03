/* eslint-disable prettier/prettier */
import React, { InputHTMLAttributes, useState } from 'react'
import { InputContainer } from '../input/styles';



interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;


	fieldActive: boolean;
}

const Input: React.FC<Props> = ({ label, fieldActive, ...props }) => {
	const [focused, setFocused] = useState(false);





	const isFocused = focused || fieldActive || props.type === 'date'


	return (

		<InputContainer focused={isFocused} error={undefined} required={props.required}>
			<input
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				disabled={true}
				autoComplete='off'
				{...props}
			/>
			<label htmlFor={props.id}>
				{label}
			</label>
		</InputContainer>

	)
}

export default Input
