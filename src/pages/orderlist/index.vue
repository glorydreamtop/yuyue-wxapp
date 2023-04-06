<template>
  <view class="flex flex-col gap-2 p-4">
    <view
      v-for="o in orderList"
      class="order rounded-md shadow-md p-4 grid gap-2"
      @tap="select(o.id)"
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
      <view class="w-full col-span-3 p-1 whitespace-nowrap bg-gray-200">
        预约人：{{ o.userName }} <text class="text-blue-400">{{ o.count }}</text
        >个座位
      </view>
    </view>
    <nut-popup
      position="bottom"
      pop-class="pt-4"
      :style="{ height: '240px' }"
      v-model:visible="showBottom"
    >
      <view class="text-lg pl-6 pt-2"> 预约人：{{ order.userName }} </view>
      <view class="flex items-center gap-2 pl-6 pt-2">
        <view class="whitespace-nowrap">预约事由：</view>
        <view>
          {{ order.reason||'未填写' }}
        </view>
      </view>
      <view class="mx-auto mt-8 w-9/10 flex gap-2">
        <nut-button
          class="flex-grow"
          shape="square"
          type="primary"
          @tap="setState(1)"
        >
          同意
        </nut-button>
        <nut-button
          class="flex-grow"
          shape="square"
          type="danger"
          @tap="setState(2)"
        >
          拒绝
        </nut-button>
      </view>
    </nut-popup>
  </view>
</template>

<script lang="ts" setup>
import { getAllOrderList, updateOrder } from "@/apis/order";
import { rangeSet, orderStateFilter } from "@/utils/helper";
import { ref, onMounted, reactive } from "vue";

const orderList = ref<singleOrder[]>([]);

const order = reactive<singleOrder>({
  id: NaN,
  reason: "",
  userName: "",
  count: "",
  range: "",
});

const showBottom = ref(false);

function select(id: number) {
  const _order = orderList.value.find((o) => o.id === id)!;
  Object.assign(order, _order);
  showBottom.value = true;
}

async function setState(inuse: number) {
  order.inuse = inuse;
  await updateOrder(order);
  showBottom.value = false;
  await refresh();
}

async function refresh() {
  orderList.value = await getAllOrderList();
}

onMounted(async () => {
  refresh();
});
</script>

<style lang="scss">
.order {
  border: solid 1px #ececec;
  grid-template-rows: repeat(3, min-content);
  grid-template-columns: repeat(3, 1fr);
}
</style>
