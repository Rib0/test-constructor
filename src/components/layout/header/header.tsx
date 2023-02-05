import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
// TODO: добавить сюда nav для меню, мб из material-ui
// Добавить расстояние между ссылками

const Header: React.FC = () => {
	const auth = useAuthContext();

	const currentNavigationPages = auth?.id ? navigationPages : navigationPagesNoAuth;

	return (
		<AppBar position="static">
			<Toolbar>
				<div className={styles.menu}>
					<IconButton className={styles.icon}>
						<MenuIcon fontSize="large" />
					</IconButton>
				</div>
				<div className={styles.pages}>
					{currentNavigationPages.map(({ label, path, icon: Icon }) => (
						<Link key={path} color="inherit" href={path}>
							<Icon className={styles.icon} />
							<div>{label}</div>
						</Link>
					))}
				</div>
				<AvatarMenu />
			</Toolbar>
		</AppBar>
	);
};

export default Header;
