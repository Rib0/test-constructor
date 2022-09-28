import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { CheckboxProps } from '@mui/material/Checkbox';
import { nanoid } from 'nanoid';

import Result from '../result';

import { HandleChange, HandleChangeCommon } from '@/components/test-constructor/utils';
import Checkbox from '@/components/common/checkbox';
import { useSettingsContext } from '@/context/settings-context';

interface Props {
	onChange: HandleChange;
	onChangeCommon: HandleChangeCommon;
}

const Results: React.FC<Props> = ({ onChange, onChangeCommon }) => {
	const {
		common: { defaultResult },
		results,
	} = useSettingsContext();

	const [resultText, setResultText] = useState('');

	const handleChangeResultText: TextFieldProps['onChange'] = (e) => {
		setResultText(e.target.value);
	};

	const handleClearResultText = () => {
		setResultText('');
	};

	const handleAcceptResult = () => {
		onChange('results', results.concat({ text: resultText, id: nanoid() }));
		handleClearResultText();
	};

	const handleRemoveResult = (id: string) => {
		onChange(
			'results',
			results.filter((result) => result?.id !== id)
		);
	};

	const handleChangeCommonResult: CheckboxProps['onChange'] = (e) => {
		const {
			target: { name, checked },
		} = e;

		onChangeCommon(name as 'defaultResult', checked);

		if (checked) {
			onChange('results', [
				{ id: nanoid(), text: 'Верный ответ' },
				{ id: nanoid(), text: 'Неверный ответ' },
			]);
		} else {
			onChange('results', []);
		}
	};

	return (
		<Stack spacing={2}>
			<Checkbox
				checked={defaultResult}
				onChange={handleChangeCommonResult}
				name="defaultResult"
				label="Стандартный результат"
				helperText="В конце теста будет выводиться информация о количестве правильных ответов"
			/>
			{!defaultResult && (
				<>
					<Stack direction="row" spacing={2}>
						<Button
							onClick={handleAcceptResult}
							disabled={!resultText.length}
							variant="contained"
							startIcon={<CheckIcon />}
						>
							Добавить
						</Button>
						<Button
							onClick={handleClearResultText}
							disabled={!resultText.length}
							variant="contained"
							startIcon={<CancelIcon />}
						>
							Сбросить
						</Button>
					</Stack>
					<Stack>
						<TextField
							fullWidth
							onChange={handleChangeResultText}
							value={resultText}
							label="Введите название результата"
						/>
					</Stack>
				</>
			)}
			<Stack spacing={2}>
				<List>
					{results.map((result) => (
						<Result
							key={result.id}
							result={result}
							onRemoveResult={handleRemoveResult}
							removeDisabled={defaultResult}
						/>
					))}
				</List>
			</Stack>
		</Stack>
	);
};

export default Results;
