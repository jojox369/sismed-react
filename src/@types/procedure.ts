import { HealthInsurance } from './health-insurance';
export interface Procedure {
	id: number;
	name: string;
	value: string;
	healthInsurance: HealthInsurance;
}
