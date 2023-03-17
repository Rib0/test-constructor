import React, { PropsWithChildren, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Select from '@/components/common/select';
import { useAuthContext } from '@/context/auth-context';
import { OWNERS_OPTIONS, DEFAULT_OWNER_VALUE, SORT_OPTIONS, DEFAULT_SORT_VALUE } from './constants';
import type { GetTestsDataFType } from '@/lib/front/tests';

import styles from './styles.module.scss';

interface Props {
	onRequest: GetTestsDataFType<void>;
	canShowMore: boolean;
	loading: boolean;
	lastTestId?: string;
}

const TestListFilters: React.FC<PropsWithChildren<Props>> = ({
	onRequest,
	canShowMore,
	loading,
	lastTestId,
	children,
}) => {
	const auth = useAuthContext();
	const [owner, setOwner] = useState<number>(DEFAULT_OWNER_VALUE);
	const [sortValue, setSortValue] = useState<number>(DEFAULT_SORT_VALUE);
	const [name, setName] = useState('');
	const prevRequestSnapshot = useRef({
		name: '',
		owner: DEFAULT_OWNER_VALUE,
		sortValue: DEFAULT_SORT_VALUE,
	});

	const handleFindTests = () => {
		try {
			onRequest(name, owner, sortValue, auth?.id as string | undefined);
			prevRequestSnapshot.current = { name, owner, sortValue };
		} catch (e) {}
	};

	const handleChangeOwner = (value: number) => {
		setOwner(value);
	};

	const handleChangeSortValue = (value: number) => {
		setSortValue(value);
	};

	const handleChangeName: TextFieldProps['onChange'] = (e) => {
		setName(e.target.value);
	};

	const handleShowMoreClick = () => {
		const { name, owner, sortValue } = prevRequestSnapshot.current;
		try {
			onRequest(name, owner, sortValue, auth?.id as string | undefined, lastTestId);
		} catch (e) {}
	};

	const ownersOptions = auth?.id ? OWNERS_OPTIONS : [OWNERS_OPTIONS[0]];

	return (
		<Stack spacing={2}>
			<Stack spacing={2}>
				<Stack direction="row" spacing={2} alignItems="stretch">
					<Button
						disabled={loading}
						onClick={handleFindTests}
						variant="contained"
						startIcon={<SearchIcon />}
					>
						Найти
					</Button>
					<Select
						className={styles.ownerSelect}
						onChange={handleChangeOwner}
						value={owner}
						label="Тесты"
						options={ownersOptions}
					/>
					<Select
						className={styles.sortSelect}
						onChange={handleChangeSortValue}
						value={sortValue}
						label="Показать сначала:"
						options={SORT_OPTIONS}
					/>
				</Stack>
				<TextField
					fullWidth
					onChange={handleChangeName}
					value={name}
					label="Поиск по названию"
					inputProps={{
						maxLength: 60,
					}}
				/>
			</Stack>
			{children}
			{canShowMore && (
				<div className={styles.actions}>
					<Button
						disabled={loading}
						variant="contained"
						startIcon={<ExpandMoreIcon />}
						onClick={handleShowMoreClick}
					>
						Показать еще
					</Button>
				</div>
			)}
		</Stack>
	);
};

export default TestListFilters;
