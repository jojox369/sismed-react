import { ClinicalRegisterSave } from '../@types/clinical-register';
import api from './api';

const ClinicalRegister = {
	getByPatient: async (patientId: number, medicId: number) => {
		const response = await api.get(`/clinicalRegister?patientId=${patientId}&medicId=${medicId}`);
		return response;
	},
	save: async (register: ClinicalRegisterSave) => {
		const response = await api.post('/clinicalRegister', register);
		return response;
	},
};

export default ClinicalRegister;
