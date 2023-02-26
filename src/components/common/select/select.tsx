import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

interface Props<T> {
	onChange: (value: T) => void;
	value: T;
	label?: string;
	helperText?: string;
	options: { value: T; label: string }[];
	disabled?: boolean;
	className?: string;
}

const Select = <T extends MenuItemProps['value']>({
	onChange,
	value,
	label,
	helperText,
	options,
	disabled,
	className,
}: Props<T>) => {
	const handleChange: SelectProps['onChange'] = (e) => {
		onChange(e.target.value as T);
	};

	return (
		<FormControl size="small">
			{label && <InputLabel id={`select-${label}`}>{label}</InputLabel>}
			<MuiSelect
				className={className}
				labelId={`select-${label}`}
				value={value}
				label={label}
				onChange={handleChange}
				disabled={disabled}
			>
				{options.map((option) => (
					<MenuItem key={option.label} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default Select;
