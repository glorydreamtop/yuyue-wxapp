<template>
  <view class="h-100vh w-full flex flex-col">
    <view>所有教室</view>
    <view>所有学生</view>
    <view>公告管理</view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/store/index";

const mainStore = useMainStore();

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

</script>

<style lang="scss">

</style>
