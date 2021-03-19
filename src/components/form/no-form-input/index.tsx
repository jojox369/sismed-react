import React, { useCallback, useState } from 'react';

import { Container, Input, Label } from './styles';
import { cellPhone, cpf, currency, zipCode } from '../../../assets/masks';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	fieldActive: boolean;
	mask?: 'zipCode' | 'cpf' | 'rg' | 'cnpj' | 'currency' | 'cellPhone';
}

const NoFormInput: React.FC<Props> = ({ label, fieldActive, mask, ...props }) => {
	const [focused, setFocused] = useState(false);

	const isFocused = focused || fieldActive || props.type === 'date';

	const handleKeyUp = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			if (mask === 'zipCode') {
				zipCode(e);
			}
			if (mask === 'currency') {
				currency(e);
			}
			if (mask === 'cpf') {
				cpf(e);
			}
			if (mask === 'cellPhone') {
				cellPhone(e);
			}
		},
		[mask],
	);
	return (
		<Container focused={isFocused}>
			<Input focused={isFocused} onKeyUp={handleKeyUp} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props} />
			<Label focused={isFocused} htmlFor={props.id}>
				{label}
			</Label>
		</Container>
	);
};

export default NoFormInput;
