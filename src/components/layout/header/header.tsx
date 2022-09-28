import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Link from '@/components/common/link';
import AvatarMenu from './avatar-menu';
import { useAuthContext } from '@/context/auth-context';
import { navigationPages, navigationPagesNoAuth } from '@/constants';

import styles from './styles.module.scss';

// TODO: сделать адаптив
// TODO: сделать загрузку изображений на сервер (на какой?) с использованием layout: fill
// TODO: загружать изображения в https://github.com/leerob/nextjs-gcp-storage

const Header: React.FC = () => {
	const auth = useAuthContext();

	const currentNavigationPages = auth?.id ? navigationPages : navigationPagesNoAuth;

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton className={styles.icon}>
					<MenuIcon fontSize="large" />
				</IconButton>
				<Link className={styles.link} noStyles passHref href="/">
					<Typography fontWeight="1000" variant="h5">
						Тестики)
					</Typography>
				</Link>
				<div className={styles.pages}>
					{currentNavigationPages.map(({ label, path, icon: Icon }) => (
						<Link key={path} color="inherit" href={path}>
							<Icon />
							<div className={styles.label}>{label}</div>
						</Link>
					))}
				</div>
				<AvatarMenu />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
