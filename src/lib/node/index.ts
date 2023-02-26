import { firebaseAdminApp } from '@/utils/firebase-admin';
import { DbCollections } from '@/types/server';

export const db = firebaseAdminApp?.firestore();

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

export const getDocsCount = async (collectionName: DbCollections) => {
	const collection = db?.collection(collectionName);
	const snapshot = await collection?.count().get();
	const data = snapshot?.data().count;

	return data;
};
