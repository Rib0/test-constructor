import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const createFirebaseApp = () => {
	const clientCredentials = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	};

	if (firebase.getApps().length <= 0) {
		const app = firebase.initializeApp(clientCredentials);
		return app;
	}

	return firebase.getApp();
};

const firebaseApp = createFirebaseApp();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };
