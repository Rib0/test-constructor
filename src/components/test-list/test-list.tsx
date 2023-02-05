import React, { useState, useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import TestListItem from '@/components/test-list-item';
import Modal from '@/components/common/modal';

import { removeDocument } from '@/lib/front';
import { useSnackbarContext } from '@/context/snackbar-context';
import { DbCollections, TestItem } from '@/types/server';

import styles from './styles.module.scss';

interface Props {
	testList: TestItem[];
}

/* TODO:
	2. сделать сортировку вопросов с draggable, перед этим проверить, что вопросы отправляются в том же порядке
	14. Мемоизировать все, что нужно
	23. Pwa
	24. Добавить загрузку изображений к тестам
	firestore storage для файлов firebase
	28. Сделать страницу настроек
	31. Защитить свои данные, когда буду катить в прод https://firebase.google.com/docs/firestore/security/overview?hl=ru

	16. Войти и регистрация как в меню так и на главном экране со списоком тестов
	26. посмотреть как работает вход по email
	30. Добавить пагинацию для тестов
	32. Вычислять результат при прохождении, если надо
	27. В разделе тесты сделать мои и все сделать сортировку
	35. Обработать вывод на экране тестов если пока нет тестов
*/

const TestsList: React.FC<Props> = ({ testList = [] }) => {
	const snackbarContext = useSnackbarContext();
	const [tests, setTests] = useState(testList);
	const [testIdToDelete, setTestToDelete] = useState<null | string>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleInitiateDelete = useCallback((id: string) => {
		setTestToDelete(id);
	}, []);

	const handleAcceptDelete = async () => {
		setDeleteLoading(true);
		try {
			await removeDocument(DbCollections.tests, testIdToDelete!);
			snackbarContext.showSuccessSnackbar({
				text: 'Тест успешно удален',
			});
			setTests((prevTests) => prevTests.filter((test) => test.id !== testIdToDelete));
		} catch (e) {
			snackbarContext.showErrorSnackbar({
				text: 'Проиошла ошибка во время удаления теста, попробуйте еще раз',
			});
		} finally {
			setDeleteLoading(false);
			setTestToDelete(null);
		}
	};

	const handleDeclineDelete = () => {
		setTestToDelete(null);
	};

	const testToDeleteName = useMemo(() => {
		const test = tests.find((t) => t.id === testIdToDelete);
		return test?.name;
	}, [tests, testIdToDelete]);

	return (
		<div className={styles.testList}>
			<Stack direction="row" flexWrap="wrap">
				{tests.map((test) => (
					<TestListItem key={test.id} testItem={test} onDelete={handleInitiateDelete} />
				))}
			</Stack>
			<Modal
				visible={Boolean(testIdToDelete)}
				onAccept={handleAcceptDelete}
				acceptButtonText="Удалить"
				onDecline={handleDeclineDelete}
				declineButtonText="Отмена"
				acceptButtonDisabled={deleteLoading}
			>
				Вы действительно хотите удалить тест&nbsp;
				<Typography fontWeight="bold" component="span">
					&quot;{testToDeleteName}&quot;&nbsp;
				</Typography>
				?
			</Modal>
		</div>
	);
};

export default TestsList;
