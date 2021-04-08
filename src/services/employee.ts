import { Employee } from '../@types/employee';
import api from './api';

const baseURL = '/employee';

const EmployeeService = {
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
	getDoctorById: async (id: number) => {
		const response = await api.get(`${baseURL}/${id}?medic=true`);
		return response;
	},

	getById: async (id: number) => {
		const response = await api.get(`${baseURL}/${id}`);
		return response;
	},

	searchByName: async (name: string) => {
		const response = await api.get(`${baseURL}?name=${name}`);
		return response;
	},
	searchById: async (id: number) => {
		const response = await api.get(`${baseURL}?id=${id}`);
		return response;
	},
	searchByCpf: async (cpf: string) => {
		const response = await api.get(`${baseURL}?cpf=${cpf}`);
		return response;
	},

	save: async (employee: Employee) => {
		const response = await api.post(`${baseURL}/`, employee);
		return response;
	},

	update: async (employee: Employee) => {
		const response = await api.put(`${baseURL}/`, employee);
		return response;
	},

	delete: async (id: number) => {
		const response = await api.delete(`${baseURL}/${id}`);
		return response;
	},
};
export default EmployeeService;
