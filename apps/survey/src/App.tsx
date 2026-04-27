import event, { ERROR_API_ERROR_KEY } from '@/events/event-emitter.mts';
import { router } from '@/router';
import { message } from 'antd';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import './app.css';
import { GlobalLoading } from './components/GlobalLoading';

export function App() {
  useEffect(() => {
    const handleEmitMessage = (msg: string) => {
      message.error(msg);
    };
    event.on(ERROR_API_ERROR_KEY, handleEmitMessage);
    return () => {
      event.off(ERROR_API_ERROR_KEY, handleEmitMessage);
    };
  }, []);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <GlobalLoading />
    </>
  );
}
