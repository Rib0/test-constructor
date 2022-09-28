import React from 'react';
import type { NextPage } from 'next';

import TestConstructor from '@/components/test-constructor';

import mockedTestList from '@/mocks/tests';

// TODO: тут сделать ssr

const EditTest: NextPage = () => <TestConstructor initialValues={mockedTestList[0]} />;

export default EditTest;
