import React from 'react';
import { Route } from 'react-router-dom';
import { List, Register } from '../pages/clinical-register';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/clinical-registers' exact component={List} />
			<Route path='/clinical-registers/save/:id' component={Register} />
		</>
	);
};

export default ScheduleRoutes;
