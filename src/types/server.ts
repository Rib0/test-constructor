export interface Answer {
	id: string;
	text: string;
	weight: number;
	targetResult: string;
}

export interface Question {
	id: string;
	text: string;
	answers: Answer[];
}

export interface Result {
	id: string;
	text: string;
}

export interface TestItem {
	id: string;
	userId: string;
	name: string;
	showResult: boolean;
	defaultResult: boolean;
	isPrivate: boolean;
	questions: Question[];
	results: Result[];
	scoreAmount: number;
	scoreSum: number;
	passesAmount: number;
}

export interface TestResult {
	id: string;
	userName?: string | null;
	userEmail?: string | null;
	testName: string;
	answers: Record<string, string>;
	date: string;
}

export enum DbCollections {
	tests = 'tests',
	testsResults = 'testsResults',
}
