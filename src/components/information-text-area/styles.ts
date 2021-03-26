import styled from 'styled-components';

export const Container = styled.section`
	width: 100%;
	height: 142px;
	border-radius: 0.25rem;
	position: relative;
	background: #fff;
	margin-top: 1.25rem;
	overflow: auto;
	:hover {
		/* background-color: rgba(255, 255, 255, 0.45); */
		box-shadow: 0 0.25rem 1.25rem 0 #0287ce;
	}
`;
export const Title = styled.label`
	position: absolute;
	top: 0.25rem;
	left: 1rem;
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 1rem;
	color: #0287ce;
	pointer-events: none;
	opacity: 1;
`;
export const Content = styled.div`
	width: 100%;
	position: relative;
	padding: 1.5rem 1rem 0.5rem 1rem;
	border: none;
	border-radius: 0.25rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: normal;
	color: #282828;
	outline: none;
	-webkit-appearance: none;
	background-color: transparent;
`;
