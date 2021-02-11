import { AxiosResponse } from 'axios';
import api from './api';

const HetalhInsurance = {
	getAll: async (): Promise<AxiosResponse<any>> => {
		const response = await api.get('convenio/');
		return response;
	},

	getById: async (convenioId: number): Promise<AxiosResponse<any>> => {
		const response = await api.get(`convenio/${convenioId}/`);
		return response;
	},

	getTypes: async (convenioId: number): Promise<AxiosResponse<any>> => {
		const response = await api.get(`tiposConvenio/${convenioId}`);
		return response;
	},

	getProcedures: async (convenioId: number): Promise<AxiosResponse<any>> => {
		const response = await api.get(`procedimento/${convenioId}`);
		return response;
	},
};

export default HetalhInsurance;
