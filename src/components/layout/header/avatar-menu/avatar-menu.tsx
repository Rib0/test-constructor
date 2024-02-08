import React, { useState, useMemo } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';

import Menu, { Props } from '@/components/common/menu';
import Link from '@/components/common/link';
import { useAuthContext } from '@/context/auth-context';
import { Paths } from '@/constants';

import styles from './styles.module.scss';

const AvatarMenu: React.FC = () => {
	const auth = useAuthContext();
	const [anchor, setAnchor] = useState<Props['anchorEl'] | null>(null);

	const handleClick: IconButtonProps['onClick'] = (e) => {
		setAnchor(e.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	const menuItems = useMemo<Props['items']>(
		() => [
			{
				label: 'Выйти',
				icon: LogoutIcon,
				onClick: auth?.signOut,
				dataTestId: 'logout-button',
			},
		],
		[auth]
	);

	return (
		<>
			{auth?.id ? (
				<>
					<IconButton onClick={handleClick} size="small" data-test-id="user-menu-button">
						<Avatar className={styles.avatar} />
					</IconButton>
					<Menu
						anchorEl={anchor}
						items={menuItems}
						open={!!anchor}
						onClose={handleClose}
						onClick={handleClose}
					/>
				</>
			) : (
				<Link type="button" href={Paths.login} data-test-id="login-button">
					Войти
				</Link>
			)}
		</>
	);
};

export default AvatarMenu;
