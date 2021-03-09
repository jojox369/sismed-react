import { Address } from './address';
import { HealthInsuranceType } from './health-insurance-type';
export interface Patient {
	id: number;
	name: string;
	cellPhone: string;
	cpf?: string;
	dateBirth?: string;
	email?: string;
	emittingDate?: string;
	emittingOrgan?: string;
	healthInsuranceNumber?: string;
	jobPhone?: string;
	maritalStatus?: string;
	nationality?: string;
	naturalness?: string;
	phone: string;
	profession?: string;
	recommendation?: string;
	rg?: string;
	schooling?: string;
	sex?: string;
	situation: string;
	validity?: string;
	address?: Address;
	healthInsuranceType: HealthInsuranceType;
	age?: string;
}
