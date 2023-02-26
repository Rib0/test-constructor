import React from 'react';
import type { NextPage } from 'next';

import TestList from '@/components/test-list';
import { getTestsData } from '@/lib/node/tests';
import { TestItem } from '@/types/server';

export interface Props {
	data: {
		testList: TestItem[];
		testsCount: number;
	};
}

const Tests: NextPage<Props> = ({ data }) => <TestList {...data} />;

export const getServerSideProps = async () => {
	const data = await getTestsData();
	return { props: { data: data } };
};

export default Tests;
