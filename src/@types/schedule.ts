import { Patient } from './patient';
import { Employee } from './employee';
import { HealthInsuranceType } from './health-insurance-type';
import { Procedure } from './procedure';
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
	firstTime: number;
	paid: number;
	notes: string;
	employee: Employee;
	patient: Patient;
	healthInsuranceType: HealthInsuranceType;
	procedure: Procedure;
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
