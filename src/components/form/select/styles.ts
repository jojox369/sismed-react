import styled from 'styled-components';

interface Props {
	focused?: boolean;
	error?: string;

	selectDisabled?: boolean;
	inputDisabled?: boolean;
	isRequired?: boolean;
}

export const Container = styled.section<Props>`
	width: 100%;
	height: 3.5rem;
	border-radius: 0.25rem;
	background-color: #fff;
	transition: box-shadow 0.2s;
	margin-top: 1.25rem;
	box-shadow: ${props => (props.error && props.focused ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px transparent')};
	position: relative;

	&:hover {
		background-color: ${props => (props.selectDisabled ? '#ffffff' : 'rgba(255, 255, 255, 0.45)')};
		box-shadow: ${props => (props.inputDisabled ? 'none' : props.error ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px #0287ce')};
	}

	${props =>
		props.selectDisabled &&
		`
			& label{
				color: #015e90;
			}
		`}
`;

export const Select = styled.select<Props>`
	width: 100%;
	height: 3rem;
	position: relative;
	padding: 0px 16px;
	margin: 0.625rem 0;
	border: none;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: normal;
	background-color: transparent;
	color: ${props => (props.error ? '#ec392f' : '#282828')};
	outline: none;
	text-align-last: left;
`;
export const Option = styled.option`
	text-align: left;
`;

export const Label = styled.label<Props>`
	position: absolute;
	top: 0.25rem;
	left: 1.3125rem;
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 1.5rem;
	color: ${props => (props.error ? '#ec392f' : '#0287ce')};
	${props => props.isRequired && `::after { content:' *'; color: #ec392f; }`}
	pointer-events: none;
	opacity: 1;
`;

export const OptionText = styled.label<Props>`
	color: ${props => (props.error ? '#ec392f' : '#0287ce')};
`;
