import React, { useState, useMemo } from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SettingsContext } from '@/context/settings-context';
import TabView from '@/components/common/tab-view';
import Snackbar from '@/components/common/snackbar';
import CommonSettings from './components/common-settings';
import Questions from './components/questions';
import Results from './components/results';
import {
	HandleChange,
	HandleChangeCommon,
	mapServerTestSettingsData,
	TEST_SAVE_RESULTS,
	validateTestSettings,
} from './utils';

import { TestSettingsClient, TestItem } from '@/types';

interface Props {
	initialValues?: TestItem;
}

const TestConstructor: React.FC<Props> = ({ initialValues }) => {
	const [visibleTab, setVisibleTab] = useState(0);
	const [testSettings, setTestSettings] = useState<TestSettingsClient>(() =>
		mapServerTestSettingsData(initialValues)
	);
	const [saved, setSaved] = useState<'success' | 'error'>();

	const handleChangeTab: TabsProps['onChange'] = (_, value) => {
		setVisibleTab(value);
	};

	const handleChange: HandleChange = (name, value) => {
		setTestSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};

	const handleChangeCommon: HandleChangeCommon = (name, value) => {
		handleChange('common', { ...testSettings.common, [name]: value });
	};

	const handleSaveTest = () => {
		const isEdit = Boolean(initialValues);
		// TODO: запрос на сохранение теста
		setSaved('success');
	};

	const handleCloseSnackBar = () => {
		setSaved(undefined);
	};

	const snackBarAction = (
		<IconButton size="medium" onClick={handleCloseSnackBar}>
			<ContentCopyIcon />
		</IconButton>
	);

	const validationMessage = useMemo(() => validateTestSettings(testSettings), [testSettings]);

	return (
		<Stack direction="column" spacing={3}>
			<Tabs value={visibleTab} onChange={handleChangeTab}>
				<Tab label="Общие настройки" />
				<Tab label="Список вопросов" />
				{testSettings.common.showResult && <Tab label="Результаты теста" />}
			</Tabs>
			<Stack spacing={1} direction="column">
				<Stack direction="row">
					<Button
						disabled={Boolean(validationMessage)}
						variant="contained"
						startIcon={<SaveIcon />}
						onClick={handleSaveTest}
					>
						Сохранить
					</Button>
				</Stack>
				<Typography color="yellowgreen" variant="subtitle2" minHeight={22}>
					{validationMessage}
				</Typography>
			</Stack>
			<SettingsContext.Provider value={testSettings}>
				<TabView visibleTab={visibleTab}>
					<CommonSettings onChange={handleChangeCommon} />
					<Questions onChange={handleChange} />
					<Results onChange={handleChange} onChangeCommon={handleChangeCommon} />
				</TabView>
			</SettingsContext.Provider>
			<Snackbar
				open={Boolean(saved)}
				autoHideDuration={10000}
				onClose={handleCloseSnackBar}
				type={saved || 'success'}
				action={snackBarAction}
			>
				{TEST_SAVE_RESULTS[saved as keyof typeof TEST_SAVE_RESULTS]}
			</Snackbar>
		</Stack>
	);
};

export default TestConstructor;
