import styled from 'styled-components';

interface DivProps {
	focused: boolean;
	error?: string;
	required?: boolean;
}
export const InputContainer = styled.div<DivProps>`
	width: 100%;
	height: 56px;
	border-radius: 4px;
	position: relative;
	background-color: ${props => (props.focused ? '#fff' : 'rgba(255, 255, 255, 0.8)')};
	margin-top: 1.25rem;
	transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

	&:hover {
		background-color: rgba(255, 255, 255, 0.45);
		box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
	}

	& input {
		width: 100%;
		height: 56px;
		position: relative;
		padding: 0px 16px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		font-weight: 400;
		line-height: normal;
		background-color: transparent;
		color: #282828;
		outline: none;
		box-shadow: ${props => (props.error ? '0px 4px 20px 0px  #ec392f' : '0px 4px 20px 0px transparent')};
		transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
		-webkit-appearance: none;
	}

	& input:disabled::-webkit-input-placeholder {
		color: -internal-light-dark(graytext, rgb(170, 170, 170));
	}

	& input:enabled::-webkit-input-placeholder {
		color: ${props => (props.error ? '#ec392f' : '#0287CE')};
	}

	& input:focus::-webkit-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input::-moz-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input:-ms-input-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}
	& input:-moz-placeholder {
		color: rgba(255, 255, 255, 0.8);
	}

	& input + label {
		position: absolute;
		top: 15px;
		left: 16px;
		font-size: 15px;
		font-weight: 600;
		line-height: 24px;
		color: #0287ce;
		pointer-events: none;
		transition: 0.1s all ease-in-out;
	}

	& input:focus {
		box-shadow: 0px 4px 20px 0px #0287ce;
	}

	${props =>
		props.focused &&
		`
			background-color: #ffffff;
			box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
			& input{
				padding: 24px 16px 8px 16px;
				
			}
			& input + label{
				top: 4px;
				opacity: 1;
				color: #0287CE;
				font-size: 12px;

			}
			& input:enabled::-webkit-input-placeholder {
  			color: transparent;
			}	
		`}

	${props =>
		props.error &&
		`
			& input::-webkit-input-placeholder {
  			color: #ec392f;
			}
			& input + label{
  			color: ${props.focused ? '#0287CE' : '#ec392f'};

			}
`}



	${props =>
		props.required &&
		`
		& input + label::after {
				content:' *';
  			color: #ec392f;
			}
			
		`}
`;
