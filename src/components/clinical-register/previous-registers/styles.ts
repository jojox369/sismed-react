import styled from 'styled-components';

export const Container = styled.div`
	margin: 50px 10px 0 10px;
	flex: 1;
`;

export const Content = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(5, 1fr); /*Duas colunas com mesmo tamanho*/
	gap: 1rem; /*Espacamento entre as colunas*/
	align-content: center; /*Todo conteudo do grid seja alinhado ao centro verticalmente*/
	margin-left: 0 auto;
`;
export const RegisterDateTime = styled.span`
	margin: 1.875rem 0;
`;

export const RegisterDescriptionArea = styled.div`
	background: #ddd;
	height: 150px;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`;

export const PartialDescription = styled.span`
	max-width: 200px;
	word-wrap: break-word;
`;
