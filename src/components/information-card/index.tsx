import React from 'react';

import { Container, CardContent, CardTitle } from './styles';

interface Props {
	id: string;
	title: string;
	content: any;
}

const InformationCard: React.FC<Props> = ({ id, title, content }) => {
	return (
		<Container>
			<CardContent id={id}> {content}</CardContent>
			<CardTitle htmlFor={id}> {title}</CardTitle>
		</Container>
	);
};

export default InformationCard;
