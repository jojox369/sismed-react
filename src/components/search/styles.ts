import styled from 'styled-components';

interface Props {
	active: boolean;
}

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const DropDownBox = styled.div`
	position: relative;
`;

export const DropDownList = styled.ul`
	position: absolute;
	background-color: #f9f9f9;
	min-width: 10rem;
	box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
	padding: 0.75rem 1rem;
	margin-left: 0.3125rem;
	border-radius: 0.3125rem;
	z-index: 1;
	&:first-child {
		padding-top: 0.8em;
	}
`;

export const ListItem = styled.li<Props>`
	list-style: none;
	margin-bottom: 0.8em;
	cursor: pointer;
	&:hover {
		color: #5234e5;
	}
	${props =>
		props.active &&
		`
			color: #5234E5;
			cursor: default;
			&:hover {
				color: #4028b2;
			}
		`}
`;
