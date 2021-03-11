import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import { ScheduleDetails } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { EmployeeDetails, PatientDetails, SchedulingDetails } from '../../../components';
import Spinner from '../../../components/spinner';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import { Container, EmployeeArea, PatientArea, SchedulingArea, ButtonsArea, Content, CustomForm } from './styles';
import { Employee } from '../../../@types/employee';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { Button, DangerButton, ConfirmButton } from '../../../assets/styles/global';

const Edit = () => {
	const { id } = useParams<RouteParams>();
	const [loading, setLoading] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>({} as ScheduleDetails);
	const [medics, setMedics] = useState<Employee[]>([]);
	const [healthInsuranceTypes, setHealthInsuranceTypes] = useState<HealthInsuranceType[]>([]);

	const getData = async () => {
		setLoading(true);
		try {
			const response = await ScheduleService.getById(+id);
			getArrays(response.data.employee.id);

			setScheduling(response.data);
		} catch {
			Message('Não foi possivel recuperar as informações do agendamento', 1);
		}
	};

	const getArrays = async (id: number) => {
		try {
			const { data } = await EmployeeService.getMedics();

			setMedics(data);
		} catch {
			Message('Não foi possivel recuperar a lista de médicos', 1);
		}
		try {
			const { data } = await EmployeeService.getHealthInsurancesAccepted(id);
			setHealthInsuranceTypes(data);
		} catch {
			Message('Não foi possivel recuperar a lista de convênios aceitos pelo médico', 1);
		} finally {
			setLoading(false);
		}
	};

	const changeEmployee = async (id: number) => {
		try {
			const { data } = await EmployeeService.getById(id);
			setScheduling({ ...scheduling, employee: data });
		} catch {
			Message('Erro ao tentar recuperar as informações do médico', 1);
		}
	};

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

	const onSubmit = () => {
		return;
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{!loading && scheduling.id ? (
				<>
					<Container>
						<ButtonsArea>
							<ConfirmButton>Atualizar</ConfirmButton>
							<DangerButton>Excluir</DangerButton>
							<Button>Não compareceu</Button>
						</ButtonsArea>
						<Content>
							<PatientArea>
								<PatientDetails patient={scheduling.patient} />
							</PatientArea>
							<CustomForm onSubmit={onSubmit}>
								<EmployeeArea>
									<EmployeeDetails employee={scheduling.employee} changeEmployee={changeEmployee} medics={medics} />
								</EmployeeArea>

								<SchedulingArea>
									<SchedulingDetails
										scheduling={scheduling}
										healthInsuranceTypes={healthInsuranceTypes}
										onSelectChange={onSelectChange}
										onHealthInsuranceChange={onHealthInsuranceChange}
									/>
								</SchedulingArea>
							</CustomForm>
						</Content>
					</Container>
				</>
			) : (
				<Spinner color='#000' />
			)}
		</>
	);
};

export default Edit;
