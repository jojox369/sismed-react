import { UpdateSchedule } from '../@types/schedule';
import api from './api';

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

	update: async (scheduling: UpdateSchedule) => {
		const response = await api.put('schedule/', scheduling);
		return response;
	},
};

export default Schedule;
