import { AxiosResponse } from 'axios';
import api from './api';

interface Auth {
	username: string;
	password: string;
}

interface PasswordEmail {
	id: number;
	senha: string;
	codigo: string;
}

const User = {
	auth: async (user: Auth): Promise<AxiosResponse<any>> => {
		user = { ...user, username: user.username.replace(/\D/g, '') };

		const response = await api.post('user/auth', user);

		return response;
	},

	verifyUser: async (username: string): Promise<AxiosResponse<any>> => {
		const response = await api.get(`usuario/verificarUsuario/${username}/`);
		return response;
	},

	updatePassword: async (user: PasswordEmail): Promise<AxiosResponse<any>> => {
		const response = await api.post('usuario/atualizarSenha', user);
		return response;
	},
};

export default User;
