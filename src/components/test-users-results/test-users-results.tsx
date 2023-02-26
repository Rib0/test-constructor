import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { TestResult } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testResultsList: TestResult[];
	testResultsCount: number;
}

const TestUsersResults: React.FC<Props> = ({ testResultsList, testResultsCount }) => {
	const handleShowMoreClick = () => {};

	const getSecondaryText = (testResult: TestResult) => (
		<>
			{testResult.userEmail && <div>Email - {testResult.userEmail}</div>}
			<div>Время прохождения - {testResult.date}</div>
		</>
	);

	return (
		<List>
			{testResultsList.map((testResult) => (
				<ListItem key={testResult.id} className={styles.listItem} divider>
					<ListItemText
						primaryTypographyProps={{ className: styles.textPrimary }}
						primary={`Имя - ${testResult.userName || 'неизвестно'}`}
						secondary={getSecondaryText(testResult)}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default TestUsersResults;
