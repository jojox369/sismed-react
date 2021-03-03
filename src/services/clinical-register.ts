import { ClinicalRegisterSave } from '../@types/clinical-register';
import api from './api';

const ClinicalResgiter = {
	getByPatient: async (patientId: number, medicId: number) => {
		const response = await api.get(`/registroClinico/paciente/${patientId}/medico/${medicId}`);
		return response;
	},
	save: async (register: ClinicalRegisterSave) => {
		const response = await api.post('/clinicalRegister', register);
		return response;
	},
};

export default ClinicalResgiter;
