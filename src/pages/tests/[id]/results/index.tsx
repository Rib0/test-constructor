import React from 'react';
import type { NextPage } from 'next';

import TestUsersResults from '@/components/test-users-results';
import { getTestResults } from '@/lib/node/tests';
import { TestResult } from '@/types/server';

export interface Props {
	data: {
		testResultsList: TestResult[];
		testResultsCount: number;
	};
}

const TestsResults: NextPage<Props> = ({ data }) => <TestUsersResults {...data} />;

export const getServerSideProps = async () => {
	const data = await getTestResults();
	return { props: { data: data } };
};

export default TestsResults;
