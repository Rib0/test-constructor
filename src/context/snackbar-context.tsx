import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useState,
	useMemo,
	useCallback,
	useRef,
} from 'react';
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

	const handleChangeOptions = useCallback((options: SnackbarOptions) => {
		setSnackbarOptions((prevOptions) => ({ ...prevOptions, ...options }));
	}, []);

	const defaultOptionsRef = useRef({
		open: true,
		onClose: () => handleChangeOptions({ open: false }),
		action: undefined,
		autoHideDuration: 5000,
	});

	const showSuccessSnackbar = useCallback(
		(options: Omit<SnackbarOptions, 'type' | 'open'>) => {
			handleChangeOptions({
				type: 'success',
				...defaultOptionsRef.current,
				...options,
			});
		},
		[defaultOptionsRef.current]
	);

	const showErrorSnackbar = useCallback(
		(options: Omit<SnackbarOptions, 'type' | 'open'>) => {
			handleChangeOptions({
				type: 'error',
				...defaultOptionsRef.current,
				...options,
			});
		},
		[defaultOptionsRef.current]
	);

	const value = useMemo(
		() => ({
			handleChange: handleChangeOptions,
			showSuccessSnackbar,
			showErrorSnackbar,
		}),
		[handleChangeOptions, showSuccessSnackbar, showErrorSnackbar]
	);

	const { text, type = 'success', ...restOptions } = snackbarOptions;

	return (
		<SnackbarContext.Provider value={value}>
			<Snackbar type={type} {...restOptions}>
				{text}
			</Snackbar>
			{children}
		</SnackbarContext.Provider>
	);
};

export { SnackbarProvider, useSnackbarContext };
