import '@/utils/fonts';
import '@/styles/index.scss';

import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';

import Layout from '@/components/layout';
import theme from '@/utils/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import initAuth from '@/utils/initAuth';
import { useNprogress } from '@/hooks';
import { AuthProvider } from '@/context/auth-context';
import { SnackbarProvider } from '@/context/snackbar-context';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
initAuth();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
	useNprogress();

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<SnackbarProvider>
						<Layout>
							<CssBaseline />
							<Component {...pageProps} />
						</Layout>
					</SnackbarProvider>
				</AuthProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
