import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const Content = styled.div`
	width: 70%;
	margin: 20px 0;
`;

export const SearchBox = styled.div`
	margin: 0 1.25rem;
	width: 18.75rem;
`;

export const TableText = styled(Link)`
	text-decoration: none;
`;

export const ButtonContainer = styled.div`
	width: 200px;
	margin: 0 1.25rem;
`;

export const ListRegisters = styled.div`
	cursor: pointer;
	color: #5c3aff;
`;
