import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import StarsScore from '@/components/stars-score';
import Loader from '@/components/common/loader';
import { useSnackbarContext } from '@/context/snackbar-context';
import { saveScore, editResults } from '@/lib/front/tests';
import { getQuestionEnding } from './utils';
import { Paths } from '@/constants';
import { TestItem, TestResultAnswers } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	id: string;
	test: TestItem;
	answers: TestResultAnswers;
}

const RankTest: React.FC<Props> = ({ id, test, answers }) => {
	const snackbarContext = useSnackbarContext();
	const router = useRouter();
	const [result, setResult] = useState('');
	const [score, setScore] = useState(0);

	useEffect(() => {
		if (!test.showResult) return;

		const results = Object.entries(answers).reduce<
			Record<string, { weight: number; amount: number }>
		>((acc, [questionId, { id: answerId }]) => {
			const question = test.questions.find((question) => question.id === questionId);
			const answer = question?.answers.find((answer) => answer.id === answerId);

			return {
				...acc,
				[answer?.targetResult || '']: {
					weight: (+acc[answer?.targetResult || '']?.weight || 0) + answer?.weight!,
					amount: (+acc[answer?.targetResult || '']?.amount || 0) + 1,
				},
			};
		}, {});

		let resultText;

		if (test.defaultResult) {
			const rightResult = test.results.find((r) => r.text.toLowerCase() === 'верный ответ');
			const rightResultInfo = results[rightResult?.id!];
			resultText = `Вы ответили верно на ${rightResultInfo.amount} из ${
				test.questions.length
			} ${getQuestionEnding(test.questions.length)}`;
			editResults(id, { resultText });
			setResult(resultText);

			return;
		}

		const maxWeight = Math.max(...Object.values(results).map((r) => r.weight));
		const [maxResultId] = Object.entries(results).find(
			([key, { weight }]) => weight === maxWeight
		)!;
		resultText = test.results.find((result) => result.id === maxResultId)?.text || '';
		editResults(id, { resultText });

		setResult(resultText);
	}, [test, answers, id]);

	const handleStarClick = (score: number) => {
		setScore(score);
	};

	const handleFinish = async () => {
		if (score) {
			try {
				await saveScore(test.id, id, score);
			} catch (e) {
				snackbarContext.showErrorSnackbar({
					text: 'Произошла ошибка во время отправки вашей оценки, попробуйте еще раз',
				});
				return;
			}
		}

		router.push(Paths.tests);
	};

	if (test.showResult && !result) {
		return <Loader noBg />;
	}

	return (
		<Stack className={styles.root} spacing={10}>
			<Stack spacing={15}>
				{test.showResult && (
					<Stack spacing={1}>
						<Typography variant="h3" component="div">
							Ваш результат:
						</Typography>
						<Typography variant="h5" component="div">
							{result}
						</Typography>
					</Stack>
				)}
				<Stack spacing={2}>
					<Typography variant="h5" component="div">
						Оцените тест
					</Typography>
					<StarsScore onStarClick={handleStarClick} />
					<Button onClick={handleFinish} variant="contained">
						{score ? 'Оценить' : 'В следующий раз'}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default RankTest;
