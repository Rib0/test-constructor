import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import StarsScore from '@/components/stars-score';
import { Paths } from '@/constants';

import styles from './styles.module.scss';

const RankTest: React.FC = () => {
	const router = useRouter();
	const [score, setScore] = useState(0);

	const handleStarClick = (score: number) => {
		setScore(score);
	};

	const handleFinish = async () => {
		if (score) {
			// TODO: отправить оценку на сервер
		}

		router.push(Paths.home);
	};

	return (
		<div className={styles.root}>
			<Stack spacing={7}>
				<Typography variant="h5">Оцените тест</Typography>
				<StarsScore onStarClick={handleStarClick} />
				<Button onClick={handleFinish} variant="contained">
					{score ? 'Оценить' : 'В следующий раз'}
				</Button>
			</Stack>
		</div>
	);
};

export default RankTest;
