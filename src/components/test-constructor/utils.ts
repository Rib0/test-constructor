import { TestSettingsClient, TestItem } from '@/types';

export type HandleChange = (
	name: keyof TestSettingsClient,
	value: TestSettingsClient[keyof TestSettingsClient]
) => void;
export type HandleChangeCommon = (
	name: keyof TestSettingsClient['common'],
	value: TestSettingsClient['common'][keyof TestSettingsClient['common']]
) => void;

export const DEFAULT_CLIENT_SETTINGS: TestSettingsClient = {
	common: {
		name: '',
		showResult: false,
		defaultResult: false,
	},
	questions: [],
	results: [],
};

export const mapServerTestSettingsData = (testItem?: TestItem): TestSettingsClient => {
	if (!testItem) {
		return DEFAULT_CLIENT_SETTINGS;
	}

	const { name, showResult, defaultResult, ...props } = testItem;

	return {
		common: {
			name,
			showResult,
			defaultResult,
		},
		...props,
	};
};

export const TEST_SAVE_RESULTS = {
	success: 'Тест успешно сохранен, вы можете скопировать ссылку на тест',
	error: 'Ошибка во время сохранения теста. Попробуйте еще раз',
};

export const validateTestSettings = (testSettings: TestSettingsClient) => {
	const { common, questions, results } = testSettings;

	if (!common.name) {
		return 'Ввведите название теста';
	}

	if (!questions.length) {
		return 'Добавьте хотя бы один вопрос';
	}

	if (questions.some((question) => !question.answers.length)) {
		return 'К каждому вопросу добавьте хотя бы один вариант ответа';
	}

	if (common.showResult && !results.length) {
		return 'Добавьте хотя бы один результат теста';
	}

	if (
		common.showResult &&
		questions.some((question) => question.answers.some((answer) => !answer.targetResult))
	) {
		return 'Укажите "Результат" для каждого варианта ответа во всех вопросах';
	}
};
