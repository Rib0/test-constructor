import React, { useState, useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TestListFilters from '@/components/test-list-filters';
import TestListItem from '@/components/test-list-item';
import Modal from '@/components/common/modal';

import { removeDocument } from '@/lib/front';
import { GetTestsDataFType, getTestsDataWithFilters } from '@/lib/front/tests';
import { useSnackbarContext } from '@/context/snackbar-context';
import { DbCollections, TestItem } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testList: TestItem[];
	testsCount: number;
}

/* TODO:
	1. Pwa
	2. Защитить свои данные, когда буду катить в прод https://firebase.google.com/docs/firestore/security/overview?hl=ru
	3. сделать сортировку вопросов с draggable, перед этим проверить, что вопросы отправляются в том же порядке
	4. Добавить загрузку изображений к тестам
	5. Войти и регистрация как в меню так и на главном экране со списоком тестов
	6. Добавить страницу информации
	firestore storage для файлов firebase
	https://nextjs.org/docs/api-reference/next/image#remote-patterns
	https://firebase.google.com/docs/firestore/solutions/role-based-access?hl=ru

	14. Мемоизировать все, что нужно
	15. Проверить все страницы на next-firebase-auth
	26. посмотреть как работает вход по email
	38. СДелать админку для просмотра результатов теста
	42. Сделать карточки тестов одной высоты
	15. При выводе результатов с количеством правильных вопросов изменять окончание
	Не обновлять prevRequestSnapshot, если запрос на тесты был неудачен
*/

const TestsList: React.FC<Props> = ({ testList = [], testsCount }) => {
	const snackbarContext = useSnackbarContext();
	const [loading, setLoading] = useState(false);
	const [tests, setTests] = useState(testList);
	const [testIdToDelete, setTestToDelete] = useState<null | string>(null);

	const handleRequestTests: GetTestsDataFType<void> = async (
		name,
		ownerType,
		sortType,
		userId,
		lastTest
	) => {
		setLoading(true);
		try {
			const result = await getTestsDataWithFilters(
				name,
				ownerType,
				sortType,
				userId,
				lastTest
			);
			setTests(lastTest ? tests.concat(result) : result);
		} catch (e) {
			snackbarContext.showErrorSnackbar({
				text: 'Произошла ошибка во время загрузки тестов, попробуйте еще раз',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleInitiateDelete = useCallback((id: string) => {
		setTestToDelete(id);
	}, []);

	const handleDeclineDelete = () => {
		setTestToDelete(null);
	};

	const testToDeleteName = useMemo(() => {
		const test = tests.find((t) => t.id === testIdToDelete);
		return test?.name;
	}, [tests, testIdToDelete]);

	const handleAcceptDelete = async () => {
		setLoading(true);
		try {
			await removeDocument(DbCollections.tests, testIdToDelete!);
			await removeDocument(DbCollections.testsResults, testIdToDelete!);
			snackbarContext.showSuccessSnackbar({
				text: 'Тест успешно удален',
			});
			setTests((prevTests) => prevTests.filter((test) => test.id !== testIdToDelete));
		} catch (e) {
			console.log(e);
			snackbarContext.showErrorSnackbar({
				text: 'Проиошла ошибка во время удаления теста, попробуйте еще раз',
			});
		} finally {
			setLoading(false);
			setTestToDelete(null);
		}
	};

	const canShowMore = tests.length > 0 && tests.length < testsCount;
	const lastTestId = tests.at(-1)?.id;

	return (
		<Stack spacing={4}>
			<TestListFilters
				onRequest={handleRequestTests}
				canShowMore={canShowMore}
				loading={loading}
				lastTestId={lastTestId}
			>
				<div>
					{tests.length > 0 ? (
						<Stack direction="row" flexWrap="wrap" className={styles.testList}>
							{tests.map((test) => (
								<TestListItem
									key={test.id}
									testItem={test}
									onDelete={handleInitiateDelete}
								/>
							))}
						</Stack>
					) : (
						'Тесты не найдены'
					)}
				</div>
			</TestListFilters>
			<Modal
				visible={Boolean(testIdToDelete)}
				onAccept={handleAcceptDelete}
				acceptButtonText="Удалить"
				onDecline={handleDeclineDelete}
				declineButtonText="Отмена"
				acceptButtonDisabled={loading}
			>
				Вы действительно хотите удалить тест&nbsp;
				<Typography fontWeight="bold" component="span">
					&quot;{testToDeleteName}&quot;&nbsp;
				</Typography>
				?
			</Modal>
		</Stack>
	);
};

export default TestsList;
