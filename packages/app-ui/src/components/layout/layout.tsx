// Components
import LayoutClient from './layout-client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[400px] h-[600px]">
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}
