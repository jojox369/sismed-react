import React from 'react';

import ReactNotification from 'react-notifications-component';

import Routes from './routes/';
import 'react-notifications-component/dist/theme.css';
import { GlobalStyles, Main } from './assets/styles/global';
const App = (): JSX.Element => {
	return (
		<>
			<GlobalStyles />
			<Main>
				<ReactNotification />
				<Routes />
			</Main>
		</>
	);
};

export default App;
