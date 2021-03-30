import React, { useState, useEffect } from 'react';
import Row from './row';
import Header from './header';
import NoData from './no-data';
import Title from './title';

import {
	TableContainer,
	Table,
	Controls,
	FirstPage,
	LastPage,
	NextPage,
	Numbers,
	PageNumber,
	Paginate,
	PerPage,
	PreviousPage,
	PerPageSelect,
} from './styles';

interface Props {
	dataSource: Array<Record<string, any>>;
	columns: Array<string>;
	title: string | null;
	hasNoDataLabel: string;
}

const TableComponent: React.FC<Props> = ({ dataSource, columns, title, hasNoDataLabel }) => {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(5);
	const [totalPages, setTotalPages] = useState(0);
	const [dataPaginated, setDataPaginated] = useState<Array<Record<string, any>>>([]);

	useEffect(() => {
		setTotalPages(Math.ceil(dataSource.length / perPage));

		const init = (page - 1) * perPage;
		const end = init + perPage;

		setDataPaginated(dataSource.slice(init, end));
	}, [dataSource, page, perPage]);

	const next = () => {
		const verifyIsLastPage = page + 1 > totalPages;
		if (verifyIsLastPage) {
			setPage(totalPages);
		} else {
			setPage(page + 1);
		}
	};

	const prev = () => {
		const verifyIsFirstPage = page - 1 === 0;
		if (verifyIsFirstPage) {
			setPage(1);
		} else {
			setPage(page - 1);
		}
	};

	const goTo = (page: number) => {
		setPage(page);
	};
	return (
		<>
			<TableContainer>
				<Table>
					<thead>
						{title && <Title title={title} length={columns.length} />}
						<Header columns={columns} />
					</thead>
					<tbody>
						{dataSource.length === 0 && <NoData length={columns.length} label={hasNoDataLabel} />}

						{dataSource.length > 0 && dataPaginated.map((record: any, i) => <Row key={i} columns={columns} record={record} />)}
					</tbody>
				</Table>
			</TableContainer>

			<Paginate>
				<Controls>
					<FirstPage onClick={() => goTo(1)} title='Ir para a primeira página'>
						&laquo;
					</FirstPage>

					<PreviousPage onClick={() => prev()} title='Página Anterior'>
						&lt;
					</PreviousPage>

					<Numbers>
						<PageNumber title='Página Atual'>{page}</PageNumber>
					</Numbers>

					<NextPage onClick={() => next()} title='Próxima Página'>
						&gt;
					</NextPage>

					<LastPage onClick={() => goTo(totalPages)} title='Última Página'>
						&raquo;
					</LastPage>

					<PerPage>
						<PerPageSelect>
							<select name='per-page-select' defaultValue={perPage} onChange={e => setPerPage(+e.target.value)}>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={20}>20</option>
							</select>
						</PerPageSelect>
					</PerPage>
				</Controls>
			</Paginate>
		</>
	);
};

export default TableComponent;
