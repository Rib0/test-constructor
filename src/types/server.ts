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
	description: string;
	imageUrl?: string;
}

export interface TestResultAnswers {
	[key: string]: {
		id: string;
		text: string;
		questionText: string;
	};
}

export interface TestResult {
	id: string;
	testId: string;
	userName: string | null;
	userEmail: string | null;
	testName: string;
	answers: TestResultAnswers;
	date: string;
	testOwnerId: string;
	resultText: string;
	score: number;
}

export enum DbCollections {
	tests = 'tests',
	testsResults = 'testsResults',
}
