import React from 'react';
import { AnimatePresence } from 'framer-motion';

import {
	Overlay,
	modalVariant,
	ModalContainer,
	containerVariant,
	CloseButton,
	ModalContent,
	Header,
	Footer,
	Title,
	ButtonArea,
} from './styles';
import { ConfirmButton, DangerButton } from '../../assets/styles/global';

interface Props {
	handleClose: () => void;
	onClickConfirmButton: () => void;
	isOpen: boolean;
	confirmButtonTitle: string;
}

// https://codesandbox.io/s/react-animated-modal-9rm6l?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:183-347
const Modal: React.FC<Props> = ({ handleClose, children, isOpen, confirmButtonTitle, onClickConfirmButton }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<Overlay initial={'initial'} animate={'isOpen'} exit={'exit'} variants={modalVariant}>
					<ModalContainer variants={containerVariant}>
						<Header>
							<CloseButton onClick={handleClose} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20.39 20.39'>
								<title>close</title>
								<line
									x1='19.39'
									y1='19.39'
									x2='1'
									y2='1'
									fill='none'
									stroke='#006ca4'
									strokeLinecap='round'
									strokeMiterlimit='10'
									strokeWidth='2'
								/>
								<line
									x1='1'
									y1='19.39'
									x2='19.39'
									y2='1'
									fill='none'
									stroke='#006ca4'
									strokeLinecap='round'
									strokeMiterlimit='10'
									strokeWidth='2'
								/>
							</CloseButton>
							<Title>Atenção</Title>
						</Header>
						<ModalContent>{children}</ModalContent>
						<Footer>
							<ButtonArea>
								<ConfirmButton onClick={onClickConfirmButton}>{confirmButtonTitle}</ConfirmButton>
							</ButtonArea>
							<ButtonArea>
								<DangerButton onClick={handleClose}>Cancelar</DangerButton>
							</ButtonArea>
						</Footer>
					</ModalContainer>
				</Overlay>
			)}
		</AnimatePresence>
	);
};

export default Modal;
