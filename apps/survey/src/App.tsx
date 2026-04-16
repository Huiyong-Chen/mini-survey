import { router } from '@/router';
import { type FC } from 'react';
import { RouterProvider } from 'react-router';
import './app.css';

export const App: FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
