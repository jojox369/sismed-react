export interface User {
	id: number;
	nome: string;
	perfil: number;
	token: string;
}

export interface Schedule {
	id: number;
	primeiraVez?: number;
	compareceu?: number;
	pagou?: number;
	finalizado: number;
	data: Date;
	hora: string;
	observacao: string;
	procedimento: Procedure;
	tipoHealthInsurance: HealthInsuranceType;
	paciente: Patient;
	funcionario: Employee;
}

export interface HealthInsurance {
	id: number;
	nome: string;
	cnpj: string;
	registroAns: number;
	dataAdesao: Date;
	dadosBancarios: BankData;
}

export interface BankData {
	id: number;
	banco: string;
	agencia: string;
	conta: string;
}

export interface Address {
	id: number;
	cep: string;
	logradouro: string;
	numero: number;
	complemento: string;
	bairro: string;
	cidade: string;
	estado: string;
}

export interface Exam {
	id: number;
	nome: string;
	descricao: string;
	dataColeta: Date;
	dataEnvio: Date;
	dataRetorno: Date;
	funcionarioLab: string;
	valor: number;
	tipoHealthInsurance: HealthInsuranceType;
	paciente: Patient;
	funcionario: Employee;
	laboratorio: Lab;
}

export interface Employee {
	id: number;
	nome: string;
	cpf: string;
	rg: string;
	orgaoEmissor: string;
	dataEmissao: Date;
	crm: number;
	especialidade: string;
	telefoneFixo: string;
	celular: string;
	sexo: string;
	dataNascimento: Date;
	email: string;
	estadoCivil: string;
	escolaridade: string;
	nacionalidade: string;
	naturalidade: string;
	dataInicio: Date;
	dataTermino: Date;
	endereco: Address;
	perfilId: number;
	codigo: string;
	senha: string;
}

export interface Lab {
	id: number;
	cnpj: string;
	nome: string;
	responsavel: string;
	telefoneFixo: string;
	email: string;
	endereco: Address;
}

export interface Patient {
	nome: string;
	prontuario: number;
	cpf: string;
	rg: string;
	orgaoEmissor: string;
	dataEmissao: string;
	telefoneFixo: string;
	telefoneTrabalho: string;
	celular: string;
	sexo: string;
	dataNascimento: Date | null;
	email: string;
	estadoCivil: string;
	escolaridade: string;
	profissao: string;
	recomendacao: string;
	naturalidade: string;
	nacionalidade: string;
	situacao: string;
	carteiraHealthInsurance: string;
	validade: string;
	tipoHealthInsurance: HealthInsuranceType;
	endereco: Address;
}

export interface Procedure {
	id: number;
	valor: number;
	convenio: HealthInsurance;
	descricao: string;
}

export interface ClinicalRegister {
	id: number;
	data: string;
	hora: string;
	descricao: string;
	funcionario: number;
	agendamento: number;
	quantidade: number;
	nome: string;
	prontuario: number;
	funcionarioNome: string;
	pId: number;
}

export interface Report {
	dados: [
		{
			id: number;
			valor: number;
			data: Date;
			hora: string;
			paciente: Patient;
			convenio: HealthInsurance;
			procedimento: Procedure;
			funcionario: Employee;
			agendamento: Schedule;
		},
	];

	total: number;
}

export interface HealthInsuranceType {
	id: number;
	nome: string;
	convenio: HealthInsurance;
}

export interface RouteParams {
	id: string;
}
