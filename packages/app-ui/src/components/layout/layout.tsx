import Head from 'next/head';
// Components
import LayoutClient from './layout-client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutClient>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_APP_DESCRIPTION}
        />
      </Head>
      {children}
    </LayoutClient>
  );
}
