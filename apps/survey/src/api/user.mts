import { get, post } from './axios.mts';

export interface UserInfo {
  username: string;
  nickname: string;
}

// export interface

export async function register(username: string, password: string, nickname?: string) {
  const url = `/api/user/register`;
  return await post<undefined>(url, {
    username,
    password,
    nickname: nickname ?? username,
  });
}

export async function login(username: string, password: string) {
  const url = `/api/user/login`;
  return await post<{ token: string }>(url, {
    username,
    password,
  });
}

export async function getUserInfo() {
  const url = `/api/user/info`;
  return await get<UserInfo>(url);
}
