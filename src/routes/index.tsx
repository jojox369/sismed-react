import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';

import ForgotPassword from '../pages/forgotPassword';
import Home from '../pages/home';
import Login from '../pages/login';
import { userLogged } from '../redux/User/User.selects';
import RouteAuthenticated from './AuthenticatedRoute';
import ScheduleRoutes from './schedule.routes';
import ClinicalRegisterRoutes from './clinical.record.routes';
import PatientRoutes from './patient.routes';
import RouteUnauthenticated from './UnauthenticatedRoute';

const Routes = (): JSX.Element => {
	const { token } = useSelector(userLogged);
	const [url, setUrl] = useState('/');

	useEffect(() => {
		const FallBackUri = () => {
			setUrl(`${token ? '/' : '/login'}`);
		};
		FallBackUri();
	}, [token]);

	return (
		<Switch>
			<RouteUnauthenticated path='/login' component={Login} />
			<RouteUnauthenticated path='/forgot-password' component={ForgotPassword} />

			<RouteAuthenticated path='/' exact component={Home} />

			<RouteAuthenticated path='/schedule' component={ScheduleRoutes} />
			<RouteAuthenticated path='/clinical-record' component={ClinicalRegisterRoutes} />
			<RouteAuthenticated path='/patient' component={PatientRoutes} />

			<Redirect to={url} />
		</Switch>
	);
};

export default Routes;
