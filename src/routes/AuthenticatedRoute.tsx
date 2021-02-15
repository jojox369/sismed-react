import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import SideBar from '../components/sidebar';

import { userLogged } from '../redux/User/User.selects';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const RouteAuthenticated = ({ component: Component, path }: RouteProps): JSX.Element => {
	const { token } = useSelector(userLogged);

	if (!token) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			<Container>
				<SideBar />
				<Route component={Component} path={path} />
			</Container>
		</>
	);
};

export default RouteAuthenticated;
