import React, { useState, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TestUserResult from '@/components/test-user-result';
import { useAuthContext } from '@/context/auth-context';
import { useSnackbarContext } from '@/context/snackbar-context';
import { getMoreTestResults } from '@/lib/front/tests';
import { sortResultsByDate } from './utilts';

import { TestResult } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testResultsList: TestResult[];
	testResultsCount: number;
	testId: string;
}

const TestUsersResults: React.FC<Props> = ({ testResultsList, testResultsCount, testId }) => {
	const auth = useAuthContext();
	const snackbar = useSnackbarContext();
	const [loading, setLoading] = useState(false);
	const [resultsList, setResultsList] = useState(testResultsList);
	const [resultsCount, setResultsCount] = useState(testResultsCount);
	const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

	const handleSelectResult = (id: string | null) => () => {
		setSelectedResultId(id);
	};

	const handleShowMoreClick = async () => {
		const lastResultId = testResultsList.at(-1)?.id;
		setLoading(true);

		try {
			const { testResultsList: list, testResultsCount: count } = await getMoreTestResults(
				testId,
				auth?.id!,
				lastResultId!
			);
			setResultsList((prevList) => [...prevList, ...list]);
			setResultsCount(count);
		} catch (e) {
			snackbar.showErrorSnackbar({
				text: 'Не удалось загрузить результаты тестов',
			});
		} finally {
			setLoading(false);
		}
	};

	const getSecondaryText = (testResult: TestResult) => (
		<span className={styles.secondaryTextContainer}>
			{testResult.userEmail && <span>Email - {testResult.userEmail}</span>}
			<span>Время прохождения - {testResult.date}</span>
		</span>
	);

	const sortedResultsList = useMemo(() => sortResultsByDate(resultsList), [resultsList]);
	const selectedResult = useMemo(
		() => testResultsList.find(({ id }) => id === selectedResultId),
		[testResultsList, selectedResultId]
	);

	if (selectedResultId) {
		return <TestUserResult result={selectedResult!} onExit={handleSelectResult(null)} />;
	}

	if (!sortedResultsList.length) {
		return <div>Результаты не найдены</div>;
	}

	return (
		<List>
			<b>Нажмите, чтобы посмотреть ответы</b>
			{sortedResultsList.map((testResult) => (
				<ListItem
					onClick={handleSelectResult(testResult.id)}
					key={testResult.id}
					className={styles.listItem}
					divider
				>
					<ListItemText
						primaryTypographyProps={{ className: styles.textPrimary }}
						primary={`Имя - ${testResult.userName || 'неизвестно'}`}
						secondary={getSecondaryText(testResult)}
					/>
				</ListItem>
			))}
			{resultsList.length < resultsCount && (
				<div className={styles.actions}>
					<Button
						disabled={loading}
						variant="contained"
						startIcon={<ExpandMoreIcon />}
						onClick={handleShowMoreClick}
						data-test-id="load-more-results"
					>
						Показать еще
					</Button>
				</div>
			)}
		</List>
	);
};

export default TestUsersResults;
