export const roundScore = (score?: string) => {
	if (!score) {
		return 0;
	}

	const integerPart = parseInt(score);
	const decimialPart = +(+score % integerPart).toFixed(1);
	const roundedDecimialPart = decimialPart < 0.3 ? 0 : decimialPart > 0.7 ? 1 : 0.5;

	return integerPart + roundedDecimialPart;
};
