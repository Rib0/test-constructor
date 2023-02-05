import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: React.FC = () => {
	return (
		<Backdrop sx={{ bgcolor: (theme) => theme.palette.background.default }} open={true}>
			<CircularProgress color="primary" size={100} />
		</Backdrop>
	);
};

export default Loader;
