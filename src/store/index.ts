import {
    clearAuthCache,
  getAuthCache,
  getUserInfoCache,
  setAuthCache,
  setUserInfoCache,
} from "@/utils/cache";
import {loginApi,getUserInfoApi} from '@/apis/user'
import { defineStore } from "pinia";

interface mainStoreOptions {
  token: string;
  userInfo: userInfo;
  loginState:boolean;
}

export const useMainStore = defineStore("main", {
  state: ():mainStoreOptions => {
    return {
      token: getAuthCache() ?? "",
      userInfo: getUserInfoCache() ?? {},
      loginState:false
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      setAuthCache(token);
    },
    setLoginState(state:boolean){
      this.loginState = state;
    },
    setUserInfo(userInfo: userInfo) {
      Object.assign(this.userInfo, userInfo);
      setUserInfoCache(userInfo);
    },
    clearToken(){
        this.token = '';
        clearAuthCache()
    },
    async login(code:string){
        const token = await loginApi(code);
        this.setToken(token)
    },
    async fetchUserInfo(){
        const userInfo = await getUserInfoApi();
        this.setUserInfo(userInfo)
    },
  },
});
