import api from './api';

import EmployeeService from './employee';
import HealthInsuranceService from './health-insurance';

export interface ScheduleData {
	id: number;
	data: string;
	hora: string;
	medico: string;
	pagou: number;
	primeiraVez: number;
	observacao: string;
	finalizado: number;
	remarcado: number;
	compareceu: number;
	prontuario: number;
	nome: string;
	idade: string;
	celular: string;
	convenio: string;
	editavel: boolean;
}

export interface NewSchedulingForm {
	funcionarioId: number;
	convenioId?: number;
	tipoConvenioId?: number;
	pacienteId: number;
	procedimentoId: number;
	data: string;
	hora: string;
}

export interface PreRegisterForm {
	agenda: {
		funcionarioId: number;
		convenioId?: number;
		tipoConvenioId?: number;
		procedimentoId: number;
		data: string;
		hora: string;
	};
	paciente: {
		nome: string;
		cpf: string;
		rg?: string;
		dataNascimento?: string;
		tipoConvenioId: number;
	};
}

export interface EditData {
	id: number;
	data: string;
	hora: string;
	compareceu: number;
	pagou: number;
	primeiraVez: number;
	observacao: string;
	paciente: {
		prontuario: number;
		nome: string;
		cpf: string;
		rg: string;
		dataNascimento: string;
		tipoConvenio: {
			id: number;
			nome: string;
			convenio: {
				id: number;
				nome: string;
			};
		};
	};
	funcionario: {
		id: number;
		crm: number;
		especialidade: string;
	};
	convenio: number;
	tipoConvenio: number;
	procedimento: number;
	editavel: boolean;
}

export interface EditForm {
	id: number;
	data: string;
	hora: string;
	pacienteId: number;
	funcionarioId: number;
	convenioId?: number;
	tipoConvenioId?: number;
	procedimentoId: number;
	pagou: boolean;
	compareceu: boolean;
	observacao: string;
}

const Schedule = {
	getSchedule: async (medicId: number) => {
		const response = await api.get(`schedule?medicId=${medicId}`);
		return response;
	},

	getByDate: async (date: string, medicId: number) => {
		const response = await api.get(`schedule?medicId=${medicId}&date=${date}`);
		return response;
	},

	getById: async (schedulingId: number) => {
		const response = await api.get(`agenda/agendamento/detalhes/${schedulingId}`);
		return response;
	},

	getPreviousSchedules: async (prontuario: number) => {
		const response = await api.get(`agenda/agendamentos/anteriores/${prontuario}`);
		return response;
	},

	save: async (scheduling: NewSchedulingForm) => {
		const response = api.post('agenda/', scheduling);
		return response;
	},

	update: async (scheduling: EditForm) => {
		const response = await api.put('agenda/', scheduling);
		return response;
	},
	reschedule: async (scheduling: EditForm) => {
		const response = await api.post('agenda/remarcar/', scheduling);
		return response;
	},

	delete: async (schedulingId: number) => {
		const response = await api.delete(`agenda/${schedulingId}`);
		return response;
	},

	preRegister: async (preRegister: PreRegisterForm) => {
		const response = api.post('agenda/preCadastro/', preRegister);
		return response;
	},

	getAllData: async (schedulingId: number) => {
		let response: Record<string, any> = {};
		const schedulingResponse = await api.get(`agenda/agendamento/detalhes/${schedulingId}`);
		const healthInsuranceResponse = await EmployeeService.acceptedHealthInsurances(schedulingResponse.data.funcionario.id);
		const healthInsuranceTypesResponse = await EmployeeService.acceptedHealthInsuranceTypes(
			schedulingResponse.data.funcionario.id,
			schedulingResponse.data.convenio,
		);
		const medicsResponse = await EmployeeService.getMedics();
		const healthProceduresResponse = await HealthInsuranceService.getProcedures(schedulingResponse.data.convenio);

		response = {
			scheduling: schedulingResponse.data,
			healthInsurances: healthInsuranceResponse.data,
			healthInsuranceTypes: healthInsuranceTypesResponse.data,
			healthProcedures: healthProceduresResponse.data,
			medics: medicsResponse.data,
		};

		return response;
	},
};

export default Schedule;
