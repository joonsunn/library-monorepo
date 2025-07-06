import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/home/Home';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
