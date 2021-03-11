import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const ButtonsArea = styled.header`
	padding: 3rem 0;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-self: flex-end;
	> * {
		width: 150px;
		margin-right: 1rem;
	}
	> :last-child {
		margin-right: 2.5rem;
	}
`;

export const Content = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	> * {
		height: 31.25rem;
		padding: 0 2rem;
	}
`;

export const PatientArea = styled.section``;
export const EmployeeArea = styled.section``;
export const SchedulingArea = styled.section``;

export const CustomForm = styled(Form)`
	display: flex;
	> * {
		padding: 0 3rem;
	}
`;
