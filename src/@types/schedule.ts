export interface ScheduleData {
	id: number;
	date: string;
	time: string;
	medic: string;
	paid: number;
	firstTime: number;
	finished: number;
	rescheduled: number;
	attended: number;
	patient: {
		id: number;
		name: string;
		age: string;
		cellPhone: string;
	};
	healthInsurance: string;
	editable: boolean;
	notes: string;
}

export interface ScheduleAttendance {
	id: number;
	firstTime: number;
	notes: string;
	employeeId: number;
	patient: {
		id: number;
		name: string;
		age: number;
		cellPhone: string;
	};
}

export interface NewSchedulingForm {
	funcionarioId: number;
	convenioId?: number;
	tipoConvenioId?: number;
	pacienteId: number;
	procedimentoId: number;
	data: string;
	hora: string;
}

export interface PreRegisterForm {
	agenda: {
		funcionarioId: number;
		convenioId?: number;
		tipoConvenioId?: number;
		procedimentoId: number;
		data: string;
		hora: string;
	};
	paciente: {
		nome: string;
		cpf: string;
		rg?: string;
		dataNascimento?: string;
		tipoConvenioId: number;
	};
}

export interface EditData {
	id: number;
	data: string;
	hora: string;
	compareceu: number;
	pagou: number;
	primeiraVez: number;
	observacao: string;
	paciente: {
		prontuario: number;
		nome: string;
		cpf: string;
		rg: string;
		dataNascimento: string;
		tipoConvenio: {
			id: number;
			nome: string;
			convenio: {
				id: number;
				nome: string;
			};
		};
	};
	funcionario: {
		id: number;
		crm: number;
		especialidade: string;
	};
	convenio: number;
	tipoConvenio: number;
	procedimento: number;
	editavel: boolean;
}

export interface EditForm {
	id: number;
	data: string;
	hora: string;
	pacienteId: number;
	funcionarioId: number;
	convenioId?: number;
	tipoConvenioId?: number;
	procedimentoId: number;
	pagou: boolean;
	compareceu: boolean;
	observacao: string;
}
