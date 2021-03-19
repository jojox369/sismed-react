import styled from 'styled-components';

interface Props {
	focused: boolean;
}

interface InputProps extends Props {
	error?: string;
	required?: boolean;
	focused: boolean;
}

export const Container = styled.section<Props>`
	width: 100%;
	height: 56px;
	border-radius: 4px;
	position: relative;
	background-color: ${props => (props.focused ? '#fff' : 'rgba(255, 255, 255, 0.8)')};
	margin-top: 1.25rem;
	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
	& :hover {
		box-shadow: 0px 4px 20px 0px #0287ce;
	}
`;

export const Input = styled.input<InputProps>`
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
	box-shadow: ${props => (props.error ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px transparent')};
	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
	-webkit-appearance: none;

	& :focus:not(:read-only) {
		box-shadow: 0px 4px 20px 0px #0287ce;
	}

	${props =>
		props.focused &&
		`	
			padding: 24px 16px 8px 16px;
			
		`}
`;

export const Label = styled.label<InputProps>`
	position: absolute;
	top: 15px;
	left: 16px;
	font-size: 15px;
	font-weight: 600;
	line-height: 24px;
	color: #0287ce;
	pointer-events: none;
	transition: 0.1s all ease-in-out;
	${props =>
		props.focused &&
		`
			top: 4px;
			opacity: 1;
			color: #0287CE;
			font-size: 12px;
		`}
`;
