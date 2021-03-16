import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const ColorsInfo = styled.div``;

export const ListColors = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	& li {
		padding-left: 1em;
		text-indent: -0.7em;
		display: inline;
		font-size: 3.125rem;
		text-align: center;
	}
`;

export const FinishedColor = styled.li`
	::before {
		content: '• ';
		color: #22bb33;
	}
`;

export const NotAttendColor = styled.li`
	::before {
		content: '• ';
		color: #bb2124;
	}
`;

export const RescheduledColor = styled.li`
	::before {
		content: '• ';
		color: #f0ad4e;
	}
`;

export const ColorDescription = styled.span`
	font-size: 1.3rem;
`;
