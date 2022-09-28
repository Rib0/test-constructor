import React from 'react';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SvgIcon from '@mui/material/SvgIcon';

import Link from '@/components/common/link';

import styles from './styles.module.scss';

export interface Props extends MenuProps {
	items: {
		label: string;
		path?: string;
		onClick?: VoidFunction;
		icon: typeof SvgIcon;
	}[];
}

const Menu: React.FC<Props> = (props) => {
	const { items, ...muiMenuProps } = props;

	return (
		<MuiMenu {...muiMenuProps}>
			{items.map(({ label, icon: Icon, path, onClick }) => {
				if (path) {
					return (
						<Link type="link" noStyles passHref href={path} key={label}>
							<MenuItem>
								<ListItemIcon>
									<Icon className={styles.icon} fontSize="small" />
									{label}
								</ListItemIcon>
							</MenuItem>
						</Link>
					);
				}

				return (
					<MenuItem onClick={onClick} key={label}>
						<ListItemIcon>
							<Icon className={styles.icon} fontSize="small" />
							{label}
						</ListItemIcon>
					</MenuItem>
				);
			})}
		</MuiMenu>
	);
};

export default Menu;
