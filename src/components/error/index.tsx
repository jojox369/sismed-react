import React from 'react';
import { GiBrokenHeartZone } from 'react-icons/gi';
import { Container, Message, SubMessage } from './styles';

const Error = () => {
	return (
		<Container>
			<GiBrokenHeartZone size='150' color='#ec382f' />
			<Message>Ops! Não conseguimos carregar essa página</Message>
			<SubMessage>Recarregue a pagina para tentar carregar a página novamente</SubMessage>
		</Container>
	);
};

export default Error;
