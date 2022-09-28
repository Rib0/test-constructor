import { init } from 'next-firebase-auth';

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;

const initAuth = () => {
	return init({
		authPageURL: '/login',
		appPageURL: '/',

		loginAPIEndpoint: '/api/login',
		logoutAPIEndpoint: '/api/logout',
		firebaseAdminInitConfig: {
			credential: {
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
				privateKey: process.env.FIREBASE_PRIVATE_KEY!,
			},
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
		},
		firebaseClientInitConfig: {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		},
		cookies: {
			name: 'TestConstructor',
			keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
			httpOnly: true,
			maxAge: TWELVE_DAYS_IN_MS,
			overwrite: true,
			path: '/',
			sameSite: 'lax',
			secure: false,
			signed: true, // TODO: понять что это
		},
	});
};

export default initAuth;