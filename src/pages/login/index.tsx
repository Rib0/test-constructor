import React from 'react';
import { withAuthUserTokenSSR, AuthAction, withAuthUser } from 'next-firebase-auth';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NextPage } from 'next';

import Authentication from '@/components/authentication';

const PageLogin: NextPage<{}> = () => (
	<Stack spacing={2}>
		<Typography align="center">
			Войдите в личный кабинет удобным для вас способом, либо продолжите как гость
		</Typography>
		<Authentication />
	</Stack>
);

export const getServerSideProps = withAuthUserTokenSSR({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser<{}>({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
})(PageLogin);
