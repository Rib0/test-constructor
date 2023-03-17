import React from 'react';
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import type { NextPage } from 'next';

import TestUsersResults from '@/components/test-users-results';
import { getTestResults } from '@/lib/node/tests';
import { TestResult } from '@/types/server';

export interface Props {
	data: {
		testResultsList: TestResult[];
		testResultsCount: number;
		testId: string;
	};
}

const TestsResults: NextPage<Props> = ({ data }) => <TestUsersResults {...data} />;

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, params }) => {
	const data = await getTestResults(params?.id as string, AuthUser.id);
	return { props: { data: { ...data, testId: params?.id } } };
});

export default withAuthUser<Props>({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(TestsResults);
