import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const Form = styled(Unform)`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Field = styled.div`
	width: 400px;
	& > button {
		width: 100%;
		cursor: pointer;
		margin-top: 30px;
	}
`;

export const FormHeader = styled.div`
	width: 400px;
	height: 200px;
	background-color: #ffffff;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
