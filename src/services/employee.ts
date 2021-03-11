import api from './api';

const Employee = {
	getMedics: async () => {
		const response = await api.get(`/employee?medic=true`);
		return response;
	},
	getHealthInsurancesAccepted: async (id: number) => {
		const response = await api.get(`/employee/healthInsuranceAccepted/${id}`);
		return response;
	},
	getById: async (id: number) => {
		const response = await api.get(`/employee/${id}?medic=true`);
		return response;
	},
};
export default Employee;
