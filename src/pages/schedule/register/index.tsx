import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useEffect, useRef, useState } from 'react';
import { Employee } from '../../../@types/employee';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { Procedure } from '../../../@types/procedure';
import { ScheduleDetails } from '../../../@types/schedule';
import { Button } from '../../../assets/styles/global';
import { ButtonsArea, Container, Content, EmployeeArea, Form, PatientArea, SchedulingArea } from './styles';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import ProcedureService from '../../../services/procedure';
import { Message } from '../../../assets/functions';
import { PatientDetails, EmployeeDetails, SchedulingDetails } from '../../../components';

interface SaveForm {
	attended: string;
	date: string;
	employeeId: string;
	healthInsurance: string;
	healthInsuranceType: string;
	paid: string;
	procedureId: string;
	time: string;
}
const initialState = {
	id: 0,
	date: '',
	time: '',
	firstTime: 0,
	finished: 0,
	paid: 0,
	attended: 0,
	notes: '',
	employee: { id: 0, name: '', crm: '', specialty: '' },
	patient: { id: 0, name: '', cpf: '', dateBirth: '' },
	healthInsuranceType: { id: 0, name: '', healthInsurance: { id: 0, name: '' } },
	procedure: { id: 0, name: '', value: 0, healthInsurance: { id: 0, name: '' } },
};
const Register = () => {
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>(initialState);
	const [medics, setMedics] = useState<Employee[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);
	const [procedures, setProcedures] = useState<Procedure[]>([]);
	const formRef = useRef<FormHandles>(null);

	const getData = async () => {
		setLoading(true);
		try {
			const { data } = await EmployeeService.getMedics();

			setMedics(data);
		} catch {
			Message('Não foi possivel recuperar a lista de médicos', 1);
		} finally {
			setLoading(false);
		}
		/* try {
			const { data } = await EmployeeService.getHealthInsurancesAccepted(medicId);
			setHealthInsuranceTypes(data);
		} catch {
			Message('Não foi possivel recuperar a lista de convênios aceitos pelo médico', 1);
		} */

		/* 	try {
			const { data } = await ProcedureService.list(healthInsuranceId);
			setProcedures(data);
		} catch {
			Message('Não foi possivel recuperar a lista de procedimentos ', 1);
		} */
	};

	/* **************** Employee functions ************** */
	const changeEmployee = async (id: number) => {
		try {
			const { data } = await EmployeeService.getById(id);
			setScheduling({ ...scheduling, employee: data });
		} catch {
			Message('Erro ao tentar recuperar as informações do médico', 1);
		}
	};

	/* **************** Schedule functions ************** */
	const onHealthInsuranceChange = (id: number, name: string) => {
		setScheduling({
			...scheduling,
			healthInsuranceType: { id: 0, name: '', healthInsurance: { ...scheduling.healthInsuranceType.healthInsurance, id, name } },
		});
	};

	const onSelectChange = (id: number, name: string) => {
		setScheduling({
			...scheduling,
			healthInsuranceType: { ...scheduling.healthInsuranceType, id, name },
		});
	};

	const onNotesChange = (notes: string) => {
		setScheduling({ ...scheduling, notes });
	};

	const onSubmit: SubmitHandler<SaveForm> = async dataForm => {
		console.log(dataForm);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Container>
			<ButtonsArea>
				<Button form='form'>Agendar</Button>
			</ButtonsArea>
			<Content>
				<Form onSubmit={onSubmit} id='form' ref={formRef}>
					<PatientArea>
						<PatientDetails patient={scheduling.patient} edit={true} />
					</PatientArea>

					<EmployeeArea>
						<EmployeeDetails employee={scheduling.employee} changeEmployee={changeEmployee} medics={medics} edit={true} />
					</EmployeeArea>

					<SchedulingArea>
						<SchedulingDetails
							scheduling={scheduling}
							healthInsuranceTypes={healthInsuranceTypes}
							procedures={procedures}
							onSelectChange={onSelectChange}
							onHealthInsuranceChange={onHealthInsuranceChange}
							onNotesChange={onNotesChange}
							newScheduling={true}
						/>
					</SchedulingArea>
				</Form>
			</Content>
		</Container>
	);
};

export default Register;
