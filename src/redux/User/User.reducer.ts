import { AnyAction } from 'redux';

const initialState = {
	id: undefined,
	profile: undefined,
	name: undefined,
	token: undefined,
};

export default function reducer(state = initialState, action: AnyAction) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				id: action.payload.id,
				profile: action.payload.profile,
				name: action.payload.name,
				token: action.payload.token,
			};

		case 'LOGOUT':
			localStorage.removeItem('persist:root');
			return initialState;

		default:
			return state;
	}
}
