import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container } from './styles';
import { Schedule } from '../../../@types/schedule';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

interface Events {
	id: string;
	title: string;
	start: string;
	allDay: boolean;
	color: string;
}

interface Props {
	schedules: Schedule[];
	onClickEvent: (id: number) => void;
}
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

/* const handleDateSelect = (selectInfo: DateSelectArg) => {
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
}; */

const verifyStatus = (finished: number, rescheduled: number, attended: number) => {
	const finishedColor = '#22bb33';
	const notAttendColor = '#bb2124';
	const rescheduledColor = '#f0ad4e';

	if (finished === 1 && attended === 1) {
		//Paciente atendido
		return finishedColor;
	}
	if (finished === 1 && attended === 0 && rescheduled === 0) {
		//Paciente não compareceu
		return notAttendColor;
	}
	if (finished === 1 && rescheduled === 1 && attended === 0) {
		//Paciente Remarcado
		return rescheduledColor;
	}
	return 'default';
};

const Calendar: React.FC<Props> = ({ schedules, onClickEvent }) => {
	const [events, setEvents] = useState<Events[]>([]);
	const initialRender = useRef(true);

	const buildEvents = () => {
		const events = schedules.map(scheduling => {
			return {
				id: scheduling.id.toString(),
				title: scheduling.patient.name,
				start: `${scheduling.date}T${scheduling.time}`,
				allDay: false,
				color: verifyStatus(scheduling.finished, scheduling.rescheduled, scheduling.attended),
				description: 'teste',
			};
		});
		setEvents(events);
	};
	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			buildEvents();
		}
	}, [schedules]);

	return (
		<Container>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='timeGridDay'
				contentHeight={700}
				locale='pt'
				headerToolbar={headerToolbar}
				editable={true}
				selectable={true}
				dayMaxEvents={true}
				buttonText={buttonsText}
				// select={handleDateSelect}
				events={events}
				displayEventTime={true}
				allDayText='Dia Todo'
				eventClick={arg => onClickEvent(+arg.event.id)}
				eventDisplay='block'
			/>
		</Container>
	);
};

export default Calendar;
