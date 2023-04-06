<template>
  <view class="flex flex-col gap-2 p-4">
    <view
      v-for="o in orderList"
      class="order rounded-md shadow-md p-4 grid gap-2"
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
  </view>
</template>

<script lang="ts" setup>
import { getMyOrderList } from "@/apis/order";
import { rangeSet, orderStateFilter } from "@/utils/helper";
import { ref, onMounted } from "vue";

const orderList = ref<singleOrder[]>([]);

onMounted(async () => {
  orderList.value = await getMyOrderList();
});
</script>

<style lang="scss">
.order {
  border: solid 1px #ececec;
  grid-template-rows: repeat(2, min-content);
  grid-template-columns: repeat(3, 1fr);
}
</style>
