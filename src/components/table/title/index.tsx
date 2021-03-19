import React from 'react';

interface TitleProps {
	length: number;
	title: string;
}

const Title: React.FC<TitleProps> = ({ length, title }) => {
	return (
		<tr>
			<th colSpan={length}>{title}</th>
		</tr>
	);
};

export default Title;
