import { TestSettingsClient } from '@/types/client';
import { TestItem } from '@/types/server';

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
		description: '',
		showResult: false,
		defaultResult: false,
		isPrivate: false,
	},
	questions: [],
	results: [],
	scoreAmount: 0,
	scoreSum: 0,
	passesAmount: 0,
};

export const mapTestSettingsToClientData = (testItem?: TestItem): TestSettingsClient => {
	if (!testItem) {
		return DEFAULT_CLIENT_SETTINGS;
	}

	const { name, description, showResult, defaultResult, isPrivate, ...rest } = testItem;

	return {
		common: {
			name,
			description,
			showResult,
			defaultResult,
			isPrivate,
		},
		...rest,
	};
};

export const mapTestSettingsToServerData = (testSettings: TestSettingsClient) => {
	const { common, ...rest } = testSettings;

	return {
		...common,
		...rest,
		questionsAmount: rest.questions.length,
	};
};

export const TEST_SAVE_RESULTS = {
	success: 'Тест успешно сохранен, вы можете скопировать ссылку на тест',
	error: 'Ошибка во время сохранения теста. Попробуйте еще раз',
};

export const validateTestSettings = (testSettings: TestSettingsClient) => {
	const { common, questions, results } = testSettings;

	if (
		common.showResult &&
		questions.some((question) =>
			question.answers.some(
				(answer) =>
					!answer.targetResult ||
					!results.find((result) => result.id === answer.targetResult)
			)
		)
	) {
		return 'Укажите "Результат" для каждого варианта ответа во всех вопросах';
	}

	if (!common.name) {
		return 'Ввведите название теста';
	}

	if (!questions.length) {
		return 'Добавьте хотя бы один вопрос';
	}

	if (questions.some((question) => question.answers.length < 2)) {
		return 'К каждому вопросу добавьте хотя бы два варианта ответа';
	}

	if (common.showResult && !results.length) {
		return 'Добавьте хотя бы один результат теста';
	}
};
