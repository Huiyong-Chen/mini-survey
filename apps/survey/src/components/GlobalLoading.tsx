import eventEmitter from '@/events/event-emitter.mts';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './global-loading.module.scss';

export function GlobalLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    eventEmitter.on('LOADING_START', start);
    eventEmitter.on('LOADING_END', end);
    return () => {
      eventEmitter.off('LOADING_START', start);
      eventEmitter.off('LOADING_END', end);
    };
  }, []);

  if (!loading) {
    return null;
  }
  return createPortal(
    <div className={style['loading-mask']}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>,
    document.body,
  );
}
