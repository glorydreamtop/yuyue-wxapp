<template>
  <nut-list :height="80" :listData="props.list">
    <template v-slot="{ item }">
      <view
        class="room-card p-2 shadow-warm-gray-200 shadow grid grid-cols-[auto,auto] grid-rows-2 gap-1 items-center"
      >
        <view class="row-span-1 col-span-2 text-left text-xl font-bold text-primary">
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
          >预约</nut-button
        >
      </view>
    </template>
  </nut-list>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

const props = defineProps<{
  list: Array<singleRoom>;
}>();
</script>

<style lang="scss">
.room-card {
  border: 1px solid rgba(168, 162, 158, 0.5);
  border-radius: 4px;
}
</style>
