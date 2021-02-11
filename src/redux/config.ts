import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import userReducer from './User/User.reducer';

const rootReducer = combineReducers({
	user: userReducer,
});

const persistedReducer = persistReducer(
	{
		key: 'root',
		storage: storageSession,
	},
	rootReducer,
);

export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);
