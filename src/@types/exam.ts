import { Lab } from './lab';
import { Patient } from './patient';

export interface Exam {
	id: number;
	name: string;
	description: string;
	collectionDate: string;
	sendDate: string;
	returnDate: string | null;
	labEmployee: string;
	value: string;
	lab: Lab;
	patient: Patient;
}
