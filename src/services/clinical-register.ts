import api from './api';

export interface ClinicalResgiterScheduleForm {
	data: string;
	hora: string;
	descricao: string;
	funcionarioId: number;
	agendamentoId: number;
	pacienteId: number;
}

export interface PreviousRegistersData {
	id: number;
	data: string;
	hora: string;
	descricao: string;
}

const ClinicalResgiter = {
	getByPatient: async (patientId: number, medicId: number) => {
		const response = await api.get(`/registroClinico/paciente/${patientId}/medico/${medicId}`);
		return response;
	},
	save: async (register: ClinicalResgiterScheduleForm) => {
		const response = await api.post('/registroClinico/', register);
		return response;
	},
};

export default ClinicalResgiter;
