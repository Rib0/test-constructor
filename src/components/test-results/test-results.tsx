import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import StarsScore from '@/components/stars-score';
import { incrementDocValue } from '@/lib/front';
import { Paths } from '@/constants';
import { DbCollections } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testId: string;
}

const RankTest: React.FC<Props> = ({ testId }) => {
	const router = useRouter();
	const [score, setScore] = useState(0);

	const handleStarClick = (score: number) => {
		setScore(score);
	};

	const handleFinish = async () => {
		if (score) {
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
