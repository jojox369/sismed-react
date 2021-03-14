import React, { useEffect, useRef } from 'react';
import { Container, Title, SubTitle, TextArea } from './styles';
import { useField } from '@unform/core';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	title: string;
	subTitle?: string;
}

const TextAreaComponent: React.FC<Props> = ({ title, subTitle, ...props }) => {
	const { fieldName, registerField, defaultValue, error } = useField(props.name as string);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: textAreaRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	const renderLabel = () => {
		if (title) {
			if (error) {
				return error;
			}

			return title;
		}
	};

	return (
		<Container className='wrapper'>
			<Title htmlFor='text-area' className='first-heading'>
				{renderLabel()}
			</Title>
			{subTitle && <SubTitle>{subTitle}</SubTitle>}

			<TextArea id='text-area' ref={textAreaRef} defaultValue={defaultValue} {...props} />
		</Container>
	);
};

export default TextAreaComponent;
