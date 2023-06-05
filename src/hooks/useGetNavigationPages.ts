import { useAuthContext } from '@/context/auth-context';
import { navigationPages, navigationPagesNoAuth } from '@/constants';

export const useGetNavigationPages = () => {
	const auth = useAuthContext();

	const currentNavigationPages = auth?.id ? navigationPages : navigationPagesNoAuth;

	return currentNavigationPages;
};
