import React from 'react';
import { Card } from '../..';
import { PreviousRegisters } from '../../../@types/clinical-register';
import {
	Content,
	Container,
	RegisterDateTime,
	RegisterDescriptionArea,
	PartialDescription,
	CardArea,
	MoreInformations,
	IconArea,
} from './styles';
import { FaNotesMedical } from 'react-icons/fa';
import { BrDateFormatter, CutString, TimeFormatter } from '../../../assets/functions';
import { HiOutlineInformationCircle } from 'react-icons/hi';
interface Props {
	previousRegisters: PreviousRegisters[];
}

const PreviousRegistersComponent: React.FC<Props> = ({ previousRegisters }) => {
	return (
		<Container>
			{previousRegisters.length > 0 && (
				<>
					{previousRegisters.length > 5 && (
						<IconArea>
							<HiOutlineInformationCircle size='20' title='Para vizualizar mais registros, acesse a pagina de registros clinicos' />
						</IconArea>
					)}
					<Content>
						{previousRegisters.slice(0, 5).map((register, i) => {
							return (
								<CardArea key={i}>
									<Card>
										<FaNotesMedical size='50' />
										<RegisterDateTime>
											{BrDateFormatter(register.date)} - {TimeFormatter(register.time)}
										</RegisterDateTime>
										<RegisterDescriptionArea>
											<PartialDescription>{CutString(register.description, 50)}</PartialDescription>
										</RegisterDescriptionArea>
										<MoreInformations to={`/clinicalRegister/${register.id}`}>Mais informações &rarr;</MoreInformations>
									</Card>
								</CardArea>
							);
						})}
					</Content>
				</>
			)}
		</Container>
	);
};

export default PreviousRegistersComponent;
