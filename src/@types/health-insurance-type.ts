import { HealthInsurance, HealthInsuranceSchedule } from './health-insurance';

export interface HealthInsuranceType {
	id: number;
	name: string;
	healthInsurance: HealthInsurance;
}

export interface HealthInsuranceTypeSchedule {
	id: number;
	name: string;
	healthInsurance: HealthInsuranceSchedule;
}
