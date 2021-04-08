import { Address } from './address';
import { Profile } from './profile';

export interface Employee {
	id?: number;
	name: string;
	cpf: string;
	rg: string;
	emittingOrgan: string;
	emittingDate: string;
	phone: string;
	cellNumber: string;
	sex: string;
	dateBirth: string;
	email: string;
	maritalStatus: string;
	schooling: string;
	naturalness: string;
	nationality: string;
	beginDate: string;
	dismissalDate?: string;
	crm?: string;
	specialty?: string;
	recoveryCode?: string;
	password?: string;
	address: Address;
	profile: Profile;
}

export interface Medic {
	id: number;
	name: string;
	crm?: string;
	specialty?: string;
}
