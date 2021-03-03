import { NewSchedulingForm, EditForm, PreRegisterForm } from '../@types/schedule';
import api from './api';

import EmployeeService from './employee';
import HealthInsuranceService from './health-insurance';

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
		const response = await api.get(`schedule/${schedulingId}`);
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
