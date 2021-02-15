import React from 'react';
import { Icon, SidebarContainer, SidebarMenu, SidebarMenuItem, SidebarMenuItemLabel, MenuLogo } from './styles';
import { useLocation } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';

const HomeIcon = <FaIcons.FaHome />;
const ScheduleIcon = <FaIcons.FaCalendarAlt />;
const PatientIcon = <FaIcons.FaUserInjured />;
const EmployeeIcon = <FaIcons.FaUserMd />;
const HealthInsuranceIcon = <BiIcons.BiHealth />;
const ClinicalRegistersIcon = <RiIcons.RiHealthBookLine />;
const LaboratoriesIcon = <FaIcons.FaVials />;
const ExamsIcon = <FaIcons.FaNotesMedical />;
const SettingsIcon = <FiIcons.FiSettings />;

const SidebarData = [
	{
		title: 'Home',
		icon: HomeIcon,
		link: '/',
	},

	{
		title: 'Agenda',
		icon: ScheduleIcon,
		link: '/schedule',
	},

	{
		title: 'Pacientes',
		icon: PatientIcon,
		link: '/patient',
	},

	{
		title: 'Funcionários',
		icon: EmployeeIcon,
		link: '/employee',
	},

	{
		title: 'Convênios',
		icon: HealthInsuranceIcon,
		link: '/health-insurances',
	},

	{
		title: 'Registros Clínicos',
		icon: ClinicalRegistersIcon,
		link: '/clinical-registers',
	},

	{
		title: 'Laboratórios',
		icon: LaboratoriesIcon,
		link: '/laboratories',
	},

	{
		title: 'Exames',
		icon: ExamsIcon,
		link: '/exams',
	},

	{
		title: 'Opções',
		icon: SettingsIcon,
		link: '/user/settings',
	},
];

const SideBar: React.FC = () => {
	const location = useLocation();

	return (
		<SidebarContainer>
			<SidebarMenu>
				<MenuLogo>
					<Icon viewBox='0 0 20 20'>
						<FaIcons.FaLaptopMedical />
					</Icon>
					SISMED
				</MenuLogo>
				{SidebarData.map((item, index) => {
					return (
						<SidebarMenuItem key={index} active={location.pathname === item.link ? true : false}>
							<Icon>{item.icon}</Icon>
							<SidebarMenuItemLabel to={item.link}>{item.title}</SidebarMenuItemLabel>
						</SidebarMenuItem>
					);
				})}
			</SidebarMenu>
		</SidebarContainer>
	);
};

export default SideBar;
