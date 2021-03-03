export interface ClinicalRegisterSave {
	employeeId: number;
	patientId: number;
	scheduleId?: number;
	description: string;
}

export interface PreviousRegistersData {
	id: number;
	data: string;
	hora: string;
	descricao: string;
}
