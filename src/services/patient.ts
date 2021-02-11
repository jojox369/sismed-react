import api from './api';
import { AxiosResponse } from 'axios';

const Patient = {
	getById: async (patientId: string): Promise<AxiosResponse<any>> => {
		const response = await api.get(`paciente/${patientId}`);
		return response;
	},

	search: async (searchText: string, searchKey: number): Promise<AxiosResponse<any>> => {
		let response = await api.get(`paciente/nome/${searchText}`);

		if (searchKey === 2) {
			response = await api.get(`paciente/prontuario/${searchText}`);
		}
		if (searchKey === 3) {
			response = await api.get(`paciente/celular/${searchText}`);
		}
		if (searchKey === 4) {
			response = await api.get(`paciente/cpf/${searchText}`);
		}

		return response;
	},

	getNextProntuario: async (): Promise<AxiosResponse<any>> => {
		const response = await api.get('paciente/proximo/prontuario');
		return response;
	},
};

export default Patient;
