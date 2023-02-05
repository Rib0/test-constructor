import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import Snackbar, { Props } from '@/components/common/snackbar';

interface SnackbarOptions extends Partial<Props> {
	text?: string;
}

interface SnackbarValue {
	handleChange: (options: SnackbarOptions) => void;
	showSuccessSnackbar: (options: Omit<SnackbarOptions, 'type' | 'open'>) => void;
	showErrorSnackbar: (options: Omit<SnackbarOptions, 'type' | 'open'>) => void;
}

const SnackbarContext = createContext<SnackbarValue>({
	handleChange: () => {},
	showSuccessSnackbar: () => {},
	showErrorSnackbar: () => {},
});
const useSnackbarContext = () => useContext(SnackbarContext);

const SnackbarProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [snackbarOptions, setSnackbarOptions] = useState<SnackbarOptions>({});

	const handleChangeOptions = (options: SnackbarOptions) => {
		setSnackbarOptions((prevOptions) => ({ ...prevOptions, ...options }));
	};

	const defaultOptions = {
		open: true,
		onClose: () => handleChangeOptions({ open: false }),
		action: undefined,
		autoHideDuration: 1000,
	};

	const showSuccessSnackbar = (options: Omit<SnackbarOptions, 'type' | 'open'>) => {
		handleChangeOptions({
			type: 'success',
			...defaultOptions,
			...options,
		});
	};

	const showErrorSnackbar = (options: Omit<SnackbarOptions, 'type' | 'open'>) => {
		handleChangeOptions({
			type: 'error',
			...defaultOptions,
			...options,
		});
	};

	const { text, type = 'success', ...restOptions } = snackbarOptions;

	return (
		<SnackbarContext.Provider
			value={{ handleChange: handleChangeOptions, showSuccessSnackbar, showErrorSnackbar }}
		>
			<Snackbar type={type} {...restOptions}>
				{text}
			</Snackbar>
			{children}
		</SnackbarContext.Provider>
	);
};

export { SnackbarProvider, useSnackbarContext };
