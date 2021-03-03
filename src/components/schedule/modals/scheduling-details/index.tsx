import React from 'react';
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
import { ScheduleData } from '../../../../@types/schedule';

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
					<NameText>{scheduling?.patient.name}</NameText>
				</PatientName>
				<SchedulingInfo>
					<Field>
						<DisableInput fieldActive={true} label='Prontuario' defaultValue={scheduling.patient.id} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Idade' defaultValue={scheduling.patient.age} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Celular' defaultValue={CellNumberFormatter(scheduling.patient.cellPhone)} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Primeira Vez' defaultValue={VerifyScheduleFields(scheduling.firstTime)} />
					</Field>

					<Field>
						<DisableInput fieldActive={true} label='Pagou' defaultValue={VerifyScheduleFields(scheduling.paid)} />
					</Field>
					<Field>
						<ButtonsContainer>
							<PatientAttendance to={`/schedule/attendance/${scheduling.id}`}>Atender Paciente</PatientAttendance>
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
