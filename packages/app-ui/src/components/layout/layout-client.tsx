'use client';

// Redux
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
