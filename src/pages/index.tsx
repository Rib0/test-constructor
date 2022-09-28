import 'firebase/firestore';
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { withAuthUser } from 'next-firebase-auth';
import type { NextPage } from 'next';

import Typography from '@mui/material/Typography';

import Link from '@/components/common/link';
import { Paths } from '@/constants';
import { firebaseApp } from '@/firebase/clientApp';
import initAuth from '@/utils/initAuth';

//TODO: сделать адаптивный размер шрифта и стилизовать через theme заголовки в typography
//TODO: при введении url тестов без логина редиректить на страницу логина

initAuth();

const Home: NextPage = () => {
	const [value, loading, error] = useDocument(
		doc(getFirestore(firebaseApp), 'users', 'S0vWW8SoyLj460DTDJT3'),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	return (
		<div>
			<Typography variant="body1">
				Вы зашли в конструктор для тестов, здесь вы можете создать свой аккаунт и прикрепить
				к нему тесты, которые пожелаете, с любым количеством вопросов и различными
				вариантами ответов. Подробнее о том как создавать тесты и что с ними делать можно
				почитать на странице
				<Link type="link" disableGutters href={Paths.info}>
					Информация
				</Link>
				. Также можно зарегистрироваться
				<Link type="link" disableGutters href={Paths.login}>
					Вход
				</Link>
				и сразу приступить к созданию тестов.
			</Typography>
		</div>
	);
};

export default withAuthUser<{}>({})(Home);
