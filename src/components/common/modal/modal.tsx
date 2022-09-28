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
}

const Modal: React.FC<PropsWithChildren<Props>> = ({
	visible,
	title = 'Внимание!',
	acceptButtonText = 'Продолжить',
	declineButtonText = 'Закрыть',
	onAccept,
	onDecline,
	children,
}) => (
	<MuiDialog open={visible} onClose={onDecline} transitionDuration={{ exit: 0, enter: 225 }}>
		{title && <DialogTitle className={styles.title}>{title}</DialogTitle>}
		<DialogContent>
			<DialogContentText>{children}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={onAccept} autoFocus>
				{acceptButtonText}
			</Button>
			{onDecline && <Button onClick={onDecline}>{declineButtonText}</Button>}
		</DialogActions>
	</MuiDialog>
);

export default Modal;
