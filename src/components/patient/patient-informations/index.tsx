import React from 'react';
import { Container, InformationsArea, Img, Title, SubTitle } from './styles';
import UserImage from '../../../assets/images/user-image.png';
import { Patient } from '../../../@types/patient';

interface Props {
	patient: Patient;
}

const PatientInformations: React.FC<Props> = ({ patient }) => {
	return (
		<Container>
			<Img src={UserImage} alt='User' />
			<InformationsArea>
				<Title>{patient.name}</Title>
				<SubTitle>{patient.age}</SubTitle>
			</InformationsArea>
		</Container>
	);
};

export default PatientInformations;
