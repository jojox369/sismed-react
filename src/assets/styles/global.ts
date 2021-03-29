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

const BaseButton = styled.button`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.5rem;
	transition: background-color 0.2s;
	border-radius: 0.25rem;
	border: none;
	width: 100%;
	cursor: pointer;
	> :first-child {
		margin-right: 1.25rem;
	}
`;

export const Button = styled(BaseButton)`
	background: #1161ee;

	&:hover {
		background: #0b43a6;
	}
`;

export const DangerButton = styled(BaseButton)`
	background: #ec392f;
	&:hover {
		background: #a52720;
	}
`;

export const ConfirmButton = styled(BaseButton)`
	background: #2ad433;

	&:hover {
		background: #20a527;
	}
`;

export const LinkButton = styled(Link)`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.5rem;
	transition: background-color 0.2s;
	border-radius: 0.25rem;
	border: none;
	text-decoration: none;
	width: 100%;
	background: #1161ee;

	&:hover {
		background: #0b43a6;
	}
	cursor: pointer;
	> :first-child {
		margin-right: 1.25rem;
	}
`;

/* ******************List Styles********************* */

import { Link } from 'react-router-dom';

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Header = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const Content = styled.main`
	width: 70%;
	margin: 20px 0;
`;

export const SearchBox = styled.div`
	margin: 0 1.25rem;
	width: 18.75rem;
`;

export const TableText = styled(Link)`
	text-decoration: none;
`;

export const ButtonContainer = styled.div`
	width: 200px;
	margin: 0 1.25rem;
`;
