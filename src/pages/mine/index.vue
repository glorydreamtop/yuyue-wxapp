<template>
  <view class="h-100vh w-full">
    <view class="mine-bg-pic w-full h-200px">
      <view
        class="flex items-center gap-6 p-4 absolute z-9 top-0 h-full left-0 w-full"
      >
        <image
          :src="mainStore.userInfo.avatar"
          class="w-25 h-25 rounded-1"
        ></image>
        <view v-if="loginState" class="text-light-900 flex gap-2 flex-col">
          <view class="text-3xl font-bold">{{ mainStore.userInfo.name }}</view>
          <view class="flex gap-4">
            <text>{{ mainStore.userInfo.age }}岁</text>
          </view>
        </view>
        <view class="text-3xl text-white" @tap="register" v-else>
          注册/登录
        </view>
      </view>
    </view>
    <view class="flex justify-center pt-4">
      <nut-button class="w-9/10" @tap="toAdmin">管理员功能</nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/store/index";
import { decryptWxUserInfo } from "@/apis/user";

const mainStore = useMainStore();
const loginState = computed(() => {
  return mainStore.loginState;
});

onMounted(async () => {
  try {
    const { code } = await Taro.login();
    await mainStore.login(code);
    await mainStore.fetchUserInfo();
    mainStore.loginState = true;
  } catch (error) {
    if (error === "no user") mainStore.loginState = false;
  }
});

function register() {
  Taro.navigateTo({
    url: "/pages/user/index",
  });
}
function toAdmin(){
  Taro.navigateTo({
    url: "/pages/admin/index",
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
