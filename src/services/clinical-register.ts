import { ClinicalRegisterSave } from '../@types/clinical-register';
import api from './api';

const ClinicalRegister = {
	getAll: async () => {
		const response = await api.get(`/clinicalRegister`);
		return response;
	},

	getPreviousRegisters: async (patientId: number, medicId: number) => {
		const response = await api.get(`/clinicalRegister?patientId=${patientId}&medicId=${medicId}`);
		return response;
	},

	getByPatientId: async (patientId: number) => {
		const response = await api.get(`/clinicalRegister?patientId=${patientId}`);
		return response;
	},

	getByPatientName: async (name: string) => {
		const response = await api.get(`/clinicalRegister?patientName=${name}`);
		return response;
	},

	getByDate: async (date: string) => {
		const response = await api.get(`/clinicalRegister?date=${date}`);
		return response;
	},

	getByMedic: async (medicId: number) => {
		const response = await api.get(`/clinicalRegister?medicId=${medicId}`);
		return response;
	},

	save: async (register: ClinicalRegisterSave) => {
		console.log('aqui');
		const response = await api.post('/clinicalRegister', register);
		return response;
	},
};

export default ClinicalRegister;
