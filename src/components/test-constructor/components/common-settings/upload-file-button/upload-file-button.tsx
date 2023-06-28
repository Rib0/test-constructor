import React, { useState, memo } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

import { storage } from '@/utils/firebase';

import styles from './styles.module.scss';
import { useSnackbarContext } from '@/context/snackbar-context';

interface Props {
	imageUrl?: string;
	onImageUpload: (url: string) => void;
}

const STORAGE_FOLDER_URL = 'files';

const UploadFileButton: React.FC<Props> = ({ imageUrl, onImageUpload }) => {
	const snackbarContext = useSnackbarContext();

	const [progressValue, setProgressValue] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const {
			target: { files },
		} = e;

		if (!files || !files[0]) {
			return;
		}

		const [file] = files;
		const storageRef = ref(storage, `${STORAGE_FOLDER_URL}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		setLoading(true);
		setProgressValue(0);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgressValue(progress);
			},
			() => {
				snackbarContext.showErrorSnackbar({
					text: 'Ошибка загрузки превью',
				});
				setLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					onImageUpload(downloadURL);
					setLoading(false);
				});
			}
		);
	};

	const getImageUrl = () => {
		const decodedUrl = decodeURIComponent(imageUrl!);
		const [url] = decodedUrl.match(/files\/.+\.png|jpg|jpeg/i) || [];

		return url;
	};

	const handleDeleteImage = async () => {
		const storageRef = ref(storage, getImageUrl());

		setLoading(true);

		try {
			await deleteObject(storageRef);
			onImageUpload('');
		} catch (e) {
			snackbarContext.showErrorSnackbar({
				text: 'Ошибка удаления превью',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack spacing={2}>
			<Stack spacing={2} direction="row">
				<label htmlFor="upload-file">
					<Button
						disabled={loading}
						variant="contained"
						startIcon={<UploadFileIcon />}
						component="span"
					>
						Изменить превью
					</Button>
				</label>
				{imageUrl && (
					<Button
						disabled={loading}
						onClick={handleDeleteImage}
						variant="contained"
						startIcon={<ClearIcon />}
						component="span"
					>
						Удалить превью
					</Button>
				)}
				<input
					accept=".png, .jpg, .jpeg"
					id="upload-file"
					type="file"
					onChange={handleChage}
					className={styles.input}
				/>
			</Stack>
			<div className={styles.imageContainer}>
				{loading && <CircularProgress variant="determinate" value={progressValue} />}
				{imageUrl && !loading && (
					<img src={imageUrl} alt="test preview" className={styles.image} />
				)}
			</div>
		</Stack>
	);
};

export default memo(UploadFileButton);
