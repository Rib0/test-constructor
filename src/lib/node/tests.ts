import { db, getDocsCount } from './';
import { TESTS_PER_PAGE } from '@/components/test-list-filters/constants';
import { DbCollections, TestItem } from '@/types/server';

export const getTestsData = async () => {
	const collection = await db
		?.collection(DbCollections.tests)
		.where('isPrivate', '==', false)
		.orderBy('scoreAmount', 'asc')
		.orderBy('scoreSum', 'desc')
		.limit(TESTS_PER_PAGE)
		.get();
	const testList = collection?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) as TestItem[];

	const testsCount = await getDocsCount(DbCollections.tests);

	return {
		testList,
		testsCount,
	};
};

export const getTestResults = async () => {
	const collection = await db?.collection(DbCollections.testsResults).limit(20).get();
	const testResultsList = collection?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	})) as TestItem[];

	const testResultsCount = await getDocsCount(DbCollections.testsResults);

	return {
		testResultsList,
		testResultsCount,
	};
};
