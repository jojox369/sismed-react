import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	margin: 3.125rem 0.625rem 0 0.625rem;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin: 0 auto;
`;
export const RegisterDateTime = styled.span`
	margin: 1.875rem 0;
`;

export const RegisterDescriptionArea = styled.div`
	background: #ddd;
	height: 6.25rem;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`;

export const PartialDescription = styled.span`
	max-width: 200px;
	word-wrap: break-word;
`;

export const CardArea = styled.div`
	width: 12.5rem;
	height: 16.875rem;
	display: block;
	margin: 0 1.875rem;
`;

export const MoreInformations = styled(Link)`
	text-decoration: none;
	font-size: 0.875rem;
	align-self: flex-end;
	margin: 0.3125rem 0.625rem 0 0;
`;

export const IconArea = styled.div`
	align-self: flex-end;
	margin: 1.25rem 1.875rem;
`;
