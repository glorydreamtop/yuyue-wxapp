import Taro from "@tarojs/taro";
import { getAuthCache } from "./cache";

interface VHttpRequestOption extends Taro.request.Option {
  responseNative?: boolean;
}

interface httpRes<T = any> {
  msg: string;
  info: T;
  code: number;
}

// const baseURL = "http://localhost:5005";
const baseURL = "http://basequota.cn:5005";

class VHttp {
  private baseURL: string;
  private timeout: number;
  constructor(params?: { baseURL?: string }) {
    this.baseURL = params?.baseURL ?? baseURL;
    this.timeout = 10 * 1000;
  }
  async request<T>({
    url,
    method,
    responseNative,
    data,
  }: VHttpRequestOption): Promise<T> {
    const res = await Taro.request<httpRes<T>>({
      url: `${this.baseURL}${url}`,
      method: method ?? "GET",
      header: {
        "content-type": "application/json",
        authorization: getAuthCache(),
      },
      data,
      timeout: this.timeout,
      dataType: "json",
    });
    if (responseNative) {
      return (res as unknown) as T;
    } else {
      if (res.statusCode === 200) {
        if (res.data.code === 200) {
          return res.data.info;
        } else {
          throw res.data.msg;
        }
      } else {
        throw res.data.msg;
      }
    }
  }
  get<T>(args: VHttpRequestOption) {
    return this.request<T>({
      ...args,
      method: "GET",
    });
  }
  post<T>(args: VHttpRequestOption) {
    return this.request<T>({
      ...args,
      method: "POST",
    });
  }
}

export const defHttp = new VHttp();

export async function uploadApi(filePath: string) {
  const res = await Taro.uploadFile({
    url: `${baseURL}/upload`,
    filePath,
    header: {
      authorization: getAuthCache(),
    },
    name: "file",
  });

  return JSON.parse(res.data).info as string;
}
