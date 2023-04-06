<template>
  <view class="h-90vh flex flex-col gap-4 p-4">
    <view class="roomInfo rounded-md shadow-md p-4 grid gap-2 grid-cols-2">
      <view class="text-2xl text-primary col-span-2 rounded-1">
        {{ roomInfo.name }}
      </view>
      <view class="text-gray-500 italic">{{ roomInfo.buildingName }}</view>
      <view class="justify-self-end text-blue-400">
        {{ roomInfo.available }}可用/共{{ roomInfo.amount }}座
      </view>
    </view>
    <view class="count flex gap-2 items-center rounded-md shadow-md p-4">
      <view class="text-lg whitespace-nowrap">
        预约数量：
      </view>
      <nut-inputnumber
        v-model="order.count"
        :max="roomInfo.available"
        :min="1"
      ></nut-inputnumber>
    </view>
    <view
      class="order-reason flex flex-col gap-2 flex-grow rounded-md shadow-md p-4"
    >
      <view class="text-lg">
        预约事由：
      </view>
      <nut-textarea
        class="reason flex-grow"
        v-model="order.reason"
        placeholder="请填写50字以内的教室用途简述"
      ></nut-textarea>
    </view>
    <nut-button shape="square" type="primary" @tap="createOrder"
      >预约</nut-button
    >
  </view>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { getCurrentInstance, showToast, navigateBack } from "@tarojs/taro";
import { getRoomDateInfo } from "@/apis/room";
import { addOrder } from "@/apis/order";
import { formatToDate } from "@/utils/dateUtil";

async function createOrder() {
  await addOrder({
    roomId: order.roomId,
    range: order.range,
    date: formatToDate(order.date),
    reason: order.reason,
    count: order.count,
  });
  showToast({
    title: "预约成功",
    icon: "success",
    duration: 2000,
  });
  setTimeout(()=>{
    navigateBack()
  },2000)
}

const roomInfo = reactive<singleRoom>({
  building: 0,
  amount: 0,
  name: "",
  available: 0,
  id: 0,
  buildingName: "",
});

const order = reactive({
  reason: "",
  roomId: 0,
  userId: "",
  date: "",
  range: 1,
  count: 1,
});

onMounted(async () => {
  const roomId = parseInt(getCurrentInstance().router?.params.id!);
  const date = getCurrentInstance().router?.params.date!;
  const range = parseInt(getCurrentInstance().router?.params.range!);
  order.range = range;
  order.date = date;
  order.roomId = roomId;
  const res = await getRoomDateInfo({
    roomId,
    range,
    date,
  });
  Object.assign(roomInfo, res);
});
</script>

<style lang="scss">
.roomInfo {
  border: solid 1px #ececec;
  grid-template-rows: min-content, min-content;
}
.order-reason {
  border: solid 1px #ececec;

  .reason {
    border: solid 1px #ececec;
  }
}
.count {
  border: solid 1px #ececec;
}
</style>
