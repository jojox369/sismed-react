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
	width: 30%;
	height: 25%;
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
	width: 100%;
	height: 25%;
	display: flex;
	justify-content: center;
	align-items: center;
	h1 {
		color: #5c3aff;
	}
`;

export const Header = styled.div`
	text-align: center;
	padding: 1rem 0;
`;

export const Title = styled.h1`
	color: #ec392f;
`;
export const Footer = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding: 2.2rem 0.5rem;
`;

export const ButtonArea = styled.div`
	width: 130px;
	:first-child {
		margin-right: 0.5rem;
	}
`;
