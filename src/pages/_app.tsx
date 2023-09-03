import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// Redux
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
