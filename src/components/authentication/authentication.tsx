/* globals window */
import React, { useEffect, useState } from 'react';
import { EmailAuthProvider, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { auth } from '@/utils/firebase';
import { Paths } from '@/constants';

const firebaseAuthConfig = {
	signInFlow: 'popup',
	// Auth providers
	// https://github.com/firebase/firebaseui-web#configure-oauth-providers
	signInOptions: [
		{
			provider: EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false,
		},
		// { пока не поправят
		// 	provider: PhoneAuthProvider.PROVIDER_ID,
		// 	defaultCountry: 'RU',
		// 	whitelistedCountries: ['RU', 'KZ', 'UA', 'BY'],
		// },
		{
			provider: GoogleAuthProvider.PROVIDER_ID,
		},
	],
	signInSuccessUrl: Paths.tests,
	credentialHelper: 'none',
	callbacks: {
		// https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
		signInSuccessWithAuthResult: () =>
			// Don't automatically redirect. We handle redirects using
			// `next-firebase-auth`.
			false,
	},
};

const FirebaseAuth = () => {
	// Do not SSR FirebaseUI, because it is not supported.
	// https://github.com/firebase/firebaseui-web/issues/213
	const [renderAuth, setRenderAuth] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setRenderAuth(true);
		}
	}, []);

	return (
		<div>
			{renderAuth ? (
				<StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth} />
			) : null}
		</div>
	);
};

export default FirebaseAuth;
