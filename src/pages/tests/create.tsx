import React from 'react';
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import type { NextPage } from 'next';

import TestConstructor from '@/components/test-constructor';

const TestCreate: NextPage = () => <TestConstructor />;

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser<{}>({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(TestCreate);
