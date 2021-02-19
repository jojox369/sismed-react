import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
`;

export const PatientName = styled.div`
	width: 30%;
	height: 100%;
	padding: 20px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const SchedulingInfo = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const Img = styled.img`
	width: 300px;
	height: 200px;
`;

export const NameText = styled.p`
	color: #006ca4;
	margin-top: 20px;
`;

export const Field = styled.div`
	margin-left: 10px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonsContainer = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Button = styled.button`
	background: #1161ee;
	color: #fff;
	display: block;
	height: 50px;
	width: 180px;
	transition: background-color 0.2s;
	border-radius: 4px;
	border: none;
	&:hover {
		background: #0b43a6;
	}
`;

export const SchedulingInformations = styled(Link)`
	text-decoration: none;
	margin-left: 10px;
`;
