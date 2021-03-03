import React from 'react';
import styled from 'styled-components';

/*
https://codesandbox.io/s/m3v440z36j?file=/src/index.js
*/

interface Props {
	color?: string;
}

const StyledSpinner = styled.svg<Props>`
	animation: rotate 1s linear infinite;

	width: 50px;
	height: 50px;

	& .path {
		stroke: ${props => (props.color ? props.color : '#ffffff')};
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

const Spinner: React.FC<Props> = ({ color }) => (
	<StyledSpinner viewBox='0 0 50 50' color={color}>
		<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='2' />
	</StyledSpinner>
);
export default Spinner;
