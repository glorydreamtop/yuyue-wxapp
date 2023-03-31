<template>
  <nut-list :height="80" :listData="props.list">
    <template v-slot="{ item }">
      <view
        class="room-card p-2 shadow-warm-gray-200 shadow grid grid-cols-[auto,auto] grid-rows-2 gap-1 items-center"
      >
        <view
          class="row-span-1 col-span-2 text-left text-xl font-bold text-primary"
        >
          {{ item.name }}
        </view>
        <view class="row-span-1 col-span-1 text-left text-gray-600">
          <text> 可用/座位容量： </text>
          <text class="text-primary" :selectable="false">
            {{ item.available }}
          </text>
          /
          <text class="" :selectable="false">
            {{ item.amount }}
          </text>
        </view>
        <nut-button
          class="row-span-1 col-span-1 w-16 justify-self-end rounded"
          size="mini"
          type="primary"
          shape="square"
          @tap="createOrder(item.id)"
          >预约</nut-button
        >
      </view>
    </template>
  </nut-list>
</template>

<script lang="ts" setup>
import { addOrder } from "@/apis/order";
import { formatToDate } from "@/utils/dateUtil";
import Taro from "@tarojs/taro";
import { ref, PropType } from "vue";

const props = defineProps<{
  list: Array<singleRoom>;
  range: number;
  date: string;
}>();
const emit = defineEmits(["refresh"]);
async function createOrder(roomId: number) {
  await addOrder({
    roomId,
    range: props.range,
    date: formatToDate(props.date),
  });
  Taro.showToast({
    title: "预约成功",
    icon: "success",
    duration: 2000,
  });
  emit("refresh");
}
</script>

<style lang="scss">
.room-card {
  border: 1px solid rgba(168, 162, 158, 0.5);
  border-radius: 4px;
}
</style>
