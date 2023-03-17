import { format, parse } from 'date-fns';

const dateFormatWithSeconds = 'dd.MM.yyyy HH:mm:ss';

export const formatDate = (date: Date, dateFormat = dateFormatWithSeconds) => {
	try {
		return date ? format(date, dateFormat) : '';
	} catch (e) {
		return '';
	}
};

export const parseDate = (dateString: string, dateFormat = dateFormatWithSeconds) => {
	try {
		return dateString ? parse(dateString, dateFormat, new Date()) : '';
	} catch (e) {
		return '';
	}
};
