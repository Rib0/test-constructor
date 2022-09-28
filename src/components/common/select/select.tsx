import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

interface Props {
	onChange: (value: string) => void;
	value: string;
	label?: string;
	helperText?: string;
	options: { value: string; label: string }[];
	disabled?: boolean;
}

const Select: React.FC<Props> = ({ onChange, value, label, helperText, options, disabled }) => {
	const handleChange: SelectProps['onChange'] = (e) => {
		onChange(e.target.value as string);
	};

	return (
		<FormControl size="small">
			{label && <InputLabel id={`select-${label}`}>{label}</InputLabel>}
			<MuiSelect
				labelId={`select-${label}`}
				value={value}
				label={label}
				onChange={handleChange}
				disabled={disabled}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</MuiSelect>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default Select;
