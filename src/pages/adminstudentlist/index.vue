<template>
  <view class="h-100vh">
    <nut-infiniteloading
      pull-icon="refresh"
      container-id="refreshScroll"
      :use-window="false"
      :is-open-refresh="true"
      @refresh="refresh"
    >
      <nut-swipe
        v-for="u in userList"
        :key="u.openid"
        :name="u.openid"
        class="stu-item"
      >
        <view class="flex items-center gap-4 p-4">
          <image class="w-10 h-10 rounded-md" :src="u.avatar" />
          <view>
            <view>{{ u.name }}</view>
            <view class="text-gray-400 text-sm">{{ u.age }}岁</view>
          </view>
        </view>
        <template #right>
          <nut-button
            shape="square"
            style="height:100%"
            type="danger"
            @tap="del(u)"
            >删除</nut-button
          >
          <nut-button
            shape="square"
            type="info"
            style="height:100%"
            @tap="ban(u)"
            >{{ u.inuse ? "禁用" : "启用" }}</nut-button
          >
        </template>
      </nut-swipe>
    </nut-infiniteloading>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { getUserListApi, delUserApi, banUserApi } from "@/apis/user";
import { showToast } from "@tarojs/taro";

const userList = ref<userInfo[]>([]);

async function refresh(done?: () => void) {
  userList.value = await getUserListApi();
  done && setTimeout(done, 1000);
}

async function del(data: userInfo) {
  await delUserApi(data);
  showToast({
    title: "删除成功",
  });
  refresh();
}

async function ban(data: userInfo) {
  await banUserApi({
    openid: data.openid,
    inuse: 1 - data.inuse,
  });
  showToast({
    title: data.inuse ? "禁用成功" : "启用成功",
  });
  refresh();
}

onMounted(() => {
  refresh();
});
</script>

<style lang="scss">
.stu-item {
  // 奇数浅色，偶数深色
  &:nth-child(odd) {
    background-color: #f5f5f5;
  }
  background-color: #ffffff;
}
</style>
