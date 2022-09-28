import React, { createContext, useContext } from 'react';
import { withAuthUser, useAuthUser, AuthUser } from 'next-firebase-auth';

import initAuth from '@/utils/initAuth';

const AuthContext = createContext<AuthUser | null>(null);
const useAuthContext = () => useContext(AuthContext);

interface Props {
	children: React.ReactNode;
}

initAuth();

const AuthProvider = withAuthUser<Props>()(({ children }) => {
	const user = useAuthUser();

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
});

export { useAuthContext, AuthProvider };
