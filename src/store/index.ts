import {
  clearAuthCache,
  getAuthCache,
  getUserInfoCache,
  setAuthCache,
  setUserInfoCache,
} from "@/utils/cache";
import { loginApi, getUserInfoApi } from "@/apis/user";
import { defineStore } from "pinia";

interface mainStoreOptions {
  token: string;
  userInfo: userInfo;
  loginState: boolean;
}

export const useMainStore = defineStore("main", {
  state: (): mainStoreOptions => ({
    token: "",
    userInfo: {},
    loginState: false,
  }),
  getters: {
    getUserInfo() {
      return this.userInfo;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      setAuthCache(token);
    },
    setLoginState(state: boolean) {
      this.loginState = state;
    },
    setUserInfo(userInfo: userInfo) {
      this.userInfo = userInfo;
      setUserInfoCache(userInfo);
    },
    clearToken() {
      this.token = "";
      clearAuthCache();
    },
    async login(code: string) {
      const token = await loginApi(code);
      if(typeof token === 'string'){
        this.setToken(token);
      }else{
        return token.openid;
      }
    },
    async fetchUserInfo() {
      try {
        const userInfo = await getUserInfoApi();
        this.setUserInfo(userInfo);
      } catch (error) {
        this.clearToken();
        throw error;
      }
    },
  },
});
