import styled from 'styled-components';

export const TableContainer = styled.section`
	width: 100%;
`;

export const Table = styled.table`
	width: 100%;
	border-spacing: 0 0.5rem;
	& thead,
	& tbody {
		text-align: center;
		align-items: center;
	}
	& thead tr th:first-child,
	& tbody tr td:first-child {
		border-radius: 0.25rem 0 0 0.25rem;
	}

	& thead th {
		background: #fff;
		font-weight: normal;
		padding: 1rem 2rem;
	}
	& tbody tr {
		opacity: 0.7;
	}

	& tbody tr:hover {
		opacity: 1;
	}
	& tbody td {
		background: #fff;
		padding: 1rem 2rem;
	}
`;

export const Paginate = styled.section`
	width: 100%;

	margin: 32px auto;
`;

export const FirstPage = styled.div``;
export const PreviousPage = styled.div``;
export const Numbers = styled.div`
	&:hover {
		color: #136bff;
	}
`;
export const PageNumber = styled.div``;
export const NextPage = styled.div``;
export const LastPage = styled.div``;
export const PerPage = styled.div``;
export const PerPageSelect = styled.div``;

export const Controls = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	margin-top: 8px;

	& div {
		cursor: pointer;

		/* border: 1px solid #eee; */

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 14;
		width: 40px;
		height: 40px;
	}
`;
