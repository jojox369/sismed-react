import React from 'react';
import { Card } from '../..';
import { PreviousRegisters } from '../../../@types/clinical-register';
import { Content, Container, RegisterDateTime, RegisterDescriptionArea, PartialDescription } from './styles';
import { FaNotesMedical } from 'react-icons/fa';
import { BrDateFormatter, CutString, TimeFormatter } from '../../../assets/functions';
interface Props {
	previousRegisters: PreviousRegisters[];
}

const PreviousRegistersComponent: React.FC<Props> = ({ previousRegisters }) => {
	return (
		<Container>
			<Content>
				{previousRegisters.slice(0, 4).map((register, i) => {
					return (
						<Card key={i}>
							<FaNotesMedical size='50' />
							<RegisterDateTime>
								{BrDateFormatter(register.date)} - {TimeFormatter(register.time)}
							</RegisterDateTime>
							<RegisterDescriptionArea>
								<PartialDescription>{CutString(register.description, 50)}</PartialDescription>
							</RegisterDescriptionArea>
						</Card>
					);
				})}
			</Content>
		</Container>
	);
};

export default PreviousRegistersComponent;
