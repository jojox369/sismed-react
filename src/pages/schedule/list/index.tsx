import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Schedule } from '../../../@types/schedule';
import { Message } from '../../../assets/functions';
import { Calendar, SchedulingDetails } from '../../../components';
import { userLogged } from '../../../redux/User/User.selects';

import ScheduleService from '../../../services/schedule';

import { Container } from './styles';

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
	const { id, perfil } = useSelector(userLogged);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [selectedScheduling, setSelectedScheduling] = useState(initialState);
	const initialRender = useRef(true);

	const getData = async () => {
		try {
			const response = await ScheduleService.getSchedule(id);
			setSchedules(response.data);
		} catch {
			Message('Não foi possivel carregar os agendamentos', 1);
		}
	};

	const getScheduling = () => {
		const scheduling = schedules.filter(scheduling => scheduling.id === selectedId);
		setSelectedScheduling(scheduling[0]);
	};

	useEffect(() => {
		if (perfil !== 3) {
			getData();
		}
	}, []);

	useEffect(() => {
		if (selectedId !== 0) {
			getScheduling();
		}
	}, [selectedId]);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			setShowModal(true);
		}
	}, [selectedScheduling]);

	return (
		<>
			<SchedulingDetails
				showModal={showModal && setSelectedScheduling !== undefined}
				handleClose={() => setShowModal(false)}
				scheduling={selectedScheduling as Schedule}
			/>
			<Container>
				<Calendar
					schedules={schedules}
					onClickEvent={id => {
						setSelectedId(id);
					}}
				/>
			</Container>
		</>
	);
};

export default List;
