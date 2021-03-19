import React from 'react';
import { Route } from 'react-router-dom';
import { List } from '../pages/clinical-register';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/clinical-registers' exact component={List} />
		</>
	);
};

export default ScheduleRoutes;
