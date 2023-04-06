<template>
  <nut-list :height="80" :listData="props.list">
    <template v-slot="{ item }">
      <view
        class="room-card p-2 shadow-md shadow grid grid-cols-[auto,auto] grid-rows-2 gap-1 items-center"
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
          class="row-span-1 col-span-1 w-20 justify-self-end rounded"
          size="mini"
          type="primary"
          shape="square"
          :disabled="item.available===0"
          @tap="toOrder(item)"
          >{{ item.available===0?'预约已满':'预约' }}</nut-button
        >
      </view>
    </template>
  </nut-list>
</template>

<script lang="ts" setup>
import { navigateTo,showToast } from "@tarojs/taro";

const props = defineProps<{
  list: Array<singleRoom>;
  range: number;
  date: string;
}>();

function toOrder(item:singleRoom) {
  if(item.available===0){
    showToast({
      title:'没位置了'
    })
    return;
  }
  navigateTo({
    url: `/pages/order/index?id=${item.id}&range=${props.range}&date=${props.date}`,
  });
}
</script>

<style lang="scss">
.room-card {
  border: 1px solid rgba(168, 162, 158, 0.5);
  border-radius: 4px;
}
</style>
