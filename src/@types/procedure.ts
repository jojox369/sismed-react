import { HealthInsurance, HealthInsuranceSchedule } from './health-insurance';

export interface Procedure {
	id: number;
	name: string;
	value: number;
	healthInsurance: HealthInsurance;
}

export interface ProcedureSchedule {
	id: number;
	name: string;
	value: number;
	healthInsurance: HealthInsuranceSchedule;
}
