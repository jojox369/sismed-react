export const zipCode = (e: React.FormEvent<HTMLInputElement>) => {
	e.currentTarget.maxLength = 9;
	let value = e.currentTarget.value;
	value = value.replace(/\D/g, '');
	value = value.replace(/^(\d{5})(\d)/, '$1-$2');
	e.currentTarget.value = value;
	return e;
};

export const currency = (e: React.FormEvent<HTMLInputElement>) => {
	let value = e.currentTarget.value;
	value = value.replace(/\D/g, '');
	value = value.replace(/(\d)(\d{2})$/, '$1,$2');
	value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

	e.currentTarget.value = value;
	return e;
};

export const cpf = (e: React.FormEvent<HTMLInputElement>) => {
	e.currentTarget.maxLength = 14;
	let value = e.currentTarget.value;
	if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
		value = value.replace(/\D/g, '');
		value = value.replace(/(\d{3})(\d)/, '$1.$2');
		value = value.replace(/(\d{3})(\d)/, '$1.$2');
		value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
		e.currentTarget.value = value;
	}
	return e;
};

export const rg = (e: React.FormEvent<HTMLInputElement>) => {
	e.currentTarget.maxLength = 12;
	let value = e.currentTarget.value;
	if (!value.match(/^(\d{2}).(\d{3}).(\d{3})-(\d{1})$/)) {
		value = value.replace(/\D/g, '');
		value = value.replace(/(\d{2})(\d)/, '$1.$2');
		value = value.replace(/(\d{3})(\d)/, '$1.$2');
		value = value.replace(/(\d{3})(\d{1})$/, '$1-$2');
		e.currentTarget.value = value;
	}
	return e;
};

export const cellPhone = (e: React.FormEvent<HTMLInputElement>) => {
	e.currentTarget.maxLength = 16;
	let value = e.currentTarget.value;

	value = value.replace(/\D/g, '');
	value = value.replace(/^(\d{2})(\d)/g, '($1) $2 ');
	value = value.replace(/(\d)(\d{4})$/, '$1-$2');
	e.currentTarget.value = value;

	return e;
};

export const phone = (e: React.FormEvent<HTMLInputElement>) => {
	e.currentTarget.maxLength = 14;
	let value = e.currentTarget.value;
	value = value.replace(/\D/g, '');
	value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
	value = value.replace(/(\d)(\d{4})$/, '$1-$2');
	e.currentTarget.value = value;

	return e;
};

export const textInput = (e: React.FormEvent<HTMLInputElement>) => {
	let value = e.currentTarget.value;
	value = value.replace(/\d/g, '');
	value = value.toLowerCase().replace(/(?:^|\s)\S/g, l => l.toUpperCase());
	e.currentTarget.value = value;
};
