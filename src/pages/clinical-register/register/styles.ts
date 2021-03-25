import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const Header = styled.header`
	width: 100%;
	margin: 20px 0;
`;
export const ButtonsArea = styled.div`
	width: 200px;
	float: right;
	margin: 0 30px;
`;

export const Content = styled.div`
	display: flex;
`;
export const PatientArea = styled.div`
	margin: 0 20px;
`;
export const ClinicalRegisterArea = styled.div`
	margin: 0 20px;
`;

export const Form = styled(UnForm)``;
