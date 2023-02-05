import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Result } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	result: Result;
	onRemoveResult: (id: string) => void;
	removeDisabled: boolean;
}

const Result: React.FC<Props> = ({ result, onRemoveResult, removeDisabled }) => {
	const handleRemoveResult = () => {
		onRemoveResult(result.id);
	};

	return (
		<ListItem
			divider
			secondaryAction={
				<IconButton size="large" onClick={handleRemoveResult} disabled={removeDisabled}>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon className={styles.listItemIcon}>
				<div className={styles.point} />
			</ListItemIcon>
			<ListItemText primary={result.text} />
		</ListItem>
	);
};

export default Result;
