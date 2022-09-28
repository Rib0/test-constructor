import React, { PropsWithChildren, memo } from 'react';

import styles from './styles.module.scss';

export interface Props {
	visible: boolean;
}

const TabViewItem: React.FC<PropsWithChildren<Props>> = ({ children, visible }) => {
	const className = visible ? undefined : styles.hidden;

	return <div className={className}>{children}</div>;
};

export default memo(TabViewItem);
