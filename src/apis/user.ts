import { defHttp } from "@/utils/http";

export async function getUserInfoApi() {
  const userInfo = await defHttp.get<userInfo>({
    url: "/user/getUserInfo",
  });
  return userInfo;
}

export async function addUserInfoApi(userInfo: userInfo) {
  return defHttp.post<userInfo>({
    url: "/user/addUserInfo",
    data: userInfo,
  });
}

export async function updateUserInfoApi(userInfo: userInfo) {
  return defHttp.post<userInfo>({
    url: "/user/updateUserInfo",
    data: userInfo,
  });
}

export async function decryptWxUserInfo(
  userInfo: Taro.getUserProfile.SuccessCallbackResult
) {
  return defHttp.post<userInfo>({
    url: "/user/decryptWxUserInfo",
    data: userInfo,
  });
}

export async function loginApi(code: string) {
  const token = await defHttp.get<string>({
    url: "/user/login",
    data: {
      code,
    },
  });
  return token;
}
