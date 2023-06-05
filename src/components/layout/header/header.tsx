import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import BurgerMenu from './burger-menu';
import AvatarMenu from './avatar-menu';
import Link from '@/components/common/link';
import { useGetNavigationPages } from '@/hooks';

import styles from './styles.module.scss';

// TODO: сделать загрузку изображений на сервер (на какой?) с использованием layout: fill
// TODO: загружать изображения в https://github.com/leerob/nextjs-gcp-storage

const Header: React.FC = () => {
	const navigationPages = useGetNavigationPages();

	return (
		<AppBar position="static">
			<Toolbar>
				<Box className={styles.menu} sx={{ display: { md: 'none' } }}>
					<BurgerMenu />
				</Box>
				<Box sx={{ display: { xs: 'none', md: 'flex' } }} className={styles.pages}>
					{navigationPages.map(({ label, path, icon: Icon }) => (
						<Link key={path} color="inherit" href={path}>
							<Icon className={styles.icon} />
							<div>{label}</div>
						</Link>
					))}
				</Box>
				<AvatarMenu />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
