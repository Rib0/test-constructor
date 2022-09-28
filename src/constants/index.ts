import TextSnipper from '@mui/icons-material/TextSnippet';
import Add from '@mui/icons-material/Add';
import Info from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

export enum Paths {
	home = '/',
	login = '/login',
	settings = '/settings',
	tests = '/tests',
	test = '/tests/:id',
	editTest = '/tests/edit/:id',
	createTest = '/tests/create',
	info = '/info',
}

export const routes = {
	[Paths.home]: {
		title: 'Конструктор тестов',
		path: Paths.home,
		icon: HomeIcon,
		label: 'Главная',
	},
	[Paths.login]: {
		title: 'Вход',
		path: Paths.login,
	},
	[Paths.settings]: {
		title: 'Настройки',
		path: Paths.settings,
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

export const navigationPages = [
	routes[Paths.home],
	routes[Paths.tests],
	routes[Paths.createTest],
	routes[Paths.info],
];
export const navigationPagesNoAuth = [routes[Paths.home], routes[Paths.tests], routes[Paths.info]];
