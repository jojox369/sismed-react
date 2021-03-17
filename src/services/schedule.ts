import { NewScheduling, UpdateSchedule } from '../@types/schedule';
import api from './api';

const baseURL = '/schedule';

const Schedule = {
	getSchedule: async (medicId: number) => {
		const response = await api.get(`${baseURL}?medicId=${medicId}`);

		return response;
	},

	getByDate: async (date: string, medicId: number) => {
		const response = await api.get(`${baseURL}?medicId=${medicId}&date=${date}`);
		return response;
	},

	getById: async (schedulingId: number) => {
		const response = await api.get(`${baseURL}/${schedulingId}`);
		return response;
	},

	save: async (scheduling: NewScheduling) => {
		const response = await api.post(`${baseURL}/`, scheduling);
		return response;
	},

	update: async (scheduling: UpdateSchedule) => {
		const response = await api.put(`${baseURL}/`, scheduling);
		return response;
	},

	reschedule: async (scheduling: UpdateSchedule) => {
		const response = await api.put(`${baseURL}/reschedule`, scheduling);
		return response;
	},

	delete: async (id: number) => {
		const response = await api.delete(`${baseURL}/${id}`);
		return response;
	},
};

export default Schedule;
