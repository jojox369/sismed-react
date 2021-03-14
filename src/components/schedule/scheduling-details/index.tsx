import React, { useState } from 'react';
import { BiCalendarEdit } from 'react-icons/bi';
import { HealthInsuranceType } from '../../../@types/health-insurance-type';
import { Procedure } from '../../../@types/procedure';
import { ScheduleDetails } from '../../../@types/schedule';
import { Button } from '../../../assets/styles/global';
import Input from '../../form/input';
import Select from '../../form/select';
import TextAreaComponent from '../../form/TextArea';
import Modal from '../../modal';

import { Container, DetailsArea, ModalContainer } from './styles';

interface Props {
	scheduling: ScheduleDetails;
	healthInsuranceTypes: HealthInsuranceType[];
	procedures: Procedure[];
	onSelectChange: (id: number, name: string) => void;
	onHealthInsuranceChange: (id: number, name: string) => void;
	onNotesChange: (notes: string) => void;
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
const SchedulingDetails: React.FC<Props> = ({
	scheduling,
	healthInsuranceTypes,
	onSelectChange,
	onHealthInsuranceChange,
	procedures,
	onNotesChange,
}) => {
	const [showModal, setShowModal] = useState(false);
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
			<Modal handleClose={() => setShowModal(false)} isOpen={showModal}>
				<ModalContainer>
					<TextAreaComponent
						title='Insira as observações'
						name='notes'
						defaultValue={scheduling.notes}
						onChange={e => onNotesChange(e.target.value)}
					/>
					<Button onClick={() => setShowModal(false)}>Adicionar</Button>
				</ModalContainer>
			</Modal>
			<BiCalendarEdit size='80' />
			<DetailsArea>
				<Input label='Data' type='date' name='date' fieldActive={true} defaultValue={scheduling.date} />
				<Input label='Hora' type='time' name='time' fieldActive={true} defaultValue={scheduling.time} />
				<Select
					label='Convênio'
					name='healthInsurance'
					defaultLabel='Selecione o convênio'
					options={healthInsurances}
					fieldActive={false}
					defaultValue={scheduling.healthInsuranceType.healthInsurance.id}
					onChange={healthInsuranceChange}
				/>
				<Select
					label='Plano'
					name='healthInsuranceType'
					defaultLabel='Selecione o plano'
					options={getHealthInsurancesTypes()}
					fieldActive={false}
					defaultValue={scheduling.healthInsuranceType.id}
					onChange={healthInsuranceTypeChange}
				/>

				<Select
					label='Procedimento'
					name='procedureId'
					defaultLabel='Selecione o procedimento'
					options={procedures}
					fieldActive={false}
					defaultValue={scheduling.procedure.id}
					onChange={healthInsuranceTypeChange}
				/>
				<Select label='Pagou' name='paid' options={options} fieldActive={false} defaultValue={scheduling.paid} />
				<Select label='Compareceu' name='attended' options={options} fieldActive={false} defaultValue={scheduling.attended} />
				<Button type='button' style={{ marginTop: '1.25rem' }} onClick={() => setShowModal(true)}>
					Adicionar Observações
				</Button>
			</DetailsArea>
		</Container>
	);
};

export default SchedulingDetails;
