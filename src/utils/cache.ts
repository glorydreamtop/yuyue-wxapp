import Taro from "@tarojs/taro";

export function setAuthCache(token: string) {
  Taro.setStorageSync("token", token);
}

export function getAuthCache(): string {
  return Taro.getStorageSync("token") ?? "";
}

export function clearAuthCache() {
  Taro.removeStorageSync("token");
  Taro.removeStorageSync("userInfo");
}

export function setUserInfoCache(userInfo: userInfo) {
  let cache = Taro.getStorageSync<userInfo>("userInfo");
  if (cache) {
    Taro.setStorageSync("userInfo", Object.assign(cache, userInfo));
  } else {
    Taro.setStorageSync("userInfo", userInfo);
  }
}

export function getUserInfoCache(): userInfo {
  return Taro.getStorageSync("userInfo");
}

export function clearUserInfoCache() {
  Taro.removeStorageSync("userInfo");
}
