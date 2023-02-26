import TextSnipper from '@mui/icons-material/TextSnippet';
import Add from '@mui/icons-material/Add';
import Info from '@mui/icons-material/Info';

export enum Paths {
	login = '/login',
	tests = '/tests',
	test = '/tests/[id]',
	editTest = '/tests/edit/[id]',
	createTest = '/tests/create',
	testResults = '/tests/[id]/results',
	info = '/info',
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
	[Paths.info]: {
		title: 'Информация',
		path: Paths.info,
		icon: Info,
		label: 'Информация',
	},
};

export const navigationPages = [routes[Paths.tests], routes[Paths.createTest], routes[Paths.info]];
export const navigationPagesNoAuth = [routes[Paths.tests], routes[Paths.info]];
