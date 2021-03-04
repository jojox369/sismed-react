import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import SideBar from '../components/sidebar';

import { userLogged } from '../redux/User/User.selects';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-left: 250px;
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
				<Content>
					<Route component={Component} path={path} />
				</Content>
			</Container>
		</>
	);
};

export default RouteAuthenticated;
