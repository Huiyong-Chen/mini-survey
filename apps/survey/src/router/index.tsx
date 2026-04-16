import { MainLayout } from '@/layouts/MainLayout';
import { ManageLayout } from '@/layouts/ManageLayout';
import { QuestionLayout } from '@/layouts/QuestionLayout';
import { Home } from '@/pages/home/Home';
import { Login } from '@/pages/login/Login';
import { Register } from '@/pages/login/Register';
import { QuestionList } from '@/pages/mine/QuestionList';
import { StarQuestionList } from '@/pages/mine/StarQuestionList';
import { Trash } from '@/pages/mine/Trash';
import { NotFound } from '@/pages/not-found/NotFound';
import { Edit } from '@/pages/questions/Edit';
import { Stat } from '@/pages/questions/Stat';
import { Children } from 'react';
import { redirect } from 'react-router';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      {
        path: 'manage',
        Component: ManageLayout,
        children: [
          { index: true, loader: () => redirect('/404') },
          {
            path: 'list',
            Component: QuestionList,
          },

          {
            path: 'star',
            Component: StarQuestionList,
          },

          {
            path: 'trash',
            Component: Trash,
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    Component: QuestionLayout,
    children: [
      { index: true, loader: () => redirect('/404') },
      {
        path: 'edit/:id',
        Component: Edit,
      },
      {
        path: 'stat/:id',
        Component: Stat,
      },
    ],
  },

  { path: '/404', Component: NotFound },
  { path: '*', Component: NotFound },
]);
