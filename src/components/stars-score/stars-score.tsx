import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { roundScore } from './utils';

import styles from './styles.module.scss';

interface Props {
	defaultScore?: number;
	onStarClick?: (starIndex: number) => void;
}

const StarsScore: React.FC<Props> = ({ defaultScore, onStarClick = () => {} }) => {
	const [hoveredIndex, setHoveredIndex] = useState(0);
	const [activeIndex, setActiveIndex] = useState(() => roundScore(defaultScore));

	const handleChangeHoveredIndex = (index: number) => () => {
		setHoveredIndex(index);
	};

	const handleClick = () => {
		setActiveIndex(hoveredIndex);
		onStarClick(hoveredIndex);
	};

	const targetValue = activeIndex || hoveredIndex;
	const disabled = defaultScore !== undefined;

	return (
		<div onMouseLeave={handleChangeHoveredIndex(0)} className={styles.starsScore}>
			{disabled &&
				Array.from({ length: 5 }).map((i, index) =>
					index + 1 <= targetValue ? (
						<StarIcon key={index} color="warning" />
					) : index + 1 - targetValue < 1 ? (
						<StarHalfIcon key={index} color="warning" />
					) : (
						<StarBorderIcon key={index} color="warning" />
					)
				)}
			{!disabled &&
				Array.from({ length: 5 }).map((i, index) => (
					<IconButton
						color="warning"
						size="large"
						onClick={handleClick}
						onMouseEnter={handleChangeHoveredIndex(index + 1)}
						key={index}
					>
						{index + 1 <= targetValue ? <StarIcon /> : <StarBorderIcon />}
					</IconButton>
				))}
		</div>
	);
};

export default StarsScore;
