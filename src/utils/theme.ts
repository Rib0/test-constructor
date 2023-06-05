import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';

let theme = createTheme({
	palette: {
		mode: 'dark',
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 670,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
});

theme = responsiveFontSizes(theme);

export default theme;
