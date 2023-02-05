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
	score: number;
	passesAmount: number;
}

export enum DbCollections {
	tests = 'tests',
	testsResults = 'testsResults',
}
