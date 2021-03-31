import api from './api';

const baseURL = '/healthInsurance';

const healthInsurance = {
	searchAll: async () => {
		const response = await api.get(`${baseURL}?search=true`);
		return response;
	},
};

export default healthInsurance;
