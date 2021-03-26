import React from 'react';
import { Route } from 'react-router-dom';
import { List, Register, Edit } from '../pages/clinical-record';

const ScheduleRoutes = () => {
	return (
		<>
			<Route path='/clinical-record' exact component={List} />
			<Route path='/clinical-record/save/:id' component={Register} />
			<Route path='/clinical-record/edit/:id' component={Edit} />
		</>
	);
};

export default ScheduleRoutes;
