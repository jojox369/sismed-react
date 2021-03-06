import { Address } from './address';
import { HealthInsuranceType } from './health-insurance-type';

export interface Patient {
	id: number;
	name: string;
	cellNumber: string;
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

export interface PatientSchedule {
	id: number;
	name: string;
	cpf: string;
	dateBirth?: string;
}

export interface PatientSave {
	id?: number;
	name: string;
	cellNumber: string;
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
	healthInsuranceTypeId: number;
}
