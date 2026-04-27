import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import style from './load-more.module.scss';

interface LoadMoreProps {
  onLoad?: () => void;
  children?: ReactNode;
}

export const LoadMore = memo(
  ({ onLoad, children }: LoadMoreProps) => {
    const [visible, setVisible] = useState<boolean>(true);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio > 0) {
          setVisible(true);

          if (onLoad) {
            onLoad();
          }
        } else {
          setVisible(false);
        }
      });
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.disconnect();
      };
    }, [onLoad]);
    return (
      <div
        ref={ref}
        className={style.container}
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    );
  },
  // (prevProps, nextProps) => {
  //   return prevProps.loading === nextProps.loading;
  // },
);
