import * as admin from 'firebase-admin';
import { DbCollections } from '@/types/server';

const createFirebaseAdminApp = () => {
	if (!admin.apps.length) {
		return admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
			}),
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		});
	}

	return admin.apps[0];
};

export const firebaseAdminApp = createFirebaseAdminApp();
