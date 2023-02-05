import React from 'react';
import type { NextPage } from 'next';

import TestList from '@/components/test-list';
import { getSomeDocs } from '@/lib/node';
import { DbCollections, TestItem } from '@/types/server';

interface Props {
	data: {
		testList: TestItem[];
	};
}

const Tests: NextPage<Props> = ({ data: { testList } }) => <TestList testList={testList} />;

export const getServerSideProps = async () => {
	const data = await getSomeDocs(DbCollections.tests, ['isPrivate', '==', false]);

	return { props: { data: { testList: data } } };
};

export default Tests;
