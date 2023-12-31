import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// Components
import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
