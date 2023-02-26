import React from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { CheckboxProps } from '@mui/material/Checkbox';

import { HandleChangeCommon } from '@/components/test-constructor/utils';
import Checkbox from '@/components/common/checkbox';
import { useSettingsContext } from '@/context/settings-context';

interface Props {
	onChange: HandleChangeCommon;
}

const CommonSettings: React.FC<Props> = ({ onChange }) => {
	const { common } = useSettingsContext();

	const handleChangeTextField: TextFieldProps['onChange'] = (e) => {
		const {
			target: { name, value },
		} = e;
		onChange(name as 'name', value);
	};

	const handleChangeCheckboxValue: CheckboxProps['onChange'] = (e) => {
		const {
			target: { name, checked },
		} = e;
		onChange(name as 'showResult' | 'isPrivate', checked);
	};

	return (
		<Stack spacing={2}>
			<TextField
				fullWidth
				onChange={handleChangeTextField}
				name="name"
				value={common.name}
				label="Название теста"
				inputProps={{
					maxLength: 60,
				}}
			/>
			<Checkbox
				checked={common.showResult}
				onChange={handleChangeCheckboxValue}
				name="showResult"
				label="Показывать результат"
				helperText="Показывать результат теста после его прохождения"
			/>
			<Checkbox
				checked={common.isPrivate}
				onChange={handleChangeCheckboxValue}
				name="isPrivate"
				label="Доступен только по ссылке"
				helperText="Тест не будет показываться в общем списке тестов"
			/>
		</Stack>
	);
};

export default CommonSettings;
