import event from '@/events/event-emitter.mts';
import axios, { type AxiosRequestConfig, type HeadersDefaults } from 'axios';

export interface ResData<T extends Record<string, unknown>> {
  code: number;
  data?: T;
  msg?: string;
}

// 移除对象的可选属性
type RemoveOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

const instance = axios.create({ timeout: 10 * 1000 });

instance.interceptors.response.use((res) => {
  const { code, msg } = res.data as ResData<Record<string, unknown>>;
  if (code !== 0) {
    if (msg) {
      event.emit('API:ERROR', msg);
    }
    throw new Error(msg);
  }
  return res;
});

type RequestMethod = keyof Omit<RemoveOptional<HeadersDefaults>, 'common'>;

const NEED_DATA_METHOD: RequestMethod[] = ['post', 'put', 'patch'] as const;

async function _request<Res extends Record<string, unknown>, Req extends Record<string, unknown>>(
  url: string,
  method: RequestMethod = 'get',
  data?: Req,
  config?: AxiosRequestConfig<Res>,
) {
  if (NEED_DATA_METHOD.includes(method)) {
    const res = await instance[method]<ResData<Res>>(url, data, config);
    return res.data.data;
  }
  const res = await instance[method]<ResData<Res>>(url, config);
  return res.data.data;
}

export async function get<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'get', undefined, config);
}

export async function c_delete<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'delete', undefined, config);
}

export async function head<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'head', undefined, config);
}

export async function post<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, data: Req, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'post', data, config);
}

export async function put<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, data: Req, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'put', data, config);
}

export async function patch<
  Res extends Record<string, unknown> = Record<string, unknown>,
  Req extends Record<string, unknown> = Record<string, unknown>,
>(url: string, data: Req, config?: AxiosRequestConfig<Res>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'patch', data, config);
}
