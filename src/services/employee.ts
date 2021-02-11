import { AxiosResponse } from 'axios';
import api from './api';

const Employee = {
	getMedics: async (): Promise<AxiosResponse<any>> => {
		const response = api.get(`/funcionario?key=2`);
		return response;
	},

	getById: async (id: number): Promise<AxiosResponse<any>> => {
		const response = api.get(`/funcionario/${id}`);
		return response;
	},

	acceptedHealthInsurances: async (id: number): Promise<AxiosResponse<any>> => {
		const response = api.get(`/funcionarioTconvenio/conveniosAceitos/${id}`);
		return response;
	},

	acceptedHealthInsuranceTypes: async (medicId: number, healthInsuranceId: number): Promise<AxiosResponse<any>> => {
		const response = api.get(`funcionarioTconvenio/${medicId}/tiposAceitos/${healthInsuranceId}`);
		return response;
	},
};
export default Employee;
