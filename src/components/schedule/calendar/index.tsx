import React, { useEffect, useState } from 'react';
import FullCalendar, { DateSelectArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from './styles';
import * as Functions from '../../../assets/functions';
import ScheduleService from '../../../services/schedule';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { useSelector } from 'react-redux';
import { userLogged } from '../../../redux/User/User.selects';

const buttonsText = {
	today: 'Data Atual',
	month: 'Mês',
	week: 'Semana',
	day: 'Dia',
	list: 'Lista',
};

const headerToolbar = {
	left: 'prev,next today',
	center: 'title',
	right: 'dayGridMonth,timeGridWeek,timeGridDay',
};

const handleDateSelect = (selectInfo: DateSelectArg) => {
	// const title = prompt('Please enter a new title for your event');
	const calendarApi = selectInfo.view.calendar;

	console.log(Functions.USDateFormatter(selectInfo.start));

	calendarApi.unselect(); // clear date selection

	// if (title) {
	// 	calendarApi.addEvent({
	// 		id: Math.random().toString(),
	// 		title,
	// 		start: selectInfo.startStr,
	// 		end: selectInfo.endStr,
	// 		allDay: selectInfo.allDay,
	// 	});
	// }
};

const Calendar = () => {
	const { id, perfil } = useSelector(userLogged);
	const [schedulings, setSchedulings] = useState([]);
	const [medicId, setMedicId] = useState<number | undefined>(undefined);

	const getData = async () => {
		try {
			const response = await ScheduleService.getSchedule(medicId as number);
			console.log(response);
		} catch {
			console.log('erro ao listar agendamentos');
		}
	};

	useEffect(() => {
		if (perfil !== 3) {
			setMedicId(id);
			getData();
		}
	}, []);

	return (
		<Container>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='dayGridMonth'
				contentHeight={700}
				locale='pt'
				headerToolbar={headerToolbar}
				editable={true}
				selectable={true}
				dayMaxEvents={true}
				buttonText={buttonsText}
				select={handleDateSelect}
			/>
		</Container>
	);
};

export default Calendar;
