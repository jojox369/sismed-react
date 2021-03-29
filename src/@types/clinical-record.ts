export interface ClinicalRecordSave {
	employeeId: number;
	patientId: number;
	scheduleId?: number;
	description: string;
}

export interface ClinicalRecordUpdate {
	id: number;
	description: string;
}

export interface PreviousRecords {
	id: number;
	date: string;
	time: string;
	description: string;
}

export interface ClinicalRecordsList extends PreviousRecords {
	amount: string;
	patient: { id: number; name: string };
}
