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
} from 'firebase/firestore';

import { db } from '@/utils/firebase';
import { removeDocument } from '.';
import { TESTS_PER_PAGE } from '@/components/test-list-filters/constants';
import { DbCollections, TestItem } from '@/types/server';

export type GetTestsDataFType<T> = (
	name: string,
	ownerType: number,
	sortType: number,
	userId?: string,
	lastTestId?: string
) => T;

export const getTestsDataWithFilters: GetTestsDataFType<Promise<TestItem[]>> = async (
	name,
	ownerType,
	sortType,
	userId,
	lastTestId
) => {
	const conditions = [where('isPrivate', '==', false)];
	const orders = [];
	const border = [];

	if (name) {
		conditions.push(where('name', '>=', name), where('name', '<=', name + '\uf8ff'));
		orders.push(orderBy('name', 'asc'));
	}

	if (ownerType === 2) {
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
			orders.push(orderBy('scoreAmount', 'asc'), orderBy('scoreSum', 'desc'));
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
	const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return data as TestItem[];
};

export const removeTest = async (testId: string) => {
	await Promise.all([
		removeDocument(DbCollections.tests, testId),
		removeDocument(DbCollections.testsResults, testId),
	]);
};
