import { TestItem, Question, Result } from './server';

export interface TestSettingsClient {
	id?: string;
	userId?: string;
	common: {
		name: TestItem['name'];
		showResult: TestItem['showResult'];
		defaultResult: boolean;
		isPrivate: boolean;
	};
	questions: Question[];
	results: Result[];
	score: number;
	passesAmount: number;
}

export type ConditionType = [string, '==' | '>' | '<' | '>=' | '<=', string | number | boolean];
