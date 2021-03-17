import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Schedule } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { Calendar, Error, SchedulingDetailsModal, Select, Spinner } from '../../../components';
import { userLogged } from '../../../redux/User/User.selects';
import ScheduleService from '../../../services/schedule';
import EmployeeService from '../../../services/employee';
import { ColorDescription, ColorsInfo, Container, FinishedColor, ListColors, NotAttendColor, RescheduledColor, Form } from './styles';

const initialState = {
	id: 0,
	date: '',
	time: '',
	medic: '',
	paid: 0,
	firstTime: 0,
	finished: 0,
	rescheduled: 0,
	attended: 0,
	patient: {
		id: 0,
		name: '',
		age: '',
		cellPhone: '',
	},
	healthInsurance: '',
	editable: false,
	notes: '',
};

const List = () => {
	const { id, profile } = useSelector(userLogged);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [medics, SetMedics] = useState([]);

	const [selectedScheduling, setSelectedScheduling] = useState(initialState);

	const getData = async () => {
		setLoading(false);
		try {
			const response = await ScheduleService.getSchedule(id);
			setSchedules(response.data);
		} catch {
			Message('Não foi possivel carregar os agendamentos', 1);
			setHasError(true);
		} finally {
			setLoading(false);
		}
	};

	const getScheduling = (id: number) => {
		const scheduling = schedules.filter(scheduling => scheduling.id === id);
		if (scheduling[0].finished !== 1) {
			setShowModal(true);
			setSelectedScheduling(scheduling[0]);
		}
	};

	const getMedics = async () => {
		try {
			const { data } = await EmployeeService.getMedics();
			SetMedics(data);
		} catch {
			Message('Erro ao tentar listar os médicos disponíveis', 1);
		}
	};

	const onChange = async (id: number) => {
		try {
			const response = await ScheduleService.getSchedule(id);
			setSchedules(response.data);
		} catch {
			Message('Não foi possivel carregar os agendamentos', 1);
			setHasError(true);
		}
	};

	useEffect(() => {
		if (profile !== 3) {
			getData();
		} else {
			getMedics();
		}
	}, []);

	// useEffect(() => {
	// 	if (initialRender.current) {
	// 		initialRender.current = false;
	// 	} else {
	// 		if (selectedScheduling.finished !== 1) {

	// 		}
	// 	}
	// }, [selectedScheduling]);

	return (
		<>
			<SchedulingDetailsModal showModal={showModal} handleClose={() => setShowModal(false)} scheduling={selectedScheduling as Schedule} />
			<Container>
				{!loading && (
					<>
						{profile === 3 && (
							<Form onSubmit={() => null}>
								<Select
									fieldActive={false}
									label='Selecione um médico'
									options={medics}
									name='selectDoctor'
									onChange={e => onChange(+e.target.value)}
								/>
							</Form>
						)}

						<Calendar
							schedules={schedules}
							onClickEvent={id => {
								getScheduling(id);
							}}
						/>
						<ColorsInfo>
							<ListColors>
								<FinishedColor>
									<ColorDescription>Finalizado</ColorDescription>
								</FinishedColor>
								<NotAttendColor>
									<ColorDescription>Paciente não compareceu </ColorDescription>
								</NotAttendColor>
								<RescheduledColor>
									<ColorDescription>Remarcado</ColorDescription>
								</RescheduledColor>
							</ListColors>
						</ColorsInfo>
					</>
				)}
				{loading && <Spinner />}
				{hasError && <Error />}
			</Container>
		</>
	);
};

export default List;
