// Components
import LayoutClient from './layout-client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[600px] w-[375px]">
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}
