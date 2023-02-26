import React from 'react';
import type { NextPage } from 'next';

export interface Props {
	data: {
		results: [];
	};
}

const TestsUsersResults: NextPage<Props> = ({ data: { results } }) => <div></div>;

export const getServerSideProps = async () => {};

export default TestsUsersResults;
