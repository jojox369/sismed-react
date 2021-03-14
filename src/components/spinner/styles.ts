import styled from 'styled-components';

interface Props {
	color?: string;
}

export const SpinnerContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const StyledSpinner = styled.svg<Props>`
	animation: rotate 1s linear infinite;

	width: 50px;
	height: 50px;

	& .path {
		stroke: ${props => (props.color ? props.color : '#000000')};
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
