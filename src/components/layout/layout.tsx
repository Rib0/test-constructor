import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Header from './header';

import { routes } from '@/constants';

import styles from './styles.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	const { route: routeName = '' } = useRouter();
	const title = routes[routeName as keyof typeof routes]?.title;

	return (
		<Container className={styles.container} disableGutters maxWidth="lg">
			<Header />
			<Box
				sx={{
					paddingLeft: { xs: 0, sm: '12px', md: '24px' },
					paddingRight: { xs: 0, sm: '12px', md: '24px' },
				}}
				className={styles.main}
			>
				{title && (
					<Typography className={styles.title} variant="h1">
						{title}
					</Typography>
				)}
				<Container className={styles.innerContainer}>{children}</Container>
			</Box>
		</Container>
	);
};

export default Layout;
