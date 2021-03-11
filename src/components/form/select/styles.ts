import styled from 'styled-components';

interface Props {
	focused: boolean;
	error?: string;
	required?: boolean;
}

export const Container = styled.div<Props>`
	width: 100%;
	height: 3.5rem;
	border-radius: 0.25rem;
	background-color: #fff;
	transition: box-shadow 0.2s;
	margin-top: 1.875rem;
	position: relative;
	:hover {
		/* background-color: rgba(255, 255, 255, 0.45); */
		box-shadow: 0 0.25rem 1.25rem 0 #0287ce;
	}
	${props =>
		props.focused &&
		`
			box-shadow: 0 0.25rem 1.25rem 0 #0287ce;
	`}
`;

export const Select = styled.select`
	width: 100%;
	height: 3rem;
	position: relative;
	padding: 1rem 1rem 0.5rem 1rem;
	margin: 0.625rem 0;
	border: none;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: normal;
	background-color: transparent;
	color: #282828;
	outline: none;
	text-align-last: left;
`;
export const Option = styled.option`
	text-align: left;
`;

export const Label = styled.label`
	position: absolute;
	top: 0.25rem;
	left: 1.3125rem;
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 1.5rem;
	color: #0287ce;
	pointer-events: none;
	opacity: 1;
`;
