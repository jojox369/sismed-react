import styled from 'styled-components';

interface Props {
	focused: boolean;
	error?: string;
	required?: boolean;
	inputDisabled?: boolean;
}
export const InputContainer = styled.div<Props>`
	width: 100%;
	height: 3.5rem;
	border-radius: 0.25rem;
	position: relative;
	background-color: ${props => (props.focused ? '#fff' : 'rgba(255, 255, 255, 0.8)')};
	margin-top: 1.25rem;
	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
	box-shadow: ${props => (props.error && props.focused ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px transparent')};

	&:hover {
		background-color: ${props => (props.inputDisabled ? '#ffffff' : 'rgba(255, 255, 255, 0.45)')};
		box-shadow: ${props => (props.inputDisabled ? 'none' : props.error ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px #0287ce')};
	}
`;

export const Input = styled.input<Props>`
	width: 100%;
	height: 3.5rem;
	position: relative;
	padding: ${props => (props.focused ? '24px 16px 8px 16px' : '0px 16px')};
	border: none;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: normal;
	background-color: transparent;
	color: #282828;
	outline: none;

	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
	-webkit-appearance: none;

	&:focus:not(:read-only) {
		box-shadow: ${props => (props.error ? 'none' : '0px 4px 20px 0px #0287ce')};
	}

	&:read-only {
		cursor: default;
	}
`;

export const Label = styled.label<Props>`
	position: absolute;
	top: ${props => (props.focused ? '4px' : '15px')};
	left: 16px;
	font-size: ${props => (props.focused ? '12px' : '15px')};
	font-weight: 600;
	line-height: 24px;
	color: ${props => (props.inputDisabled ? '#015e90' : props.error ? '#ec392f' : '#0287ce')};
	pointer-events: none;
	transition: 0.1s all ease-in-out;
	${props => props.required && `::after { content:' *'; color: #ec392f; }`}
`;
