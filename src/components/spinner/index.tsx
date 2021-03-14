import React from 'react';
import { SpinnerContainer, StyledSpinner } from './styles';
/*
https://codesandbox.io/s/m3v440z36j?file=/src/index.js
*/

interface Props {
	color?: string;
}

const Spinner: React.FC<Props> = ({ color }) => (
	<SpinnerContainer>
		<StyledSpinner viewBox='0 0 50 50' color={color}>
			<circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='2' />
		</StyledSpinner>
	</SpinnerContainer>
);
export default Spinner;
