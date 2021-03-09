import { Address } from './address';
import { Profile } from './profile';
export interface Employee {
	id: number;
	address: Address;
	beginDate: string;
	cellPhone: string;
	cpf: string;
	crm?: string;
	dateBirth: string;
	dismissalDate?: string;
	email: string;
	emittingDate: string;
	emittingOrgan: string;
	maritalStatus: string;
	name: string;
	nationality: string;
	naturalness: string;
	password: string;
	phone: string;
	profile: Profile;
	recoveryCode?: string;
	rg: string;
	schooling: string;
	sex: string;
}
