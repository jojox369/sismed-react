import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { persistedStore, store } from './redux/config';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistedStore}>
			<Router>
				<App />
			</Router>
		</PersistGate>
	</Provider>,

	document.getElementById('root'),
);
