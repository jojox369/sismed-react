import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	flex-direction: column;
	position: relative;
	z-index: 1;
`;

export const SearchBox = styled.div`
	width: 100%;
`;

export const Results = styled.div`
	position: absolute;
	background-color: #e8e8e8;
	top: 74px;
	width: 100%;
`;

export const Option = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	padding: 5px;
	cursor: pointer;
`;
