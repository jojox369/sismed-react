import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { List, RegisterEdit } from '../pages/employee';
import { userLogged } from '../redux/User/User.selects';

const ScheduleRoutes = () => {
	const { profile } = useSelector(userLogged);

	return (
		<>
			<Route path='/employee' exact component={List} />
			{profile !== 3 && (
				<>
					<Route path='/employee/register' exact component={RegisterEdit} />
					<Route path='/employee/edit/:id' exact component={RegisterEdit} />
				</>
			)}
		</>
	);
};

export default ScheduleRoutes;
