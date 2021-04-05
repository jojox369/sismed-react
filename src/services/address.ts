import axios from 'axios';

const AddressService = {
	getAddress: async (zipCode: string) => {
		const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
		return response;
	},
};

export default AddressService;
