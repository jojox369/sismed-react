import { PatientSave } from '../@types/patient';
import api from './api';

const baseURL = '/patient';

const Patient = {
	list: async () => {
		const response = await api.get(`${baseURL}`);
		return response;
	},

	getById: async (id: number) => {
		const response = await api.get(`${baseURL}/${id}`);
		return response;
	},

	getByName: async (name: string) => {
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

	getNextId: async () => {
		const response = await api.get(`${baseURL}/nextId`);
		return response;
	},

	save: async (patient: PatientSave) => {
		const response = await api.post(`${baseURL}/`, patient);
		return response;
	},

	update: async (patient: PatientSave) => {
		const response = await api.put(`${baseURL}/`, patient);
		return response;
	},
};

export default Patient;
