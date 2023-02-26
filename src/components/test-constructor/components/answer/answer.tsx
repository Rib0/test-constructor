import React from 'react';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import cx from 'classnames';

import EditButton from '@/components/common/edit-button';
import { Answer } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	answer: Answer;
	onEditAnswer: (answerId: string) => void;
	onCancelEditAnswer: VoidFunction;
	onRemoveAnswer: (answerId: string) => void;
	isEditing: boolean;
	isEditingDisabled: boolean;
	isSaveEditingDisabled: boolean;
	needTargetResult: boolean;
}

const Answer: React.FC<Props> = ({
	answer,
	onEditAnswer,
	onCancelEditAnswer,
	onRemoveAnswer,
	isEditing,
	isEditingDisabled,
	isSaveEditingDisabled,
	needTargetResult,
}) => {
	const handleEditAnswer = () => {
		onEditAnswer(answer.id);
	};

	const handleRemoveAnswer = () => {
		onRemoveAnswer(answer.id);
	};

	const answerClassName = cx(
		styles.answer,
		isEditing && styles.editing,
		needTargetResult && styles.needTargetResult
	);

	return (
		<div key={answer.id} className={styles.answerContainer}>
			<Paper elevation={5} className={answerClassName}>
				<span className={styles.text}>{answer.text}</span>
				<div className={styles.actions}>
					<EditButton
						className={styles.button}
						onClick={handleEditAnswer}
						disabled={isEditingDisabled || (isEditing && isSaveEditingDisabled)}
						isEditing={isEditing}
					/>
					<IconButton
						className={styles.button}
						disabled={!isEditing}
						onClick={onCancelEditAnswer}
					>
						<CancelIcon />
					</IconButton>
					<IconButton disabled={isEditing} onClick={handleRemoveAnswer}>
						<DeleteIcon />
					</IconButton>
				</div>
			</Paper>
		</div>
	);
};

export default Answer;
