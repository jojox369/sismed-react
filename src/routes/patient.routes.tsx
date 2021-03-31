import React from 'react';
import { Route } from 'react-router-dom';
import { List, RegisterEdit } from '../pages/patient';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/patient' exact component={List} />
			<Route path='/patient/register' exact component={RegisterEdit} />
			<Route path='/patient/edit/:id' exact component={RegisterEdit} />
		</>
	);
};

export default ScheduleRoutes;
