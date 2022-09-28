import { TestItem } from '@/types';

const firstResultId = Math.random().toString();
const secondResultId = Math.random().toString();

export default Array.from(
	{ length: 5 },
	(item, index): TestItem => ({
		id: Math.random().toString(),
		name: `Название теста ${index}`,
		showResult: true,
		defaultResult: false,
		passesAmount: '17',
		score: '4.3',
		questions: [
			{
				id: '1',
				text: 'Какое твое любимое блюдо?',
				answers: [
					{
						id: '1',
						text: 'Макароны',
						weight: '1',
						targetResult: firstResultId,
					},
					{
						id: '2',
						text: 'Рис',
						weight: '2',
						targetResult: secondResultId,
					},
				],
			},
			{
				id: '2',
				text: 'Какое твое любимое животное?',
				answers: [
					{
						id: '1',
						text: 'Кошка',
						weight: '3',
						targetResult: secondResultId,
					},
					{
						id: '2',
						text: 'Собака',
						weight: '1',
						targetResult: firstResultId,
					},
				],
			},
		],
		results: [
			{ id: firstResultId, text: 'Вы прошли тест с результатом ahahahahhahah' }, // TODO: сделать ограничение ширины селектов с результатами
			{ id: secondResultId, text: 'Вы прошли тест с результатом pfpfpfpfpffpfpfp' },
		],
	})
);
