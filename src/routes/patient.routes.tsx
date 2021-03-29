import React from 'react';
import { Route } from 'react-router-dom';
import { List } from '../pages/patient';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/patient' exact component={List} />
		</>
	);
};

export default ScheduleRoutes;
