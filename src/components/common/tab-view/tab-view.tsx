import React, { PropsWithChildren } from 'react';

import TabViewItem from '../tab-view-item';

interface Props {
	visibleTab: number;
}

const TabView: React.FC<PropsWithChildren<Props>> = ({ children, visibleTab }) => (
	<div>
		{React.Children.toArray(children).map((child, index) => (
			<TabViewItem key={index} visible={index === visibleTab}>
				{child}
			</TabViewItem>
		))}
	</div>
);

export default TabView;
