import React, { PropsWithChildren } from 'react';
import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
	props: PropsWithChildren<AlertProps>,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return <MuiAlert elevation={6} ref={ref} {...props} />;
});

interface Props
	extends Pick<SnackbarProps, 'open' | 'autoHideDuration' | 'onClose'>,
		Pick<AlertProps, 'action'> {
	type: AlertProps['severity'];
}

const Snackbar: React.FC<PropsWithChildren<Props>> = ({
	open,
	autoHideDuration,
	onClose,
	type,
	action,
	children,
}) => {
	return (
		<MuiSnackbar
			transitionDuration={open ? 300 : 0}
			{...{ open, autoHideDuration, onClose }}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert onClose={onClose as AlertProps['onClose']} action={action} severity={type}>
				{children}
			</Alert>
		</MuiSnackbar>
	);
};

export default Snackbar;
