import { ClinicalRecordSave, ClinicalRecordUpdate } from '../@types/clinical-record';
import api from './api';

const baseURL = '/clinicalRegister';

const ClinicalRegister = {
	getAll: async () => {
		const response = await api.get(`${baseURL}`);
		return response;
	},

	getById: async (id: number) => {
		const response = await api.get(`${baseURL}/${id}`);
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

	save: async (register: ClinicalRecordSave) => {
		const response = await api.post(`${baseURL}`, register);
		return response;
	},

	update: async (register: ClinicalRecordUpdate) => {
		const response = await api.put(`${baseURL}`, register);
		return response;
	},

	delete: async (id: number) => {
		const response = await api.delete(`${baseURL}/${id}`);
		return response;
	},
};

export default ClinicalRegister;
