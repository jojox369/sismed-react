import { ClinicalRegisterSave } from '../@types/clinical-register';
import api from './api';

const baseURL = '/clinicalRegister';

const ClinicalRegister = {
	getAll: async () => {
		const response = await api.get(`${baseURL}`);
		return response;
	},

	getPreviousRegisters: async (patientId: number, medicId: number) => {
		const response = await api.get(`${baseURL}?patientId=${patientId}&medicId=${medicId}`);
		return response;
	},

	getByPatientId: async (patientId: number) => {
		const response = await api.get(`${baseURL}?patientId=${patientId}`);
		return response;
	},

	getByPatientName: async (name: string) => {
		const response = await api.get(`${baseURL}?patientName=${name}`);
		return response;
	},

	getByDate: async (date: string) => {
		const response = await api.get(`${baseURL}?date=${date}`);
		return response;
	},

	getByMedic: async (medicId: number) => {
		const response = await api.get(`${baseURL}?medicId=${medicId}`);
		return response;
	},

	getPatientRegisters: async (patientId: number) => {
		const response = await api.get(`${baseURL}?patientId=${patientId}&getAll=true`);
		return response;
	},

	save: async (register: ClinicalRegisterSave) => {
		console.log('aqui');
		const response = await api.post('${baseURL}', register);
		return response;
	},
};

export default ClinicalRegister;
