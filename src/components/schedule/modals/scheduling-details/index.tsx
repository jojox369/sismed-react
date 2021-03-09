import React from 'react';
import Modal from '../../../modal';
import { Container, PatientInfo, SchedulingInfo, NameText, Field, ButtonsContainer, PatientAttendance, SchedulingEdit } from './styles';
import { CellNumberFormatter, VerifyScheduleFields } from '../../../../assets/functions';
import { Schedule } from '../../../../@types/schedule';
import InformationCard from '../../../information-card';
import { FaUserInjured } from 'react-icons/fa';

interface Props {
	showModal: boolean;
	handleClose: () => void;
	scheduling: Schedule;
}

const SchedulingDetails: React.FC<Props> = ({ showModal, handleClose, scheduling }) => {
	return (
		<Modal isOpen={showModal} handleClose={handleClose}>
			<Container>
				<PatientInfo>
					<FaUserInjured size='100' />
					<NameText>{scheduling?.patient.name}</NameText>
				</PatientInfo>
				<SchedulingInfo>
					<Field>
						<InformationCard id='prontuario' title='Prontuario' content={scheduling.patient.id} />
					</Field>

					<Field>
						<InformationCard id='age' title='Idade' content={scheduling.patient.age} />
					</Field>

					<Field>
						<InformationCard id='cellPhone' title='Celular' content={CellNumberFormatter(scheduling.patient.cellPhone)} />
					</Field>

					<Field>
						<InformationCard id='firstTime' title='Primeira Vez' content={VerifyScheduleFields(scheduling.firstTime)} />
					</Field>

					<Field>
						<InformationCard id='paid' title='Pagou' content={VerifyScheduleFields(scheduling.paid)} />
					</Field>
				</SchedulingInfo>
				<ButtonsContainer>
					<PatientAttendance to={`/schedule/attendance/${scheduling.id}`}>Atender Paciente</PatientAttendance>
					<SchedulingEdit to={`/schedule/edit/${scheduling.id}`} title='Clique para saber mais informações do agendamento'>
						Mais Informações &rarr;
					</SchedulingEdit>
				</ButtonsContainer>
			</Container>
		</Modal>
	);
};

export default SchedulingDetails;
