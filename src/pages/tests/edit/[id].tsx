import React from 'react';
import { AuthAction, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth';
import type { NextPage } from 'next';

import TestConstructor from '@/components/test-constructor';
import { getDoc } from '@/lib/node';
import { DbCollections, TestItem } from '@/types/server';

interface Props {
	data: {
		testItem: TestItem;
	};
}

const EditTest: NextPage<Props> = ({ data: { testItem } }) => (
	<TestConstructor initialValues={testItem} />
);

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ params }) => {
	const data = await getDoc(DbCollections.tests, params?.id as string);

	return { props: { data: { testItem: data } } };
});

export default withAuthUser<Props>({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(EditTest);
