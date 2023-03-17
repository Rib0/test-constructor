import { differenceInSeconds } from 'date-fns';

import { TestResult } from '@/types/server';
import { parseDate } from '@/utils/date';

export const sortResultsByDate = (results: TestResult[]) => {
	const sortedResults = [...results].sort((a, b) =>
		differenceInSeconds(parseDate(b.date) as Date, parseDate(a.date) as Date)
	);

	return sortedResults;
};
