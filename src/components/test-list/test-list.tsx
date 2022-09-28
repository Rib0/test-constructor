import React, { useState, useCallback, useMemo, memo } from 'react';
import List from '@mui/material/List';

import { Typography } from '@mui/material';
import TestListItem from '@/components/test-list-item';
import Modal from '@/components/common/modal';

import { TestItem } from '@/types';

interface Props {
	testList: TestItem[];
}

/* TODO:
	2. сделать сортировку вопросов с draggable - Завтра
	14. Мемоизировать все, что нужно
	15. Верхнее меню вынести в бургер даже в десктопе - Завтра
	16. Войти и регистрация как в меню так и на главном экране со списоком тестов
	18. Настроить eslint
	21. Сделать client-side авторизацию
	22. Сделать server-side авторизацию
	23. Pwa
	24. Добавить загрузку изображений к тестам
	25. Добавить сообщения к тестам через firebase
	firestore storage для файлов firebase
	26. посмотреть как работает вход по email
	27. В разделе тесты сделать мои и все сделать сортировку
	28. Сделать страницу настроек
	29. Убрать мигание в header
*/

const TestsList: React.FC<Props> = ({ testList = [] }) => {
	const [testIdToDelete, setTestToDelete] = useState<null | string>(null);
	const [activeTest, setActiveTest] = useState<null | string>(null);

	const handleInitiateDelete = useCallback((id: string) => {
		setTestToDelete(id);
	}, []);

	const handleAcceptDelete = () => {
		// TODO: запрос на удаление из /api testIdToDelete

		// TODO: сделать loading button в диалог

		setTestToDelete(null); // если sucess
	};

	const handleDeclineDelete = () => {
		setTestToDelete(null);
	};

	const handleSelectTest = useCallback((id: string) => {
		setActiveTest(id);
	}, []);

	const handleUnselectTest = useCallback(() => {
		setActiveTest(null);
	}, []);

	const testToDeleteName = useMemo(() => {
		const test = testList.find((t) => t.id === testIdToDelete);
		return test?.name;
	}, [testList, testIdToDelete]);

	return (
		<>
			<List>
				{testList.map((test) => (
					<TestListItem
						key={test.id}
						testItem={test}
						onDelete={handleInitiateDelete}
						onClick={handleSelectTest}
						onUnselect={handleUnselectTest}
						active={activeTest === test.id}
					/>
				))}
			</List>
			<Modal
				visible={Boolean(testIdToDelete)}
				onAccept={handleAcceptDelete}
				acceptButtonText="Удалить"
				onDecline={handleDeclineDelete}
				declineButtonText="Отмена"
			>
				Вы действительно хотите удалить тест&nbsp;
				<Typography fontWeight="bold" component="span">
					&quot;{testToDeleteName}&quot;&nbsp;
				</Typography>
				?
			</Modal>
		</>
	);
};

export default memo(TestsList);
