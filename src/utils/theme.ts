import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';

let theme = createTheme({
	palette: {
		mode: 'dark',
	},
});
theme = responsiveFontSizes(theme);

export default theme;
