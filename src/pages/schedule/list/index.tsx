import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message } from '../../../assets/functions';
import { Calendar } from '../../../components/schedule';
import { userLogged } from '../../../redux/User/User.selects';
import { ScheduleData } from '../../../services/schedule';
import ScheduleService from '../../../services/schedule';

const List = () => {
	const { id, perfil } = useSelector(userLogged);
	const [schedules, setSchedules] = useState<ScheduleData[]>([]);

	useEffect(() => {
		if (perfil !== 3) {
			getData();
		}
	}, []);
	const getData = async () => {
		try {
			const response = await ScheduleService.getSchedule(id);
			setSchedules(response.data);
		} catch {
			Message('Não foi possivel carregar os agendamentos', 1);
		}
	};
	return <Calendar schedules={schedules} />;
};

export default List;
