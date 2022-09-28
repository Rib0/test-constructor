import React from 'react';
import { withAuthUserTokenSSR, withAuthUser, AuthAction } from 'next-firebase-auth';
import {
	NextPage,
	GetStaticProps,
	GetStaticPaths,
	GetServerSideProps,
	NextApiRequest,
	NextApiResponse,
} from 'next'; // TODO: для api роутов NextApiResponse<Data>
import Typography from '@mui/material/Typography';

import Authentication from '@/components/authentication';
import initAuth from '@/utils/initAuth';

import styles from './styles.module.scss';

interface Props {}

initAuth();

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
