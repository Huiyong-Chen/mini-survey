import { Outlet } from 'react-router';

export function QuestionLayout() {
  return (
    <>
      <div>QuestionLayout</div>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}
