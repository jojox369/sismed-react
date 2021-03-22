import React from 'react';

interface RowProps {
	record: Record<string, any>;
}
const Row: React.FC<RowProps> = ({ record }) => {
	const keys = Object.keys(record);

	return (
		<tr key={record.id}>
			{keys.map(key => {
				return <td key={key}>{record[key]}</td>;
			})}
		</tr>
	);
};

export default Row;
