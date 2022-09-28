import React, { memo } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonIcon from '@mui/icons-material/Person';

import StarsScore from '@/components/stars-score';
import { Paths } from '@/constants';
import { insertPathParams } from '@/utils/router';

import { TestItem } from '@/types';

import styles from './styles.module.scss';

interface Props {
	testItem: TestItem;
	onClick: (id: string) => void;
	onDelete: (id: string) => void;
	onUnselect: VoidFunction;
	active: boolean;
}

const TestListItem: React.FC<Props> = ({ testItem, onClick, onDelete, onUnselect, active }) => {
	const router = useRouter();

	const handleClick = () => {
		onClick(testItem.id);
	};

	const handleGoTestPage = () => {
		router.push(insertPathParams(Paths.test, { id: testItem.id }));
	};

	const handleCancel: ButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		onUnselect();
	};

	const handleEdit: IconButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		router.push(insertPathParams(Paths.editTest, { id: testItem.id }));
	};

	const handleDelete: IconButtonProps['onClick'] = (e) => {
		e.stopPropagation();
		onDelete(testItem.id);
	};

	const getSecondaryAction = () => {
		return (
			<>
				<IconButton size="large" onClick={handleEdit}>
					<EditIcon />
				</IconButton>
				<IconButton size="large" onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</>
		);
	};

	const getSecondaryContent = () => (
		<>
			<div>Вопросов - {testItem.questions.length}</div>
			<div className={styles.info}>
				<StarsScore defaultScore={testItem.score} />
				<div className={styles.passesAmount}>
					<PersonIcon fontSize="small" />
					{testItem.passesAmount}
				</div>
			</div>
		</>
	);

	const listItemClassName = cx(styles.listItem, active && styles.active);

	return (
		<ListItem
			key={testItem.id}
			secondaryAction={getSecondaryAction()}
			className={listItemClassName}
			onClick={handleClick}
			divider
		>
			<div className={styles.background}>
				<Button
					className={styles.button}
					variant="outlined"
					size="large"
					onClick={handleGoTestPage}
				>
					Начать
				</Button>
				<Button variant="outlined" size="large" onClick={handleCancel}>
					Отмена
				</Button>
			</div>
			<ListItemIcon className={styles.listItemIcon}>
				<PlayArrowIcon />
			</ListItemIcon>
			<ListItemText
				primaryTypographyProps={{ className: styles.textPrimary }}
				primary={testItem.name}
				secondary={getSecondaryContent()}
				secondaryTypographyProps={{ component: 'div' }}
			/>
		</ListItem>
	);
};

export default memo(TestListItem);
