<template>
  <view class="h-100vh w-full flex flex-col items-center gap-4 pt-6">
    <view class="admin-item" @tap="to('adminroomlist')">
      <text>所有教室</text>
    </view>
    <view class="admin-item" @tap="to('adminstudentlist')">
      <text>所有学生</text>
    </view>
    <view class="admin-item" @tap="to('adminarticlelist')">
      <text>公告管理</text>
    </view>
    <view class="admin-item" @tap="to('orderlist')">
      <text>预约列表</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";

function to(path:string){
  Taro.navigateTo({
    url: `/pages/${path}/index`,
  });
}
</script>

<style lang="scss">
.admin-item {
  @apply rounded-lg w-4/5 h-30  text-center flex items-center justify-center;

  border: 1px solid #eaeaea;
  background-image: linear-gradient(10deg, #2af598 0%, #009efd 100%);
  color: white;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 20px;
}
</style>
