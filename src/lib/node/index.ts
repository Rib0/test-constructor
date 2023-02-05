import { firebaseAdminApp } from '@/utils/firebase-admin';
import { DbCollections } from '@/types/server';
import { ConditionType } from '@/types/client';

const db = firebaseAdminApp?.firestore();

export const getDoc = async (collectionName: DbCollections, docId: string) => {
	const docRef = db?.collection(collectionName).doc(docId);
	const doc = await docRef?.get();

	if (!doc?.exists) {
		throw new Error();
	}

	return { ...doc.data(), id: doc.id };
};

export const getDocs = async (collectionName: DbCollections) => {
	// TODO: обработать ошибки и пустые значения
	const collection = await db?.collection(collectionName).get();
	const data = collection?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));

	return data;
};

export const getSomeDocs = async (collectionName: DbCollections, condition: ConditionType) => {
	const collection = await db
		?.collection(collectionName)
		.where(...condition)
		.get();
	const data = collection?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));

	return data;
};
