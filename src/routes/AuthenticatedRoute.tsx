import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { userLogged } from '../redux/User/User.selects';

const RouteAuthenticated = ({ component: Component, path }: RouteProps): JSX.Element => {
	const { token } = useSelector(userLogged);

	if (!token) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			<div className='bodyApplication'>
				<Route component={Component} path={path} />
			</div>
		</>
	);
};

export default RouteAuthenticated;
