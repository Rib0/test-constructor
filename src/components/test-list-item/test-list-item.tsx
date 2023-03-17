import React, { useState, memo } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import copy from 'copy-to-clipboard';
import cx from 'classnames';

import StarsScore from '@/components/stars-score';
import { Paths } from '@/constants';
import { insertPathParams } from '@/utils/router';
import { useSnackbarContext } from '@/context/snackbar-context';
import { useAuthContext } from '@/context/auth-context';

import { TestItem } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testItem: TestItem;
	onDelete: (id: string) => void;
}

const TestListItem: React.FC<Props> = ({ testItem, onDelete }) => {
	const auth = useAuthContext();
	const snackbarContext = useSnackbarContext();
	const router = useRouter();

	const [isInfoVisible, setIsInfoVisislble] = useState(false);

	const handleStartTest = () => {
		router.push(insertPathParams(Paths.test, { id: testItem.id }));
	};

	const handleCopyClick = () => {
		const link = `${window.location.host}/tests/${testItem.id}`;
		copy(link);
		snackbarContext.showSuccessSnackbar({
			text: 'Ссылка успешно скопирована',
		});
	};

	const handleCheckResultsClick = () => {
		router.push(insertPathParams(Paths.testResults, { id: testItem.id }));
	};

	const handleToggleInfo = () => {
		setIsInfoVisislble(!isInfoVisible);
	};

	const handleEditClick = () => {
		router.push(insertPathParams(Paths.editTest, { id: testItem.id }));
	};

	const handleDeleteClick = () => {
		onDelete(testItem.id);
	};

	const defaultScore = +(testItem.scoreSum / testItem.scoreAmount).toFixed(1);
	const defaultViewClassName = cx(styles.defaultView, isInfoVisible && styles.hidden);
	const infoClassName = cx(styles.info, !isInfoVisible && styles.hidden);

	return (
		<div className={styles.cardContainer}>
			<Card raised className={styles.card}>
				<CardActionArea onClick={handleStartTest}>
					<div className={defaultViewClassName}>
						<CardMedia
							component="img"
							height="250"
							image="https://placehold.co/250x250/gray/FFF?text=?"
						/>
						<CardContent>
							<VisibilityOffIcon
								className={testItem.isPrivate ? undefined : styles.hidden}
							/>
							<Typography gutterBottom variant="h4" component="div">
								{testItem.name}
							</Typography>
							<Typography variant="body2" color="text.secondary" component="div">
								<Stack spacing={0.5}>
									<div className={styles.score}>
										<StarsScore
											className={styles.icon}
											defaultScore={defaultScore}
										/>
									</div>
									<div className={styles.questionAmount}>
										Вопросов&nbsp;-&nbsp;{testItem.questions.length}
									</div>
									<div className={styles.passesAmount}>
										<PersonIcon className={styles.icon} fontSize="small" />
										&nbsp;-&nbsp;
										{testItem.passesAmount}
									</div>
								</Stack>
							</Typography>
						</CardContent>
					</div>
					<div className={infoClassName}>
						<CardContent>
							<Typography variant="body1" component="div">
								{testItem.description}
							</Typography>
						</CardContent>
					</div>
				</CardActionArea>
				<CardActions>
					<div className={styles.commonActions}>
						<Tooltip title="Скопировать ссылку">
							<IconButton onClick={handleCopyClick}>
								<ContentCopyIcon />
							</IconButton>
						</Tooltip>
						{testItem.description && (
							<Tooltip title="Описание теста">
								<IconButton onClick={handleToggleInfo}>
									<InfoIcon />
								</IconButton>
							</Tooltip>
						)}
					</div>
					{auth?.id === testItem.userId && (
						<>
							<Tooltip title="Результаты теста">
								<IconButton onClick={handleCheckResultsClick}>
									<FactCheckIcon />
								</IconButton>
							</Tooltip>
							<IconButton onClick={handleEditClick}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={handleDeleteClick}>
								<DeleteIcon />
							</IconButton>
						</>
					)}
				</CardActions>
			</Card>
		</div>
	);
};

export default memo(TestListItem);
