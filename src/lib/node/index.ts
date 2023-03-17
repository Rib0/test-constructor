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
