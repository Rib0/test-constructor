import TextSnipper from '@mui/icons-material/TextSnippet';
import Add from '@mui/icons-material/Add';

export enum Paths {
	login = '/login',
	tests = '/tests',
	test = '/tests/[id]',
	editTest = '/tests/edit/[id]',
	createTest = '/tests/create',
	testResults = '/tests/[id]/results',
}

export const routes = {
	[Paths.login]: {
		title: 'Вход',
		path: Paths.login,
	},
	[Paths.tests]: {
		title: 'Тесты',
		path: Paths.tests,
		icon: TextSnipper,
		label: 'Тесты',
	},
	[Paths.editTest]: {
		title: 'Редактирование теста',
		path: Paths.editTest,
	},
	[Paths.createTest]: {
		title: 'Создание теста',
		path: Paths.createTest,
		icon: Add,
		label: 'Создать тест',
	},
};

export const navigationPages = [routes[Paths.tests], routes[Paths.createTest]];
export const navigationPagesNoAuth = [routes[Paths.tests]];
