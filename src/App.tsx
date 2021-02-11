import React from 'react';

import ReactNotification from 'react-notifications-component';

import Routes from './routes/';
import 'react-notifications-component/dist/theme.css';
import './App.css';

const App = (): JSX.Element => {
	return (
		<div className='App'>
			<ReactNotification />
			<Routes />
		</div>
	);
};

export default App;
