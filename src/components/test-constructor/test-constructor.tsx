import React, { useState, useCallback, useMemo } from 'react';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import copy from 'copy-to-clipboard';

import { SettingsContext } from '@/context/settings-context';
import { useSnackbarContext } from '@/context/snackbar-context';
import { useAuthContext } from '@/context/auth-context';
import TabView from '@/components/common/tab-view';
import CommonSettings from './components/common-settings';
import Questions from './components/questions';
import Results from './components/results';
import {
	HandleChange,
	HandleChangeCommon,
	mapTestSettingsToClientData,
	TEST_SAVE_RESULTS,
	validateTestSettings,
	mapTestSettingsToServerData,
} from './utils';
import { addDocument, editDocument } from '@/lib/front';
import { TestSettingsClient } from '@/types/client';
import { TestItem, DbCollections } from '@/types/server';

interface Props {
	initialValues?: TestItem;
}

const TestConstructor: React.FC<Props> = ({ initialValues }) => {
	const auth = useAuthContext();
	const snackbarContext = useSnackbarContext();
	const [visibleTab, setVisibleTab] = useState(0);
	const [testSettings, setTestSettings] = useState<TestSettingsClient>(() =>
		mapTestSettingsToClientData(initialValues)
	);
	const [saveLoading, setSaveLoading] = useState(false);

	const handleChangeTab: TabsProps['onChange'] = (_, value) => {
		setVisibleTab(value);
	};

	const handleChange: HandleChange = useCallback((name, value) => {
		setTestSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	}, []);

	const handleChangeCommon: HandleChangeCommon = useCallback(
		(name, value) => {
			handleChange('common', { ...testSettings.common, [name]: value });
		},
		[handleChange, testSettings.common]
	);

	const handleResetSettings = () => {
		const isEdit = Boolean(initialValues);
		setVisibleTab(0);
		if (!isEdit) {
			setTestSettings(mapTestSettingsToClientData());
		}
	};

	const getSnackbarAction = (link: string) => {
		return (
			<IconButton
				size="medium"
				onClick={() => {
					copy(link);
					snackbarContext.handleChange({ open: false });
				}}
			>
				<ContentCopyIcon />
			</IconButton>
		);
	};

	const handleSaveTest = async () => {
		const isEdit = Boolean(initialValues);
		const data = mapTestSettingsToServerData({ ...testSettings, userId: auth?.id! });
		setSaveLoading(true);

		try {
			if (isEdit) {
				await editDocument(data, DbCollections.tests, testSettings.id!);
			} else {
				await addDocument(data, DbCollections.tests);
			}
			const link = `${window.location.host}/tests/${testSettings.id!}`;
			snackbarContext.showSuccessSnackbar({
				text: TEST_SAVE_RESULTS['success'],
				action: getSnackbarAction(link),
			});
			handleResetSettings();
		} catch (e) {
			snackbarContext.showErrorSnackbar({
				text: TEST_SAVE_RESULTS['error'],
			});
		} finally {
			setSaveLoading(false);
		}
	};

	const validationMessage = useMemo(() => validateTestSettings(testSettings), [testSettings]);
	const isSaveButtonDisabled = Boolean(validationMessage) || saveLoading;

	return (
		<Stack direction="column" spacing={3}>
			<Tabs
				variant="scrollable"
				scrollButtons
				allowScrollButtonsMobile
				value={visibleTab}
				onChange={handleChangeTab}
			>
				<Tab label="Общие настройки" />
				<Tab label="Список вопросов" />
				{testSettings.common.showResult && <Tab label="Результаты теста" />}
			</Tabs>
			<Stack spacing={1} direction="column">
				<Stack direction="row">
					<Button
						disabled={isSaveButtonDisabled}
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
		</Stack>
	);
};

export default TestConstructor;
