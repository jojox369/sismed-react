import { store } from 'react-notifications-component';

export const Message = (message: string, type: number) => {
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

export const USDateFormatter = (date: Date) => {
	const dateFormatted = date.toLocaleDateString().split('/');

	return `${dateFormatted[2]}-${dateFormatted[1]}-${dateFormatted[0]}`;
};

export const BrDateFormatter = (date: string) => {
	const dateSplitted = date.split('-');
	return date ? `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}` : date;
};

export const CellNumberFormatter = (cell: string) => {
	return cell.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
};

export const VerifyScheduleFields = (field: number | undefined) => {
	return field === 1 ? 'Sim' : 'Não';
};

export const CutString = (note: string | null, length: number): string | null => {
	let noteFormatted = note;
	if (note) {
		if (note.length > 17) {
			noteFormatted = `${note.slice(0, length)}...`;
		}
	}
	return noteFormatted;
};

export const StringFormatter = (string: string) => {
	return string.toLowerCase().replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
};

export const CpfFormatter = (cpf: string): string => {
	return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') : 'Não Cadastrado';
};

export const RgFormatter = (rg: string): string => {
	return rg ? rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4') : 'Não Cadastrado';
};

export const PhoneFormatter = (phone: string): string => {
	let phoneFormatted;
	if (phone.length > 10) {
		phoneFormatted = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
	} else {
		phoneFormatted = phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
	}
	return phoneFormatted;
};

export const TimeFormatter = (time: string) => {
	return time.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2');
};
