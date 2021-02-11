import axios from 'axios';
import { store } from '../redux/config';

const defaultOptions = {
	baseURL: 'http://localhost:3333/',
	headers: {
		'Content-Type': 'application/json',
	},
};

const api = axios.create(defaultOptions);

api.interceptors.request.use(config => {
	const { user } = store.getState();

	config.headers.Authorization = user.token ? `Bearer ${user.token}` : '';

	return config;
});

export default api;
