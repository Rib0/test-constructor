import React, { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './styles.module.scss';

interface Props {
	visible: boolean;
	title?: string;
	acceptButtonText?: string;
	declineButtonText?: string;
	onAccept: VoidFunction;
	onDecline?: VoidFunction;
	acceptButtonDisabled?: boolean;
}

const Modal: React.FC<PropsWithChildren<Props>> = ({
	visible,
	title = 'Внимание!',
	acceptButtonText = 'Продолжить',
	declineButtonText = 'Закрыть',
	onAccept,
	onDecline,
	acceptButtonDisabled,
	children,
}) => (
	<MuiDialog
		fullWidth
		open={visible}
		onClose={onDecline}
		transitionDuration={{ exit: 0, enter: 225 }}
	>
		<div className={styles.dialog}>
			{title && <DialogTitle align="center">{title}</DialogTitle>}
			<DialogContent>
				<DialogContentText align="center">{children}</DialogContentText>
			</DialogContent>
			<DialogActions className={styles.actions}>
				<Button
					className={styles.button}
					variant="contained"
					onClick={onAccept}
					disabled={acceptButtonDisabled}
					autoFocus
				>
					{acceptButtonText}
				</Button>
				{onDecline && (
					<Button className={styles.button} variant="outlined" onClick={onDecline}>
						{declineButtonText}
					</Button>
				)}
			</DialogActions>
		</div>
	</MuiDialog>
);

export default Modal;
