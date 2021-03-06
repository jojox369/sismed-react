import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.section)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 1000;
`;
export const ModalContainer = styled(motion.div)`
	width: 50%;
	height: 50%;
	background-color: white;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 12px;
`;
export const CloseButton = styled.svg`
	width: 20px;
	height: 20px;
	position: absolute;
	right: 18px;
	top: 18px;
	cursor: pointer;
`;

export const modalVariant = {
	initial: { opacity: 0 },
	isOpen: { opacity: 1 },
	exit: { opacity: 0 },
};
export const containerVariant = {
	initial: { top: '-50%', transition: { type: 'spring' } },
	isOpen: { top: '50%' },
	exit: { top: '-50%' },
};

export const ModalContent = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ededed;
	border-radius: 12px;
	h1 {
		color: #5c3aff;
	}
`;
