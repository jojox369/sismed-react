import React from 'react';

interface RowProps {
	record: Record<string, any>;
	columns: string[];
}
const Row: React.FC<RowProps> = ({ record, columns }) => {
	return (
		<tr key={record.id}>
			{columns.map(column => {
				const key = column
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase();

				return <td key={key}>{record[key]}</td>;
			})}
		</tr>
	);
};

export default Row;
