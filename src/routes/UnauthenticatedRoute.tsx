import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { userLogged } from '../redux/User/User.selects';

const RouteUnauthenticated = ({ component: Component, path }: RouteProps) => {
	const { token } = useSelector(userLogged);

	if (token) {
		return <Redirect to='/' />;
	}

	return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
