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
import { createBrowserRouter, redirect } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', Component: Home },
  {
    path: '/',
    Component: MainLayout,
    children: [
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

export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const REGISTER_PATH = '/register';
export const MANAGE_LIST_PATH = '/manage/list';
export const MANAGE_STAR_PATH = '/manage/star';
export const MANAGE_TRASH_PATH = '/manage/trash';
