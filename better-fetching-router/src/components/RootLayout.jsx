import { Outlet } from 'react-router-dom';
import MainNavigation from './MainNavigation';

function RootLayout({ children }) {
  return (
    <>
      <MainNavigation />
      <main><Outlet/></main>
    </>
  );
}

export default RootLayout;
