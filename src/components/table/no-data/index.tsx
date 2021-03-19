import React from 'react';
import { AiOutlineInbox } from 'react-icons/ai';
import styled from 'styled-components';

interface NoDataProps {
	length: number;
	label: string;
}

const NoDataContainer = styled.div`
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	color: #ccc;
`;

const NoData: React.FC<NoDataProps> = ({ length, label }) => {
	return (
		<tr>
			<td colSpan={length} rowSpan={length}>
				<NoDataContainer>
					<AiOutlineInbox size='35' />
					<span>{label}</span>
				</NoDataContainer>
			</td>
		</tr>
	);
};

export default NoData;
