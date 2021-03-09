import { BankData } from './bank-data';
export interface HealthInsurance {
	id: number;
	name: string;
	accessionDate: string;
	cnpj?: string;
	ansRegister?: string;
	bankData: BankData;
}
