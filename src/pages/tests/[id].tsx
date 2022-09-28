import React from 'react';
import type { NextPage } from 'next';

import TestProcessComponent from '@/components/test-process';
import mockedTestList from '@/mocks/tests';

const TestProcess: NextPage = () => <TestProcessComponent test={mockedTestList[0]} />;

export default TestProcess;
