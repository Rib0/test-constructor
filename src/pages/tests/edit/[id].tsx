import React from 'react';
import type { NextPage } from 'next';

import TestConstructor from '@/components/test-constructor';
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

const EditTest: NextPage<Props> = ({ data: { testItem } }) => (
	<TestConstructor initialValues={testItem} />
);

export const getServerSideProps = async ({ params }: Params) => {
	const data = await getDoc(DbCollections.tests, params?.id);

	return { props: { data: { testItem: data } } };
};

export default EditTest;
