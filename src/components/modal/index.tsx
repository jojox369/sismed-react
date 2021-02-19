import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { Overlay, modalVariant, ModalContainer, containerVariant, CloseButton, ModalContent } from './styles';

interface Props {
	handleClose: () => void;
	isOpen: boolean;
}

// https://codesandbox.io/s/react-animated-modal-9rm6l?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:183-347
const Modal: React.FC<Props> = ({ handleClose, children, isOpen }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<Overlay initial={'initial'} animate={'isOpen'} exit={'exit'} variants={modalVariant}>
					<ModalContainer variants={containerVariant}>
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
						<ModalContent>{children}</ModalContent>
					</ModalContainer>
				</Overlay>
			)}
		</AnimatePresence>
	);
};

export default Modal;
