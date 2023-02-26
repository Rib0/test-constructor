import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import Answers from '../answers';
import EditButton from '@/components/common/edit-button';
import { Question } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	question: Question;
	onEditQuestion: (id: string, question: Question) => void;
	onRemoveQuestion: (id: string) => void;
}

const Question: React.FC<Props> = ({ question, onEditQuestion, onRemoveQuestion }) => {
	const [questionText, setQuestionText] = useState(question.text);
	const [isEditingQuestion, setEditingQuestion] = useState(false);

	const handleChangeQuestionText: TextFieldProps['onChange'] = (e) => {
		setQuestionText(e.target.value);
	};

	const handleClickQuestionText: TextFieldProps['onClick'] = (e) => {
		e.stopPropagation();
	};

	const handleRemoveQuestion: IconButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		onRemoveQuestion(question.id);
	};

	const handleEditQuestion: IconButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		if (!isEditingQuestion) {
			setEditingQuestion(true);
			return;
		}

		onEditQuestion(question.id, { ...question, text: questionText });
		setEditingQuestion(false);
	};

	const handleCancelEditQuestion: IconButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		setQuestionText(question.text);
		setEditingQuestion(false);
	};

	return (
		<Accordion>
			<AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
				<div className={styles.questionText}>
					{!isEditingQuestion && <b>{question.text}</b>}
					{isEditingQuestion && (
						<TextField
							fullWidth
							onChange={handleChangeQuestionText}
							onClick={handleClickQuestionText}
							value={questionText}
							label="Введите вопрос"
							autoFocus
							inputProps={{
								maxLength: 100,
							}}
						/>
					)}
				</div>
				<div className={styles.questionActions}>
					<EditButton
						className={styles.button}
						onClick={handleEditQuestion}
						isEditing={isEditingQuestion}
					/>
					<IconButton
						className={styles.button}
						disabled={!isEditingQuestion}
						onClick={handleCancelEditQuestion}
					>
						<CancelIcon />
					</IconButton>
					<IconButton onClick={handleRemoveQuestion}>
						<DeleteIcon />
					</IconButton>
				</div>
			</AccordionSummary>
			<Answers question={question} onEditQuestion={onEditQuestion} />
		</Accordion>
	);
};

export default Question;
