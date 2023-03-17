import React, { SyntheticEvent, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import cx from 'classnames';

import TestResults from '@/components/test-results';
import Modal from '@/components/common/modal';
import { useSnackbarContext } from '@/context/snackbar-context';
import { useAuthContext } from '@/context/auth-context';
import { formatDate } from '@/utils/date';
import { saveResults } from '@/lib/front/tests';
import { TestItem, TestResult, TestResultAnswers } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	test: TestItem;
}

const TestProcess: React.FC<Props> = ({ test }) => {
	const auth = useAuthContext();

	const snackbarContext = useSnackbarContext();
	const [questionIndex, setQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<TestResultAnswers>({});
	const [loading, setLoading] = useState(false);
	const [userName, setUserName] = useState('');
	const [userNameModalVisible, setUserNameModalVisible] = useState(false);
	const [testResultId, setTestResultId] = useState('');

	const { name, questions } = test;
	const currentQuestion = questions[questionIndex];

	const activeAnswer = answers[currentQuestion?.id];
	const isLastQuestion = questionIndex + 1 === questions.length;

	const handleSetActiveAnswer = (e: SyntheticEvent<HTMLDivElement>) => {
		if (!(e.target instanceof HTMLDivElement)) {
			return;
		}

		const activeAnswerId = e.target.dataset.id!;
		const { id: questionId, text: questionText, answers: answersOptions } = currentQuestion;
		const answerText = answersOptions.find(({ id }) => id === activeAnswerId)?.text || '';

		setAnswers({
			...answers,
			[questionId]: { id: activeAnswerId, text: answerText, questionText },
		});
	};

	const handleGoPrevQuestion = () => {
		setQuestionIndex(questionIndex - 1);
	};

	const sendTestResults = async () => {
		setLoading(true);
		try {
			const result: Partial<TestResult> = {
				testId: test.id,
				userName: userName || auth?.displayName || '',
				userEmail: auth?.email || '',
				testName: test.name,
				answers,
				date: formatDate(new Date()),
				testOwnerId: test.userId,
			};
			const id = await saveResults(test.id, result);
			setTestResultId(id);
		} catch (e) {
			snackbarContext.showErrorSnackbar({
				text: 'Произошла ошибка во время сохранения результатов, попробуйте еще раз',
			});
			throw e;
		} finally {
			setLoading(false);
		}
	};

	const handleGoNextQuestion = async () => {
		if (isLastQuestion) {
			try {
				if (!auth?.id && !userName) {
					setUserNameModalVisible(true);
					return;
				}

				await sendTestResults();
			} catch (e) {
				return;
			}
		}

		setQuestionIndex(questionIndex + 1);
	};

	const handleChangeUserName: TextFieldProps['onChange'] = (e) => {
		setUserName(e.target.value);
	};

	const handleDeclineUserName = () => {
		setUserName('');
		setUserNameModalVisible(false);
	};

	if (!currentQuestion) return <TestResults test={test} answers={answers} id={testResultId} />;

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
								elevation={answer.id === activeAnswer?.id ? 5 : 9}
								className={cx(
									styles.answer,
									answer.id === activeAnswer?.id && styles.active
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
					disabled={!activeAnswer || loading}
					onClick={handleGoNextQuestion}
					variant="contained"
					className={styles.button}
				>
					{isLastQuestion ? 'Завершить' : 'Далее'}
				</Button>
			</Stack>
			<Modal
				title="Введите ваше имя"
				visible={userNameModalVisible}
				onAccept={handleGoNextQuestion}
				acceptButtonDisabled={!userName.trim().length || loading}
				onDecline={handleDeclineUserName}
			>
				<TextField
					fullWidth
					onChange={handleChangeUserName}
					value={userName}
					label="Имя"
					inputProps={{
						maxLength: 15,
					}}
				/>
			</Modal>
		</Stack>
	);
};

export default TestProcess;
