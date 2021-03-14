import api from './api';

const Procedure = {
	async list(healthInsuranceId?: number) {
		const response = await api.get(`procedure?healthInsuranceId=${healthInsuranceId}`);

		return response;
	},
};

export default Procedure;
