import { ClinicalRegisterSave } from '../@types/clinical-register';
import api from './api';

const ClinicalRegister = {
	getByPatientId: async (patientId: number, medicId: number) => {
		const response = await api.get(`/clinicalRegister?patientId=${patientId}&medicId=${medicId}`);
		return response;
	},

	getByPatientName: async (name: string, medicId: number) => {
		const response = await api.get(`/clinicalRegister?patientName=${name}&medicId=${medicId}`);
		return response;
	},

	getByDate: async (date: string, medicId: number) => {
		const response = await api.get(`/clinicalRegister?date=${date}&medicId=${medicId}`);
		return response;
	},

	getByMedic: async (medicId: number) => {
		const response = await api.get(`/clinicalRegister?medicId=${medicId}`);
		return response;
	},

	save: async (register: ClinicalRegisterSave) => {
		const response = await api.post('/clinicalRegister', register);
		return response;
	},
};

export default ClinicalRegister;
