import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store } from '@/redux';

import { SnackbarProvider } from '@/hooks/useSnackbar';

import MainLayout from '@/ui-kit/component/layout/mainLayout';
import theme from '@/ui-kit/theme/theme';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainLayout>
          <SnackbarProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
}
