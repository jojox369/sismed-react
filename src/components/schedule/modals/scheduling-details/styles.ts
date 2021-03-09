import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const PatientInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const SchedulingInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

export const NameText = styled.p`
	color: #006ca4;
	margin-top: 1.25rem;
`;

export const Field = styled.div`
	margin-left: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 16.625rem;
`;

export const ButtonsContainer = styled.div`
	margin: 2.5rem 0 0 0.625rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 400px;
`;

export const PatientAttendance = styled(Link)`
	background: #1161ee;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.125rem;
	width: 11.25rem;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	text-decoration: none;

	&:hover {
		background: #0b43a6;
	}
`;

export const SchedulingEdit = styled(Link)`
	text-decoration: none;
	margin-left: 0.625rem;
`;
