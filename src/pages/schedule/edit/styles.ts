import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Container = styled.section`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;

export const Header = styled.header`
	padding: 3rem 0;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-self: flex-end;
	> * {
		width: 9.375rem;
		margin-right: 1rem;
	}
	> :last-child {
		margin-right: 2.5rem;
	}
`;

export const Content = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const PatientArea = styled.section`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
	padding: 0 2rem;
`;
export const EmployeeArea = styled.section`
	padding: 0 2rem;
	height: 100%;
`;
export const SchedulingArea = styled.section`
	padding: 0 2rem;
	height: 100%;
`;

export const Form = styled(UnForm)`
	display: flex;
	> * {
		padding: 0 3rem;
	}
`;
