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
	margin: 1.25rem 0;
`;
export const ButtonsArea = styled.div`
	width: 12.5rem;
	float: right;
	margin: 0 1.875rem;
`;

export const Content = styled.div`
	display: flex;
`;
export const PatientArea = styled.div`
	margin: 0 1.25rem;
`;
export const ClinicalRegisterArea = styled.div`
	margin: 0 1.25rem;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

export const Form = styled(UnForm)``;
