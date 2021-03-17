import { PatientSchedule } from './patient';
import { Medic } from './employee';
import { HealthInsuranceTypeSchedule } from './health-insurance-type';
import { ProcedureSchedule } from './procedure';

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

export interface ScheduleDetails {
	id: number;
	date: string;
	time: string;
	firstTime: number;
	finished: number;
	paid: number;
	attended: number;
	notes: string;
	employee: Medic;
	patient: PatientSchedule;
	healthInsuranceType: HealthInsuranceTypeSchedule;
	procedure: ProcedureSchedule;
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

export interface NewScheduling {
	date: string;
	time: string;
	employeeId: number;
	healthInsuranceTypeId: number;
	procedureId: number;
	patient: PatientSchedule;
}
