import React from 'react';
import { Container, DetailsArea } from './styles';
import { FaUserMd } from 'react-icons/fa';
import InformationCard from '../../information-card';
import { Employee } from '../../../@types/employee';
import Select from '../../form/select';

interface Props {
	employee: Employee;
	medics: Employee[];
	changeEmployee: (id: number) => void;
}

const EmployeeDetails: React.FC<Props> = ({ employee, medics, changeEmployee }) => {
	return (
		<Container>
			<FaUserMd size='80' />
			<DetailsArea>
				<Select
					fieldActive={false}
					name='employeeId'
					label='Médico'
					options={medics}
					defaultValue={employee.id}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeEmployee(+e.target.value)}
				/>
				<InformationCard id={employee.crm as string} title='CRM' content={employee.crm} />
				<InformationCard id={employee.specialty as string} title='CRM' content={employee.specialty} />
			</DetailsArea>
		</Container>
	);
};

export default EmployeeDetails;
