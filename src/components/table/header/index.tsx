import React from 'react';

interface HeaderProps {
	columns: string[];
}
const Header: React.FC<HeaderProps> = ({ columns }) => {
	return (
		<tr>
			{columns.map((column, i) => {
				return <th key={i}>{column}</th>;
			})}
		</tr>
	);
};

export default Header;
