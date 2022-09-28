import React from 'react';
import type { NextPage } from 'next';

import TestList from '@/components/test-list';

import mockedTestList from '@/mocks/tests';

// TODO: тут сделать ssr

const Tests: NextPage = () => <TestList testList={mockedTestList} />;

export default Tests;
