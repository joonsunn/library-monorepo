import { ModeToggle } from '@/components/theme/mode-toggle';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <>
      <header>
        <ModeToggle />
      </header>
      <Outlet />
    </>
  );
}

export default MainLayout;
