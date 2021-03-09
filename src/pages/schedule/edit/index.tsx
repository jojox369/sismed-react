import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RouteParams } from '../../../@types/router';
import { ScheduleDetails } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { EmployeeDetails, PatientDetails, SchedulingDetails } from '../../../components';
import Spinner from '../../../components/spinner';
import ScheduleService from '../../../services/schedule';
import { Container, EmployeeArea, PatientArea, SchedulingArea } from './styles';
const Edit = () => {
	const { id } = useParams<RouteParams>();
	const [loading, setLoading] = useState(false);
	const [scheduling, setScheduling] = useState<ScheduleDetails>({} as ScheduleDetails);

	const getData = async () => {
		setLoading(true);
		try {
			const response = await ScheduleService.getById(+id);
			setScheduling(response.data);
		} catch {
			Message('Não foi possivel recuperar as informações do agendamento', 1);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{!loading && scheduling.id ? (
				<>
					<Container>
						<PatientArea>
							<PatientDetails patient={scheduling.patient} />
						</PatientArea>

						<EmployeeArea>
							<EmployeeDetails />
						</EmployeeArea>
						<SchedulingArea>
							<SchedulingDetails />
						</SchedulingArea>
					</Container>
				</>
			) : (
				<Spinner color='#000' />
			)}
		</>
	);
};

export default Edit;
