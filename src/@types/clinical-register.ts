export interface ClinicalRegisterSave {
	employeeId: number;
	patientId: number;
	scheduleId?: number;
	description: string;
}

export interface PreviousRegisters {
	id: number;
	date: string;
	time: string;
	description: string;
}

export interface ClinicalRegistersList extends PreviousRegisters {
	employeeId: number;
	patientId: number;
	scheduleId: number;
}
