import api from './api';

const baseURL = '/employee';

const Employee = {
	list: async () => {
		const response = await api.get(`${baseURL}`);
		return response;
	},

	getMedics: async () => {
		const response = await api.get(`${baseURL}?medic=true`);
		return response;
	},
	getHealthInsurancesAccepted: async (id: number) => {
		const response = await api.get(`${baseURL}/healthInsuranceAccepted/${id}`);
		return response;
	},
	getById: async (id: number) => {
		const response = await api.get(`${baseURL}/${id}?medic=true`);
		return response;
	},
};
export default Employee;
