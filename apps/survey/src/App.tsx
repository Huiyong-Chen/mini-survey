import event, { ERROR_API_ERROR_KEY } from '@/events/event-emitter.mts';
import { router } from '@/router';
import { message } from 'antd';
import { type FC } from 'react';
import { RouterProvider } from 'react-router';
import './app.css';

event.on(ERROR_API_ERROR_KEY, (msg) => {
  message.error(msg);
});
export const App: FC = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
