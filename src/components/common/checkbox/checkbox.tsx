import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';

interface Props extends Pick<CheckboxProps, 'checked' | 'onChange' | 'name'> {
	label?: string;
	helperText?: string;
}

const Checkbox: React.FC<Props> = ({ checked, onChange, name, label, helperText }) => (
	<FormGroup>
		<FormControlLabel
			control={<MuiCheckbox {...{ checked, onChange, name }} />}
			label={label}
		/>
		{helperText && <FormHelperText>{helperText}</FormHelperText>}
	</FormGroup>
);

export default Checkbox;
