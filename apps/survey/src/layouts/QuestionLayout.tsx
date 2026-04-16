import type { FC } from 'react';
import { Outlet } from 'react-router';

export const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout</div>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};
