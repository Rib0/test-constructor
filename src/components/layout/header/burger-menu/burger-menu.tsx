import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

import { useGetNavigationPages } from '@/hooks';

const BurgerMenu: React.FC = () => {
	const navigationPages = useGetNavigationPages();
	const [isOpen, setOpen] = useState(false);

	const handleChangeOpenState = (isOpen: boolean) => () => {
		setOpen(isOpen);
	};

	return (
		<>
			<IconButton onClick={handleChangeOpenState(true)}>
				<MenuIcon fontSize="large" />
			</IconButton>
			<Drawer anchor="left" open={isOpen} onClose={handleChangeOpenState(false)}>
				<List>
					{navigationPages.map(({ label, path, icon: Icon }) => (
						<ListItem key={path}>
							<ListItemButton href={path}>
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
								<ListItemText primary={label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default BurgerMenu;
