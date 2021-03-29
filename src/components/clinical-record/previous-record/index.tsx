import React from 'react';
import { Card } from '../..';
import { PreviousRecords } from '../../../@types/clinical-record';
import { Content, Container, DateTime, DescriptionArea, PartialDescription, CardArea, MoreInformations, IconArea } from './styles';
import { FaNotesMedical } from 'react-icons/fa';
import { BrDateFormatter, CutString, TimeFormatter } from '../../../assets/functions';
import { HiOutlineInformationCircle } from 'react-icons/hi';

interface Props {
	previousRecords: PreviousRecords[];
}

const PreviousRecordsComponent: React.FC<Props> = ({ previousRecords }) => {
	return (
		<Container>
			{previousRecords.length > 0 && (
				<>
					{previousRecords.length > 5 && (
						<IconArea>
							<HiOutlineInformationCircle size='20' title='Para vizualizar mais registros, acesse a pagina de registros clinicos' />
						</IconArea>
					)}
					<Content>
						{previousRecords.slice(0, 5).map((record, i) => {
							return (
								<CardArea key={i}>
									<Card>
										<FaNotesMedical size='50' />
										<DateTime>
											{BrDateFormatter(record.date)} - {TimeFormatter(record.time)}
										</DateTime>
										<DescriptionArea>
											<PartialDescription>{CutString(record.description, 50)}</PartialDescription>
										</DescriptionArea>
										<MoreInformations to={`/clinicalRecord/${record.id}`}>Mais informações &rarr;</MoreInformations>
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

export default PreviousRecordsComponent;
