import { Address } from './address';

export interface Lab {
	id: number;
	cnpj: string;
	name: string;
	responsible: string;
	phone: string;
	email: string | null;
	address: Address;
}
