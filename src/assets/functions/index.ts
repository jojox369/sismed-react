import { store } from 'react-notifications-component';

export const Message = (message: string, type: number): void => {
	let title = '';
	let messageType: 'danger' | 'warning' | 'success' | 'info' | 'default' | undefined = 'success';

	switch (type) {
		case 1:
			title = 'Erro';
			messageType = 'danger';
			break;

		case 2:
			title = 'Atenção';
			messageType = 'warning';
			break;

		default:
			title = 'Sucesso';
			messageType = 'success';
	}

	store.addNotification({
		title,
		message,
		type: messageType,
		insert: 'top',
		container: 'top-center',
		animationIn: ['animate__animated', 'animate__fadeIn'],
		animationOut: ['animate__animated', 'animate__fadeOut'],
		dismiss: {
			duration: 5000,
			onScreen: true,
		},
	});
};

export const USDateFormatter = (date: Date): string => {
	const dateFormatted = date.toLocaleDateString().split('/');

	return `${dateFormatted[2]}-${dateFormatted[1]}-${dateFormatted[0]}`;
};

export const BrDateFormatter = (date: string): string => {
	const dateSplited = date.split('-');
	return date ? `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}` : date;
};
