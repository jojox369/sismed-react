import React from 'react';
import { Container, Title, Content } from './styles';
interface Props {
	id: string;
	title: string;
	content: any;
}
const InformationTextArea: React.FC<Props> = ({ id, title, content }) => {
	return (
		<Container>
			<Content id={id}> {content}</Content>
			<Title htmlFor={id}> {title}</Title>
		</Container>
	);
};

export default InformationTextArea;
