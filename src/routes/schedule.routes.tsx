import React from 'react';
import { Route } from 'react-router-dom';
import { Attendance, Schedule, Edit, PreRegister, Register } from '../pages/schedule';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/agenda' exact component={Schedule} />
			<Route path='/schedule/edit/:id' component={Edit} />
			<Route path='/schedule/register/:id' component={Register} />
			<Route path='/schedule/attendance/:id' component={Attendance} />
			<Route path='/schedule/preregister' component={PreRegister} />
		</>
	);
};

export default ScheduleRoutes;
