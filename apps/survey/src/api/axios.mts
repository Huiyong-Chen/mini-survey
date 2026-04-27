import event from '@/events/event-emitter.mts';
import axios, { type AxiosRequestConfig, type HeadersDefaults } from 'axios';

export interface ResData<T extends object | undefined> {
  code: number;
  data?: T;
  msg?: string;
}

// 移除对象的可选属性
type RemoveOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

const instance = axios.create({ timeout: 10 * 1000 });

// 为每一个请求添加loading
instance.interceptors.request.use((config) => {
  event.emit('LOADING_START');
  return config;
});

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
instance.interceptors.response.use((res) => {
  event.emit('LOADING_END');
  return res;
});

type RequestMethod = keyof Omit<RemoveOptional<HeadersDefaults>, 'common'>;

const NEED_DATA_METHOD: RequestMethod[] = ['post', 'put', 'patch'] as const;

async function _request<Res extends object | undefined, Req extends object>(
  url: string,
  method: RequestMethod = 'get',
  data?: Req,
  config?: AxiosRequestConfig<Req>,
) {
  if (NEED_DATA_METHOD.includes(method)) {
    const res = await instance[method]<ResData<Res>>(url, data, config);
    return res.data.data;
  }
  const res = await instance[method]<ResData<Res>>(url, config);
  return res.data.data;
}

export async function get<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'get', undefined, config);
}

export async function c_delete<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'delete', undefined, config);
}

export async function head<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'head', undefined, config);
}

export async function post<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, data?: Req, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'post', data, config);
}

export async function put<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, data?: Req, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'put', data, config);
}

export async function patch<
  Res extends object | undefined = Record<string, unknown>,
  Req extends object = Record<string, unknown>,
>(url: string, data?: Req, config?: AxiosRequestConfig<Req>): Promise<Res | undefined> {
  return _request<Res, Req>(url, 'patch', data, config);
}
