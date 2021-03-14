import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
	active: boolean;
}

export const SidebarContainer = styled.section`
	height: 100%;
	width: 15.625rem;
	background-color: #0187ce;
	color: #fff;
	display: flex;
	flex-direction: column;
	font-family: 'Roboto', sans-serif;
	position: fixed;
	overflow-x: hidden;
`;

export const SidebarMenu = styled.ul`
	display: flex;
	align-items: left;
	flex-direction: column;
	list-style: none;
	width: 100%;
	padding-left: 0px;
`;

export const MenuLogo = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1rem;
	font-size: 1.125rem;
	line-height: 1.5;
	font-weight: 600;
	height: 45px;
	color: #fff;
	margin: 0px 1.875rem 1.875rem 1.875rem;
	padding-bottom: 20px;
	border-bottom: 1px solid #2e2e33;
`;

export const SidebarMenuItem = styled.li<Props>`
	display: flex;
	height: 40px;
	width: 100%;
	align-items: center;
	padding-left: 1.875rem;
	&:hover {
		background: rgba(255, 255, 255, 0.05);
		box-shadow: inset 3px 0 0 0 #ffffff;
		cursor: pointer;
	}
	${props =>
		props.active &&
		`background:#006ca4
	`}
`;

export const Icon = styled.svg`
	width: 20px;
	height: 20px;
`;

export const SidebarMenuItemLabel = styled(Link)`
	font-family: 'Open Sans', sans-serif;
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	line-height: 1.3;
	text-align: left;
	padding: 0.75rem 0;
	margin-left: 1.25rem;
	color: #ffffff;
	text-decoration: none;
`;

export const MenuSignOut = styled.div`
	border-top: 1px solid #2e2e33;
	font-size: 0.875rem;
	line-height: 1.5;
	font-weight: 500;
	height: 45px;
	color: #fff;
	margin: 12.5rem 1.875rem 3.75rem 1.875rem;
	padding: 1.25rem 0 0 1.875rem;
`;
