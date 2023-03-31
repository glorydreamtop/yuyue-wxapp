<template>
  <view class="h-full p-4">
    <view class="text-xl">
      <view class="text-primary text-2xl"> 房间：{{ roomInfo.name }} </view>
      <view> 所属教学楼：{{ roomInfo.buildingName }} </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { getCurrentInstance } from "@tarojs/taro";
import { getRoomInfo } from "@/apis/room";

const roomInfo = reactive<roomInfo>({
  building: 0,
  amount: 0,
  name: "",
  id: 0,
  buildingName: "",
});

onMounted(async () => {
  const id = parseInt(getCurrentInstance().router?.params.id!);
  const res = await getRoomInfo({ id });
  Object.assign(roomInfo, res);
});
</script>

<style lang="scss">
.admin-room-list {
  .nut-infinite-container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    overflow-y: scroll;
    height: calc(100vh - 60px);

    .room {
      @apply p-2 shadow-warm-gray-200 shadow rounded-md;
      border: 1px solid rgba(168, 162, 158, 0.5);

      .name {
        @apply text-left text-xl font-bold;
      }
    }
  }
}

.cell-picker {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2%;
  height: 40px;
  text-align: center;
}
.cell-btn {
  background-color: #fff;
  width: 48%;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  @apply shadow shadow-light-700;

  &.select {
    background-color: $primary-color;
    color: #fff;
  }
}
</style>
