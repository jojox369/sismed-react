import React from 'react';
import { Container, DetailsArea } from './styles';
import { Patient } from '../../../@types/patient';
import { FaUserInjured } from 'react-icons/fa';
import InformationCard from '../../information-card';

interface Props {
	patient: Patient;
}

const PatientDetails: React.FC<Props> = ({ patient }) => {
	return (
		<Container>
			<FaUserInjured size='80' />
			<DetailsArea>
				<InformationCard id={patient.name} title='Nome' content={patient.name} />
				<InformationCard id={patient.age as string} title='Idade' content={patient.age} />
			</DetailsArea>
		</Container>
	);
};

export default PatientDetails;
