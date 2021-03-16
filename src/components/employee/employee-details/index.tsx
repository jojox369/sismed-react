import React from 'react';
import { Container, DetailsArea } from './styles';
import { FaUserMd } from 'react-icons/fa';
import InformationCard from '../../information-card';
import Select from '../../form/select';

interface Employee {
	id: number;
	name: string;
	crm?: string;
	specialty?: string;
}

interface Props {
	employee: Employee;
	medics: Employee[];
	edit: boolean;
	changeEmployee: (id: number) => void;
}

const EmployeeDetails: React.FC<Props> = ({ employee, medics, changeEmployee, edit }) => {
	return (
		<Container>
			<FaUserMd size='80' />
			<DetailsArea>
				{edit ? (
					<Select
						fieldActive={false}
						name='employeeId'
						label='Médico'
						options={medics}
						defaultValue={employee.id}
						defaultLabel='Selecione um médico'
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeEmployee(+e.target.value)}
					/>
				) : (
					<InformationCard id='doctor' title='Médico' content={employee.name} />
				)}
				{employee.id !== 0 && (
					<>
						<InformationCard id={employee.crm as string} title='CRM' content={employee.crm} />
						<InformationCard id={employee.specialty as string} title='CRM' content={employee.specialty} />
					</>
				)}
			</DetailsArea>
		</Container>
	);
};

export default EmployeeDetails;
