import { useEffect, useState, type FC } from 'react';

export const App: FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  return (
    <>
      <div>hello react</div>
      <p>{count}</p>
    </>
  );
};
