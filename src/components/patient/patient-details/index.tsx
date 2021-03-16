import React from 'react';
import { Container, DetailsArea } from './styles';
import { FaUserInjured } from 'react-icons/fa';
import InformationCard from '../../information-card';

interface Patient {
	id: number;
	name: string;
	age?: string;
}

interface Props {
	patient: Patient;
	edit?: boolean;
}

const PatientDetails: React.FC<Props> = ({ patient, edit }) => {
	return (
		<Container>
			<FaUserInjured size='80' />
			<DetailsArea>
				{!edit ? (
					<>
						<InformationCard id='prontuario' title='Prontuário' content={patient.id} />
						<InformationCard id='name' title='Nome' content={patient.name} />
						<InformationCard id='age' title='Idade' content={patient.age} />
					</>
				) : (
					<>Editing Patient</>
				)}
			</DetailsArea>
		</Container>
	);
};

export default PatientDetails;
