import styled from 'styled-components';
export const Container = styled.div`
	width: 100%;
	height: 56px;
	border-radius: 4px;
	position: relative;
	background: #fff;
	margin-top: 30px;
	:hover {
		background-color: rgba(255, 255, 255, 0.45);
		box-shadow: 0 0.25rem 1.25rem 0 rgba(0, 0, 0, 0.05);
	}
`;
export const CardContent = styled.p`
	width: 100%;
	height: 56px;
	position: relative;
	padding: 1.5rem 1rem 0.5rem 1rem;
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	font-weight: 400;
	line-height: normal;
	color: #282828;
	outline: none;
	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
	-webkit-appearance: none;
	background-color: transparent;
	box-shadow: 0 0.25rem 1.25rem 0 #0287ce;
`;
export const CardTitle = styled.label`
	position: absolute;
	top: 4px;
	left: 16px;
	font-size: 12px;
	font-weight: 600;
	line-height: 24px;
	color: #0287ce;
	pointer-events: none;
	opacity: 1;
`;
