import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import StarsScore from '@/components/stars-score';
import { TestResult } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	result: TestResult;
	onExit: VoidFunction;
}

const TestUserResult: React.FC<Props> = ({ result, onExit }) => {
	const { answers } = result;

	return (
		<Stack spacing={2}>
			<div>
				<Button variant="contained" onClick={onExit} startIcon={<ArrowBackIcon />}>
					Назад
				</Button>
			</div>
			{result.resultText && (
				<Typography variant="h5" gutterBottom textAlign="center">
					Результат теста: <b>{result.resultText}</b>
				</Typography>
			)}
			<div className={styles.score}>
				Оценка: &nbsp;
				{result.score ? <StarsScore defaultScore={result.score} /> : 'Нет оценки'}
			</div>
			<List>
				{Object.entries(answers).map(([answerId, { questionText, text }]) => (
					<ListItem key={answerId} divider>
						<ListItemText
							primaryTypographyProps={{ className: styles.textPrimary }}
							primary={questionText}
							secondary={`Ответ: ${text}`}
						/>
					</ListItem>
				))}
			</List>
		</Stack>
	);
};

export default TestUserResult;
