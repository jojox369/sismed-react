import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import SideBar from '../components/sidebar';

import { userLogged } from '../redux/User/User.selects';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;

const Content = styled.div`
	flex: 1;
	margin-left: 250px;
	> * {
		height: 100%;
	}
`;

const RouteAuthenticated = ({ component: Component, path }: RouteProps): JSX.Element => {
	const { token } = useSelector(userLogged);

	if (!token) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			<SideBar />
			<Container>
				<Content>
					<Route component={Component} path={path} />
				</Content>
			</Container>
		</>
	);
};

export default RouteAuthenticated;
