import { collection, doc, addDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore';

import { db } from '@/utils/firebase';
import { DbCollections, TestItem } from '@/types/server';

export const addDocument = async (data: unknown, collectionName: DbCollections) => {
	const result = await addDoc(collection(db, collectionName), data);
	return result;
};

export const editDocument = async (data: unknown, collectionName: DbCollections, docId: string) => {
	const docRef = doc(db, collectionName, docId);
	await updateDoc(docRef, data as TestItem);
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