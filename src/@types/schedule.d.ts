import { Patient } from './patient';

export interface Schedule {
	id: number;
	date: string;
	time: string;
	medic: string;
	paid: number;
	firstTime: number;
	finished: number;
	rescheduled: number;
	attended: number;
	patient: {
		id: number;
		name: string;
		age: string;
		cellPhone: string;
	};
	healthInsurance: string;
	editable: boolean;
	notes: string;
}

export interface ScheduleAttendance {
	id: number;
	firstTime: number;
	notes: string;
	employeeId: number;
	patient: Patient;
}

export interface UpdateSchedule {
	id: number;
	date?: string;
	time?: string;
	paid?: number;
	firstTime?: number;
	finished?: number;
	rescheduled?: number;
	attended?: number;
	notes?: string;
	employeeId?: number;
	patientId?: number;
	healthInsuranceTypeId?: number;
	procedureId?: number;
}
