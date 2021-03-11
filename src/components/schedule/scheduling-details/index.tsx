import React from 'react';
import { Container, DetailsArea } from './styles';
import { BiCalendarEdit } from 'react-icons/bi';
import { ScheduleDetails } from '../../../@types/schedule';
import Select from '../../form/select';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';

interface Props {
	scheduling: ScheduleDetails;
	healthInsuranceTypes: HealthInsuranceType[];
	onSelectChange: (id: number, name: string) => void;
	onHealthInsuranceChange: (id: number, name: string) => void;
}
const options = [
	{
		id: 1,
		name: 'Sim',
	},
	{
		id: 0,
		name: 'Não',
	},
];
const SchedulingDetails: React.FC<Props> = ({ scheduling, healthInsuranceTypes, onSelectChange, onHealthInsuranceChange }) => {
	const healthInsurances = healthInsuranceTypes.map(healthInsuranceType => ({
		id: healthInsuranceType.healthInsurance.id,
		name: healthInsuranceType.healthInsurance.name,
	}));

	const getHealthInsurancesTypes = () => {
		return healthInsuranceTypes.filter(
			healthInsuranceType => healthInsuranceType.healthInsurance.id === scheduling.healthInsuranceType.healthInsurance.id,
		);
	};

	const healthInsuranceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const healthInsurance = healthInsuranceTypes.filter(healthInsuranceType => healthInsuranceType.healthInsurance.id === +e.target.value);
		onHealthInsuranceChange(healthInsurance[0].healthInsurance.id, healthInsurance[0].healthInsurance.name);
	};

	const healthInsuranceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const healthInsurance = healthInsuranceTypes.filter(healthInsuranceType => healthInsuranceType.healthInsurance.id === +e.target.value);
		onSelectChange(healthInsurance[0].id, healthInsurance[0].name);
	};

	return (
		<Container>
			<BiCalendarEdit size='80' />
			<DetailsArea>
				<Select
					label='Convênio'
					defaultLabel='Selecione o convênio'
					options={healthInsurances}
					fieldActive={false}
					defaultValue={scheduling.healthInsuranceType.healthInsurance.id}
					onChange={healthInsuranceChange}
				/>
				<Select
					label='Plano'
					defaultLabel='Selecione o plano'
					options={getHealthInsurancesTypes()}
					fieldActive={false}
					defaultValue={scheduling.healthInsuranceType.id}
					onChange={healthInsuranceTypeChange}
				/>

				<Select label='Pagou' options={options} fieldActive={false} defaultValue={scheduling.paid} />
			</DetailsArea>
		</Container>
	);
};

export default SchedulingDetails;
