import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
	noBg?: boolean;
}

const Loader: React.FC<Props> = ({ noBg }) => {
	return (
		<Backdrop
			sx={{ bgcolor: (theme) => (noBg ? '' : theme.palette.background.default) }}
			open={true}
		>
			<CircularProgress color="primary" size={100} />
		</Backdrop>
	);
};

export default Loader;
