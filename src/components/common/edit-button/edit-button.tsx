import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
	onClick: IconButtonProps['onClick'];
	isEditing: boolean;
	className?: string;
	disabled?: boolean;
}

const EditButton: React.FC<Props> = ({ onClick, disabled, isEditing, className }) => {
	const icon = isEditing ? <CheckIcon /> : <EditIcon />;

	return (
		<IconButton className={className} onClick={onClick} disabled={disabled}>
			{icon}
		</IconButton>
	);
};

export default EditButton;
