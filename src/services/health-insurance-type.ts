import api from './api';

const baseURL = '/healthInsuranceType';

const healthInsuranceType = {
	listByInsurance: async (healthInsuranceId: number) => {
		const response = await api.get(`${baseURL}?healthInsuranceId=${healthInsuranceId}`);
		return response;
	},
};

export default healthInsuranceType;
