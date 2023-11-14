import { collection, doc, addDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore';

import { db } from '@/utils/firebase';
import { DbCollections } from '@/types/server';

export const addDocument = async (data: unknown, collectionName: DbCollections) => {
	await addDoc(collection(db, collectionName), data);
};

export const editDocument = async (
	data: Partial<unknown>,
	collectionName: DbCollections,
	docId: string
) => {
	const docRef = doc(db, collectionName, docId);
	await updateDoc(docRef, data);
};

export const removeDocument = async (collectionName: DbCollections, docId: string) => {
	await deleteDoc(doc(db, collectionName, docId));
};

export const incrementDocValue = async (
	collectionName: DbCollections,
	docId: string,
	fieldName: string,
	incrementAmount: number = 1
) => {
	const docRef = doc(db, collectionName, docId);
	await updateDoc(docRef, { [fieldName]: increment(incrementAmount) });
};
