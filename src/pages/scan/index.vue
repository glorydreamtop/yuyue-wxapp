<template>
  <view class="flex flex-col gap-4 p-4">
    <view
      class="text-center h-20 text-white leading-20 rounded w-full mx-auto text-2xl scan"
      @tap="scan"
    >
      点此扫码
    </view>
    <view class="leading-10 rounded p-4 border">
      <view> 姓名：{{ info.userName }} </view>
      <view> 房间：{{ info.roomName }} </view>
      <view> 预约日期：{{ info.date }} </view>
      <view> 预约时段：{{ rangeSet[info.range] }} </view>
      <view> 预约事由：{{ info.reason }} </view>
      <view> 预约数量：{{ info.count }} </view>
    </view>
    <view v-if="success" class="text-red-600 text-2xl text-center">
      签到成功！
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { scanCode } from "@tarojs/taro";
import { rangeSet } from "@/utils/helper";
import { getOrderInfo, updateOrder } from "@/apis/order";

const info = reactive<Partial<singleOrder>>({
  id: NaN,
  userId: "",
  date: "",
  roomName: "",
  buildingName: "",
  inuse: 0,
  range: 0,
  count: 0,
  reason: "",
  userName: "",
  creatTime: "",
});

const success = ref(false);

async function scan() {
  success.value = false;
  const res = await scanCode({});
  const id = parseInt(res.result.split("=")[1]);
  const order = await getOrderInfo({ id });
  Object.assign(info, order);
  await updateOrder({ id: order.id, inuse: 0 });
  success.value = true;
}
</script>

<style lang="scss">
.scan {
  background-image: linear-gradient(10deg, #2af598 0%, #009efd 100%);
}

.border {
  border: 1px solid #eaeaea;
}
</style>
