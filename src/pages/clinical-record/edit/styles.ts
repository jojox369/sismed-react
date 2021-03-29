import styled from 'styled-components';

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

export const Content = styled.main`
	display: flex;
	margin: 1.25rem;
`;

export const ClinicalRecordDetails = styled.section`
	width: 34.375rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`;

export const TextAreaBox = styled.div``;

export const ButtonsArea = styled.div`
	float: right;
	margin: 0 1.875rem;
	display: flex;
	> * {
		width: 9.375rem;
		margin: 0 0.625rem;
	}
`;
