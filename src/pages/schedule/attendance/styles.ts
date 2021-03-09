import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 70px;
	width: 100%;
`;

export const PatientArea = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 100%;
	width: 40%;
	align-self: flex-start;
`;

export const FieldsArea = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 60%;
`;

export const ButtonsGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	margin-left: 20px;
	height: 320px;
`;

export const ButtonArea = styled.div`
	width: 300px;
	margin-top: 20px;
`;

export const TextArea = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

export const OldRegisters = styled.div`
	padding: 3rem;
`;
