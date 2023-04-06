<template>
  <view class="h-100vh w-full bg-gray-100 flex flex-col gap-2 pt-2">
    <button
      class="avatar-btn"
      open-type="chooseAvatar"
      @chooseAvatar="getAvatar"
    >
      <image class="w-90px h-90px rounded-1 bg-gray-100" :src="state.avatar" />
    </button>
    <view>
      <nut-input label="姓名" v-model="state.name" placeholder="请输入姓名" />
    </view>
    <view>
      <nut-input label="年龄" v-model="state.age" placeholder="请输入年龄" />
    </view>
    <!-- <view class="bg-white flex items-center gap-2 px-6 h-45px">
      <view class="text-sm mr-12">性别</view>
      <nut-radiogroup v-model="state.gender" direction="horizontal">
        <nut-radio :label="1">男</nut-radio>
        <nut-radio :label="0">女</nut-radio>
      </nut-radiogroup>
    </view> -->
    <nut-button class="mx-4 mt-10" shape="square" type="primary" @tap="saveUserInfo">{{
      loginState ? "保存" : "注册"
    }}</nut-button>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted } from "vue";
import { useMainStore } from "@/store/index";
import { addUserInfoApi, updateUserInfoApi } from "@/apis/user";
import { uploadApi } from "@/utils/http";
import Taro, { getCurrentInstance } from "@tarojs/taro";

const mainStore = useMainStore();
const loginState = computed(() => {
  return mainStore.loginState;
});

const state = reactive<userInfo>({
  name: "",
  age: 18,
  openid: "",
  avatar: "http://imgs.zixinco.com/20221221/8feb7e897ebbe.png",
});
async function getAvatar(e) {
  const filePath = e.detail.avatarUrl;
  state.avatar = await uploadApi(filePath);
}
async function saveUserInfo() {
  if (loginState.value) {
    updateUserInfoApi(state);
  } else {
    await addUserInfoApi(state);
  }
  Taro.showToast({
    title: loginState ? "保存成功" : "注册成功",
  });
  const { code } = await Taro.login();
  await mainStore.login(code);
  await mainStore.fetchUserInfo();
  mainStore.loginState = true;
  Taro.navigateBack();
}
onMounted(() => {
  const openid = getCurrentInstance().router?.params?.openid;
  if (openid) {
    state.openid = openid;
  }
});
</script>

<style lang="scss">
.avatar-btn {
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 50%;
  margin-top: 60px;
  color: transparent;
  border-color: transparent;
}
</style>
