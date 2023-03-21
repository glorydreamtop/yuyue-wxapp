import { defHttp } from "@/utils/http";

export async function getUserInfoApi() {
  try {
    const userInfo = await defHttp.get<userInfo>({
      url: "/user/getUserInfo",
    });
    console.log("u", userInfo);

    return userInfo;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

export async function getUserListApi() {
  return defHttp.get<userInfo[]>({
    url: "/user/list",
  });
}

export async function delUserApi(data: Partial<userInfo>) {
  return defHttp.post({
    url: "/user/del",
    data,
  });
}
export async function banUserApi(data: Partial<userInfo>) {
  return defHttp.post({
    url: "/user/status",
    data,
  });
}
