import React, { createContext, PropsWithChildren, useContext } from 'react';
import { withAuthUser, useAuthUser, AuthUser, AuthAction } from 'next-firebase-auth';

import Loader from '@/components/common/loader';

const AuthContext = createContext<AuthUser | null>(null);
const useAuthContext = () => useContext(AuthContext);

const AuthProviderCommon: React.FC<PropsWithChildren> = ({ children }) => {
	const user = useAuthUser();

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const AuthProvider = withAuthUser<PropsWithChildren>({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	LoaderComponent: Loader,
})(AuthProviderCommon);
export { useAuthContext };
