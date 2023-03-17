import { db } from './';
import { TESTS_PER_PAGE } from '@/components/test-list-filters/constants';
import { DbCollections, TestItem } from '@/types/server';

export const getTestsData = async () => {
	const defaultCollectionQ = db
		?.collection(DbCollections.tests)
		.where('isPrivate', '==', false)
		.orderBy('scoreAmount', 'desc')
		.orderBy('scoreSum', 'asc');

	const collection = await defaultCollectionQ?.limit(TESTS_PER_PAGE).get();

	const testList =
		collection?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) || ([] as TestItem[]);

	const testsCount = await defaultCollectionQ?.count().get();

	return {
		testList,
		testsCount: testsCount?.data().count,
	};
};

export const getTestResults = async (testId: string, userId: string | null) => {
	const query = db
		?.collection(DbCollections.testsResults)
		.where('testId', '==', testId)
		.where('testOwnerId', '==', userId);

	const resultsCollection = await query?.limit(10).get();

	const testResultsList = resultsCollection?.docs?.map((doc) => ({
		...doc.data(),
		id: doc.id,
	})) as TestItem[];

	const testResultsCount = await query?.count().get();

	return {
		testResultsList,
		testResultsCount: testResultsCount?.data().count,
	};
};
