import React from 'react';
import { ScheduleData } from '../../../../services/schedule';
import Modal from '../../../modal';
import {
	Container,
	PatientName,
	SchedulingInfo,
	Img,
	NameText,
	Field,
	ButtonsContainer,
	PatientAttendance,
	SchedulingInformations,
} from './styles';
import UserImage from '../../../../assets/images/user-image.png';
import { DisableInput } from '../../../';
import { CellNumberFormatter, VerifyScheduleFields } from '../../../../assets/functions';

interface Props {
	showModal: boolean;
	handleClose: () => void;
	scheduling: ScheduleData;
}

const SchedulingDetails: React.FC<Props> = ({ showModal, handleClose, scheduling }) => {
	return (
		<Modal isOpen={showModal} handleClose={handleClose}>
			<Container>
				<PatientName>
					<Img src={UserImage} alt='User' />
					<NameText>{scheduling?.patientName}</NameText>
				</PatientName>
				<SchedulingInfo>
					<Field>
						<DisableInput fieldActive={true} label='Prontuario' defaultValue={scheduling.patientId} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Idade' defaultValue={scheduling.patientAge} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Celular' defaultValue={CellNumberFormatter(scheduling.patientCellPhone)} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Primeira Vez' defaultValue={VerifyScheduleFields(scheduling.firstTime)} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Pagou' defaultValue={VerifyScheduleFields(scheduling.paid)} />
					</Field>
					<Field>
						<ButtonsContainer>
							<PatientAttendance to='#'>Atender Paciente</PatientAttendance>
							<SchedulingInformations to='#' title='Clique para saber mais informações do agendamento'>
								Mais Informações
							</SchedulingInformations>
						</ButtonsContainer>
					</Field>
				</SchedulingInfo>
			</Container>
		</Modal>
	);
};

export default SchedulingDetails;
