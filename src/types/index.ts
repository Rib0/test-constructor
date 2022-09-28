export interface Answer {
	id: string;
	text: string;
	weight: string;
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

// TestItem c сервера
export interface TestItem {
	id: string;
	name: string;
	showResult: boolean;
	defaultResult: boolean;
	questions: Question[];
	results: Result[];
	score?: string;
	passesAmount?: string;
}

export interface TestSettingsClient {
	common: {
		name: TestItem['name'];
		showResult: TestItem['showResult'];
		defaultResult: boolean;
	};
	questions: Question[];
	results: Result[];
}
