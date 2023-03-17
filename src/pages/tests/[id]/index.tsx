import React from 'react';
import type { NextPage } from 'next';

import TestProcessComponent from '@/components/test-process';
import { getDoc } from '@/lib/node';
import { DbCollections, TestItem } from '@/types/server';

interface Props {
	data: {
		testItem: TestItem;
	};
}

interface Params {
	params: {
		id: string;
	};
}

const TestProcess: NextPage<Props> = ({ data: { testItem } }) => (
	<TestProcessComponent test={testItem} />
);

export const getServerSideProps = async ({ params }: Params) => {
	const data = await getDoc(DbCollections.tests, params.id);

	return { props: { data: { testItem: data } } };
};

export default TestProcess;
