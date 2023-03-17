export const OWNERS_OPTIONS = [
	{
		label: 'Все (кроме приватных)',
		value: 1,
	},
	{
		label: 'Мои (включая приватные)',
		value: 2,
	},
];
export const [{ value: DEFAULT_OWNER_VALUE }] = OWNERS_OPTIONS;

export const SORT_OPTIONS = [
	{
		label: 'С высоким рейтингом',
		value: 1,
	},
	{
		label: 'Больше всего вопросов',
		value: 2,
	},
	{
		label: 'Самые популярные',
		value: 3,
	},
];
export const [{ value: DEFAULT_SORT_VALUE }] = SORT_OPTIONS;

export const TESTS_PER_PAGE = 9;
