import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { nanoid } from 'nanoid';

import Question from '../question';
import { Question as QuestionType } from '@/types';
import { HandleChange } from '@/components/test-constructor/utils';
import { useSettingsContext } from '@/context/settings-context';

interface Props {
	onChange: HandleChange;
}

const Questions: React.FC<Props> = ({ onChange }) => {
	const { questions } = useSettingsContext();
	const [questionText, setQuestionText] = useState('');

	const handleChangeQuestionText: TextFieldProps['onChange'] = (e) => {
		setQuestionText(e.target.value);
	};

	const handleClearQuestionText = () => {
		setQuestionText('');
	};

	const handleAcceptQuestion = () => {
		onChange(
			'questions',
			questions.concat({ id: nanoid(), text: questionText, answers: [] } as QuestionType)
		);
		handleClearQuestionText();
	};

	const handleRemoveQuestion = (id: string) => {
		onChange(
			'questions',
			questions.filter((question) => question.id !== id)
		);
	};

	const handleEditQuestion = (id: string, editedQuestion: QuestionType) => {
		onChange(
			'questions',
			questions.map((question) =>
				question.id === id ? { ...question, ...editedQuestion } : question
			)
		);
	};

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={2}>
				<Button
					onClick={handleAcceptQuestion}
					disabled={!questionText.length}
					variant="contained"
					startIcon={<CheckIcon />}
				>
					Добавить
				</Button>
				<Button
					onClick={handleClearQuestionText}
					disabled={!questionText.length}
					variant="contained"
					startIcon={<CancelIcon />}
				>
					Сбросить
				</Button>
			</Stack>
			<Stack>
				<TextField
					fullWidth
					onChange={handleChangeQuestionText}
					value={questionText}
					label="Введите вопрос"
				/>
			</Stack>
			<Stack spacing={2}>
				{questions.map((question) => (
					<Question
						key={question.id}
						question={question}
						onEditQuestion={handleEditQuestion}
						onRemoveQuestion={handleRemoveQuestion}
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default Questions;
