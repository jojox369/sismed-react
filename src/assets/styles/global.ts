import styled from 'styled-components';

export const Button = styled.button`
	background: #1161ee;
	color: #fff;
	display: block;
	height: 56px;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	&:hover {
		background: #0b43a6;
	}
`;

export const DangerButton = styled.button`
	background: #ec392f;
	color: #fff;
	display: block;
	height: 56px;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	&:hover {
		background: #a52720;
	}
`;
