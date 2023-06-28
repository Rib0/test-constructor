import { TestItem, Question, Result } from './server';

export interface TestSettingsClient {
	id?: string;
	userId?: string;
	common: {
		name: TestItem['name'];
		description: TestItem['description'];
		showResult: TestItem['showResult'];
		defaultResult: boolean;
		isPrivate: boolean;
		imageUrl: TestItem['imageUrl'];
	};
	questions: Question[];
	results: Result[];
	scoreAmount: number;
	scoreSum: number;
	passesAmount: number;
}
