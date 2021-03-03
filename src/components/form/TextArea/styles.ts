import styled from 'styled-components';

export const Container = styled.div`
	position: relative;
	border: 1px solid #000;
	overflow: auto;
	display: inline-block;
	width: 400px;

	border-radius: 4px;
`;

export const Title = styled.label`
	width: 100%;
	text-align: center;
	font-weight: bold;
	float: left;
	background-color: #fff;
`;

export const SubTitle = styled.div`
	width: 100%;
	text-align: center;
	font-size: 12px;
	font-weight: bold;
	float: left;
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 300px;
	float: left;
	display: block;
	border: none;
	outline: none;
	resize: none;
	padding: 5px;
`;
