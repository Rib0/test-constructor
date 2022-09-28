import React, { SyntheticEvent, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import cx from 'classnames';

import TestResults from '@/components/test-results';
import { TestItem } from '@/types';

import styles from './styles.module.scss';

interface Props {
	test: TestItem;
}

const TestProcess: React.FC<Props> = ({ test }) => {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false); // TODO: добавить отправку на сервер и возмодность ошибки

	const { name, questions } = test;
	const currentQuestion = questions[questionIndex];

	useEffect(() => {
		if (!currentQuestion) {
			// TODO: отправка результатов на сервер
		}
	}, [currentQuestion]);

	const handleSetActiveAnswer = (e: SyntheticEvent<HTMLDivElement>) => {
		if (!(e.target instanceof HTMLDivElement)) {
			return;
		}

		const activeAnswerId = e.target.dataset.id!;
		const { id: questionId } = currentQuestion;

		setAnswers({ ...answers, [questionId]: activeAnswerId });
	};

	const handleGoPrevQuestion = () => {
		setQuestionIndex(questionIndex - 1);
	};

	const handleGoNextQuestion = () => {
		setQuestionIndex(questionIndex + 1);
	};

	if (loading) {
		return <div>loading...</div>;
	}

	if (!currentQuestion)
		return (
			// TODO: расчитать результат и показывать его если включена галочка
			<TestResults />
		);

	const activeAnswer = answers[currentQuestion.id];
	const isLastQuestion = questionIndex + 1 === questions.length;

	return (
		<Stack className={styles.root} spacing={3}>
			<Typography className={styles.centeredText} variant="h1">
				{name}
			</Typography>
			<Typography className={styles.centeredText} variant="h2">
				{currentQuestion.text}
			</Typography>
			<Typography variant="body1">
				Вопрос <b>{questionIndex + 1}</b> из <b>{questions.length}</b>
			</Typography>
			<div className={styles.answersContainer}>
				<Stack direction="row" flexWrap="wrap" className={styles.answers}>
					{currentQuestion.answers?.map((answer) => (
						<div key={answer.id} className={styles.answerContainer}>
							<Paper
								onClick={handleSetActiveAnswer}
								data-id={answer.id}
								elevation={answer.id === activeAnswer ? 5 : 9}
								className={cx(
									styles.answer,
									answer.id === activeAnswer && styles.active
								)}
							>
								<span className={styles.text}>{answer.text}</span>
							</Paper>
						</div>
					))}
				</Stack>
			</div>
			<Stack direction="row">
				<Button
					disabled={questionIndex === 0}
					onClick={handleGoPrevQuestion}
					variant="contained"
					className={styles.button}
				>
					Назад
				</Button>
				<Button
					disabled={!activeAnswer}
					onClick={handleGoNextQuestion}
					variant="contained"
					className={styles.button}
				>
					{isLastQuestion ? 'Завершить' : 'Далее'}
				</Button>
			</Stack>
		</Stack>
	);
};

export default TestProcess;
