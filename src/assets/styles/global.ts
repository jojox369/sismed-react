import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,*:focus,*:hover{
  outline:none;
}

body {
  background-color: #e1e1e1;
}

body, input, button, textarea{
  font: 600 18px Nunito, sans-serif;
}
`;

export const Main = styled.main`
	width: 100vw;
	height: 100vh;
`;

export const Button = styled.button`
	background: #1161ee;
	color: #fff;
	display: block;
	height: 56px;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	width: 100%;
	cursor: pointer;
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
	width: 100%;
	cursor: pointer;
	&:hover {
		background: #a52720;
	}
`;

export const ConfirmButton = styled.button`
	background: #2ad433;
	color: #fff;
	display: block;
	height: 56px;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	width: 100%;
	cursor: pointer;
	&:hover {
		background: #20a527;
	}
`;
