import { store } from 'react-notifications-component';
import AddressService from '../../services/address';

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
	return cell ? cell.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4') : '';
};

export const VerifyScheduleFields = (field: number | undefined) => {
	return field === 1 ? 'Sim' : 'Não';
};

export const CutString = (note: string | null, length: number) => {
	let noteFormatted = note;
	if (note) {
		if (note.length > length) {
			noteFormatted = StringFormatter(`${note.slice(0, length)}...`);
		}
		noteFormatted = noteFormatted ? StringFormatter(noteFormatted) : note;
	}
	return noteFormatted;
};

export const StringFormatter = (string: string) => {
	return string ? string.toLowerCase().replace(/(?:^|\s)\S/g, l => l.toUpperCase()) : '';
};

export const CpfFormatter = (cpf: string): string => {
	return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4') : '';
};

export const RgFormatter = (rg: string): string => {
	return rg ? rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4') : '';
};

export const PhoneFormatter = (phone: string): string => {
	if (phone) {
		let phoneFormatted;
		if (phone.length > 10) {
			phoneFormatted = phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
		} else {
			phoneFormatted = phone.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
		}
		return phoneFormatted;
	} else {
		return '';
	}
};

export const TimeFormatter = (time: string) => {
	return time.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{2})/g, '$1:$2');
};

export const DateTimeFormatter = (date: string, time: string) => {
	return `${BrDateFormatter(date)} - ${TimeFormatter(time)}`;
};

export const ZipCodeFormatter = (zipCode: string) => {
	return zipCode ? zipCode.replace(/(\d{5})(\d{3})/g, '$1-$2') : '';
};

export const OnlyNumbers = (value: string) => {
	return value.replace(/\D/g, '');
};

export const OnlyLetters = (value: string) => {
	return StringFormatter(value.replace(/\d/g, ''));
};

export const GetAddress = async (zipCode: string) => {
	const validateZipCode = /^[0-9]{8}$/;
	if (validateZipCode.test(zipCode.replace(/\D/g, ''))) {
		try {
			const { data } = await AddressService.getAddress(zipCode);
			return {
				zipCode: data.cep,
				street: data.logradouro,
				complement: data.complemento,
				neighborhood: data.bairro,
				city: data.localidade,
				state: data.uf,
			};
		} catch {
			Message('Erro ao tentar buscar o Cep', 1);
			return {
				zipCode: '',
				street: '',
				complement: '',
				neighborhood: '',
				city: '',
				state: '',
			};
		}
	} else {
		Message('Cep Inválido', 1);
		return {
			zipCode: '',
			street: '',
			complement: '',
			neighborhood: '',
			city: '',
			state: '',
		};
	}
};
