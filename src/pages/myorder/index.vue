<template>
  <view class="flex flex-col gap-2 p-4">
    <view
      v-for="o in orderList"
      class="order rounded-md shadow-md p-4 grid gap-2"
      @tap="showQRCode(o)"
    >
      <view
        class="text-2xl whitespace-nowrap text-primary col-span-2 rounded-1"
      >
        {{ o.roomName }}
      </view>
      <view class="col-span-1 justify-self-end">
        {{ orderStateFilter(o.inuse) }}
      </view>
      <view class="text-gray-500 italic">{{ o.buildingName }}</view>
      <view class="justify-self-end whitespace-nowrap text-blue-400 col-span-2">
        {{ rangeSet[o.range] }}/{{ o.date }}
      </view>
    </view>
    <nut-popup
      position="bottom"
      pop-class="pt-4"
      :style="{ height: '60vh' }"
      v-model:visible="showBottom"
    >
      <view class="w-full h-full flex flex-col items-center justify-center">
        <view class="text-xl">
          签到二维码
        </view>
        <image class="w-40vh h-40vh" :src="qrcode" />
        <nut-button type="danger" @tap="del">
          取消预约
        </nut-button>
      </view>
    </nut-popup>
  </view>
</template>

<script lang="ts" setup>
import { getMyOrderList, getOrderInfo, delOrder } from "@/apis/order";
import {
  rangeSet,
  orderStateFilter,
  objectToQueryString,
} from "@/utils/helper";
import { ref, onMounted, reactive } from "vue";
import { showToast } from "@tarojs/taro";

const orderList = ref<singleOrder[]>([]);

onMounted(async () => {
  orderList.value = await getMyOrderList();
});

const order = reactive({} as singleOrder);
const showBottom = ref(false);
const qrcode = ref("");

async function del() {
  await delOrder({ id: order.id });
  showBottom.value = false;
  showToast({
    title: "预约已取消",
  });
  orderList.value = await getMyOrderList();
}

function showQRCode(o: singleOrder) {
  if (o.inuse !== 1) {
    showToast({
      title: `此预约${orderStateFilter(o.inuse)}`,
    });
    return;
  }
  Object.assign(order, o);
  showBottom.value = true;
  qrcode.value = `https://www.olzz.com/qr/?text=id=${o.id}`;
  refreshOrder(o.id);
}

function refreshOrder(id: number) {
  const timer = setInterval(async () => {
    const res = await getOrderInfo({ id });
    if (!res || res.inuse === 0) {
      clearInterval(timer);
      showBottom.value = false;
      showToast({
        title: "签到成功",
      });
      orderList.value = await getMyOrderList();
    }
  }, 2000);
}
</script>

<style lang="scss">
.order {
  border: solid 1px #ececec;
  grid-template-rows: repeat(2, min-content);
  grid-template-columns: repeat(3, 1fr);
}
</style>
