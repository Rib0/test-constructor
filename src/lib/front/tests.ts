import {
	collection,
	query,
	where,
	orderBy,
	startAfter,
	getDocs,
	doc,
	limit,
	getDoc,
	addDoc,
	updateDoc,
	increment,
} from 'firebase/firestore';

import { db } from '@/utils/firebase';
import { incrementDocValue, removeDocument, editDocument } from '.';
import { TESTS_PER_PAGE } from '@/components/test-list-filters/constants';
import { DbCollections, TestItem, TestResult } from '@/types/server';

export type GetTestsDataFType<T> = (
	name: string,
	ownerType: number,
	sortType: number,
	userId?: string,
	lastTestId?: string
) => T;

export const getTestsDataWithFilters: GetTestsDataFType<
	Promise<{ testList: TestItem[]; testsCount: number }>
> = async (name, ownerType, sortType, userId, lastTestId) => {
	const conditions = [];
	const orders = [];
	const border = [];

	if (name) {
		conditions.push(where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
		orders.push(orderBy('name', 'asc'));
	}

	if (ownerType === 1) {
		conditions.push(where('isPrivate', '==', false));
	} else {
		conditions.push(where('userId', '==', userId));
	}

	if (lastTestId) {
		const lastTest = await getDoc(doc(db, DbCollections.tests, lastTestId));
		if (lastTest.exists()) {
			border.push(startAfter(lastTest));
		}
	}

	switch (sortType) {
		case 1:
			orders.push(orderBy('scoreAmount', 'desc'), orderBy('scoreSum', 'asc'));
			break;
		case 2:
			orders.push(orderBy('questionsAmount', 'desc'));
			break;
		case 3:
			orders.push(orderBy('passesAmount', 'desc'));
			break;
	}

	const q = query(
		collection(db, DbCollections.tests),
		...conditions,
		...orders,
		...border,
		limit(TESTS_PER_PAGE)
	);
	const querySnapshot = await getDocs(q);
	const testList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as TestItem[];

	const qWithoutLimit = query(
		collection(db, DbCollections.tests),
		...conditions,
		...orders,
		...border
	);
	const querySnapshot2 = await getDocs(qWithoutLimit);
	const testsCount = querySnapshot2.size;

	return {
		testList,
		testsCount,
	};
};

export const MAX_TESTS_RESULTS_PER_REQUEST = 10;

export const getMoreTestResults = async (
	testId: string,
	userId: string | null,
	lastResultId: string
): Promise<{ testResultsList: TestResult[]; testResultsCount: number }> => {
	const lastResult = await getDoc(doc(db, DbCollections.testsResults, lastResultId));

	const q = query(
		collection(db, DbCollections.testsResults),
		where('testId', '==', testId),
		where('testOwnerId', '==', userId),
		startAfter(lastResult),
		limit(MAX_TESTS_RESULTS_PER_REQUEST)
	);

	const qWithoutLimit = query(
		collection(db, DbCollections.testsResults),
		where('testId', '==', testId),
		where('testOwnerId', '==', userId),
		startAfter(lastResult)
	);

	const querySnapshot = await getDocs(q);
	const testResultsList = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	})) as TestResult[];

	const querySnapshot2 = await getDocs(qWithoutLimit);
	const testResultsCount = querySnapshot2.size;

	return {
		testResultsList,
		testResultsCount,
	};
};

export const removeTest = async (testId: string) => {
	const querySnapshot = await getDocs(
		query(collection(db, DbCollections.testsResults), where('testId', '==', testId))
	);
	const resultIdsToDelete = querySnapshot.docs.map((doc) => doc.id);

	await removeDocument(DbCollections.tests, testId);

	try {
		await Promise.all([
			resultIdsToDelete.map((resultId) =>
				removeDocument(DbCollections.testsResults, resultId)
			),
		]);
	} catch (e) {
		console.log('Не удалось удалить все результаты удаляемого теста');
	}
};

export const saveResults = async (testId: string, result: Partial<TestResult>) => {
	try {
		const { id } = await addDoc(collection(db, DbCollections.testsResults), result);
		try {
			await incrementDocValue(DbCollections.tests, testId, 'passesAmount');
		} catch (e) {
			console.log('Не удалось обновить количество прохождений теста');
		}
		return id;
	} catch (e) {
		throw e;
	}
};

export const editResults = async (testResultId: string, result: Partial<TestResult>) => {
	try {
		await editDocument(result, DbCollections.testsResults, testResultId);
	} catch (e) {
		console.log('Не удалось обновить результат теста');
	}
};

export const saveScore = async (testId: string, testResultId: string, score: number) => {
	const docRef = doc(db, DbCollections.tests, testId);

	await updateDoc(docRef, {
		scoreAmount: increment(1),
		scoreSum: increment(score),
	});
	await editDocument({ score }, DbCollections.testsResults, testResultId);
};
