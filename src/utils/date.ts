import { format } from 'date-fns';

const dateFormatWithSeconds = 'dd.MM.yyyy HH:mm:ss';

export const formatDate = (date: Date, dateFormat = dateFormatWithSeconds) => {
	try {
		return date ? format(date, dateFormat) : '';
	} catch (e) {
		return '';
	}
};
