import React from 'react';
import { withAuthUserTokenSSR, AuthAction, withAuthUser } from 'next-firebase-auth';
import { NextPage } from 'next';
import Typography from '@mui/material/Typography';

import Authentication from '@/components/authentication';

import styles from './styles.module.scss';

interface Props {}

const PageLogin: NextPage<Props> = () => {
	return (
		<div className={styles.container}>
			<Typography className={styles.text}>
				Войдите в личный кабинет удобным для вас способом, либо продолжите как гость
			</Typography>
			<Authentication />
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser<Props>({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})(PageLogin);
