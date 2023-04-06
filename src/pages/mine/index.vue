<template>
  <view class="h-100vh w-full bg-[#f6f6f6]">
    <view class="mine-bg-pic w-full h-260px">
      <view
        class="flex items-center gap-6 p-4 absolute z-9 top-10 h-full left-0 w-full"
      >
        <image :src="userInfo.avatar" class="w-25 h-25 rounded-1"></image>
        <view v-if="loginState" class="text-light-900 flex gap-2 flex-col">
          <view class="text-3xl font-bold">{{ userInfo.name }}</view>
          <view class="flex gap-4">
            <text>{{ userInfo.age }}岁</text>
          </view>
        </view>
        <view class="text-3xl text-white" @tap="register" v-else>
          注册/登录
        </view>
      </view>
    </view>
    <view class="w-full p-4 pl-6 bg-white mt-4" @tap="toOrder">
      预约记录
    </view>
    <view class="w-full p-4 pl-6 bg-white mt-2" @tap="toAdmin">
      管理员功能
    </view>
    <view class="w-full p-4 pl-6 bg-white text-red-600 mt-2" @tap="clear">
      退出登录
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro, { eventCenter, getCurrentInstance } from "@tarojs/taro";
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/store/index";

const mainStore = useMainStore();
const loginState = computed(() => {
  return mainStore.loginState;
});
const userInfo = computed(() => {
  return mainStore.getUserInfo;
});

onMounted(async () => {
  // try {
  //   const { code } = await Taro.login();
  //   await mainStore.login(code);
  //   await mainStore.fetchUserInfo();
  //   mainStore.loginState = true;
  // } catch (error) {
  //   if (error === "no user") mainStore.loginState = false;
  // }
});

async function register() {
  const { code } = await Taro.login();
  const openid = await mainStore.login(code);
  if (openid === undefined) {
    await mainStore.fetchUserInfo();
    mainStore.loginState = true;
  } else {
    Taro.navigateTo({
      url: `/pages/user/index?openid=${openid}`,
    });
  }
}
function toAdmin() {
  Taro.navigateTo({
    url: "/pages/admin/index",
  });
}
function toOrder() {
  Taro.navigateTo({
    url: "/pages/myorder/index",
  });
}


function clear() {
  Taro.clearStorageSync();
  mainStore.setLoginState(false);
  mainStore.setToken("");
  mainStore.setUserInfo({});
  Taro.showToast({
    title: "已退出",
  });
}
</script>

<style lang="scss">
.mine-bg-pic {
  background-image: url(http://imgs.zixinco.com/20221212/c918bb6c42546.png);
  background-size: cover;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #00000080;
  }
}
</style>
