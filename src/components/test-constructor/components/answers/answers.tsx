import React, { useState, useEffect, useMemo } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { nanoid } from 'nanoid';

import { useSettingsContext } from '@/context/settings-context';
import Answer from '../answer';
import Select from '@/components/common/select';
import { TestSettingsClient } from '@/types/client';
import { Question, Answer as AnswerType } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	question: Question;
	onEditQuestion: (id: string, question: Question) => void;
}

const WEIGHT_OPTIONS = Array.from({ length: 3 }, (_, index) => ({
	value: index + 1,
	label: String(index + 1),
}));
const [{ value: DEFAULT_WEIGHT }] = WEIGHT_OPTIONS;
const mapResultsToOptions = (results: TestSettingsClient['results']) =>
	results.map((result) => ({ value: result.id, label: result.text }));

const Answers: React.FC<Props> = ({ onEditQuestion, question }) => {
	const { common, results } = useSettingsContext();

	const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
	const [answerText, setAnswerText] = useState('');
	const [answerWeight, setAnswerWeight] = useState(DEFAULT_WEIGHT);
	const [answerTargetResult, setAnswerTargetResult] = useState(results[0]?.id || '');

	useEffect(() => {
		const editingAnswer = question.answers.find((answer) => answer.id === editingAnswerId)!;
		const defaultTargetResult = results[0]?.id || '';

		setAnswerText(editingAnswerId ? editingAnswer.text || '' : '');
		setAnswerWeight(editingAnswerId ? editingAnswer.weight || DEFAULT_WEIGHT : DEFAULT_WEIGHT);
		setAnswerTargetResult(
			editingAnswerId
				? editingAnswer.targetResult || defaultTargetResult
				: defaultTargetResult
		);
	}, [editingAnswerId, question.answers, results]);

	const handleChangeAnswerText: TextFieldProps['onChange'] = (e) => {
		setAnswerText(e.target.value);
	};

	const handleChangeAnswerWeight = (value: number) => {
		setAnswerWeight(value);
	};

	const handleChangeAnswerTargetResult = (value: string) => {
		setAnswerTargetResult(value);
	};

	const handleResetAnswer = () => {
		setAnswerText('');
		setAnswerWeight(DEFAULT_WEIGHT);
		setAnswerTargetResult(results[0]?.id || '');
	};

	const handleRemoveAnswer = (answerId: string) => {
		onEditQuestion(question.id, {
			answers: question.answers.filter((answer) => answer.id !== answerId),
		} as Question);
	};

	const handleSaveAnswer = () => {
		const updatedAnswer: Partial<AnswerType> = {
			text: answerText,
			weight: answerWeight,
			targetResult: answerTargetResult,
		};
		onEditQuestion(question.id, {
			answers: question.answers.map((answer) =>
				answer.id === editingAnswerId ? { ...answer, ...updatedAnswer } : answer
			),
		} as Question);
		setEditingAnswerId(null);
	};

	const handleEditOrSaveAnswer = (answerId: string) => {
		if (!editingAnswerId) {
			setEditingAnswerId(answerId);
			return;
		}
		handleSaveAnswer();
	};

	const handleCancelEditAnswer = () => {
		setEditingAnswerId(null);
	};

	const handleAddAnswer = () => {
		const newAnswer = {
			id: nanoid(),
			text: answerText,
			weight: answerWeight,
			targetResult: answerTargetResult,
		};
		onEditQuestion(question.id, { answers: question.answers.concat(newAnswer) } as Question);
		handleResetAnswer();
	};

	const resultsOptions = useMemo(() => mapResultsToOptions(results), [results]);
	const controlsDisabled = question.answers.length === 4 && !editingAnswerId;

	return (
		<>
			<AccordionDetails>
				<Stack spacing={3}>
					<Stack spacing={controlsDisabled ? 0 : 3}>
						<Stack spacing={2} display={controlsDisabled ? 'none' : 'auto'}>
							<TextField
								fullWidth
								onChange={handleChangeAnswerText}
								value={answerText}
								label="Введите вариант ответа (максимум - 4)"
								inputProps={{
									maxLength: 70,
								}}
							/>
							{common.showResult && (
								<Stack direction="row" spacing={2} className={styles.addActions}>
									<Select
										disabled={common.defaultResult}
										onChange={handleChangeAnswerWeight}
										value={answerWeight}
										label="Вес"
										helperText="Выберите вес ответа"
										options={WEIGHT_OPTIONS}
									/>
									<Select
										className={styles.select}
										disabled={!resultsOptions.length}
										onChange={handleChangeAnswerTargetResult}
										value={answerTargetResult}
										label="Результат"
										helperText="Выберите результат теста"
										options={resultsOptions}
									/>
								</Stack>
							)}
							<Stack direction="row" spacing={2}>
								<Button
									disabled={!answerText}
									onClick={editingAnswerId ? handleSaveAnswer : handleAddAnswer}
									variant="contained"
									startIcon={<CheckIcon />}
									className={styles.saveButton}
								>
									{editingAnswerId ? 'Сохранить' : 'Добавить'}
								</Button>
								<Button
									onClick={handleResetAnswer}
									variant="contained"
									startIcon={<CancelIcon />}
								>
									Сбросить
								</Button>
							</Stack>
						</Stack>
					</Stack>
					<div>
						<Stack className={styles.answers} direction="row" flexWrap="wrap">
							{question.answers.map((answer) => (
								<Answer
									key={answer.id}
									answer={answer}
									onEditAnswer={handleEditOrSaveAnswer}
									onCancelEditAnswer={handleCancelEditAnswer}
									onRemoveAnswer={handleRemoveAnswer}
									isEditing={answer.id === editingAnswerId}
									isEditingDisabled={
										!!editingAnswerId && editingAnswerId !== answer.id
									}
									isSaveEditingDisabled={!answerText.length}
									needTargetResult={
										!results.find((r) => r.id === answer.targetResult) &&
										common.showResult
									}
								/>
							))}
						</Stack>
					</div>
				</Stack>
			</AccordionDetails>
		</>
	);
};

export default Answers;
