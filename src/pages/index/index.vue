<template>
  <view class="index">
    <nut-swiper :init-page="swiperIndex" :loop="false">
      <nut-swiper-item>
        <img src="http://imgs.zixinco.com/20221207/e930d78e2c904.png" alt="" />
      </nut-swiper-item>
      <nut-swiper-item>
        <img src="http://imgs.zixinco.com/20221207/99c9e53e089ac.png" alt="" />
      </nut-swiper-item>
    </nut-swiper>
    <nut-cell>
      <view
        class="flex justify-between items-center w-full"
        hover-class="none"
        :hover-stop-propagation="false"
      >
        <view class="flex items-center" @tap="changeDate(-1)">
          <nut-icon class="transform rotate-180" name="right" />
          <text> 前一天 </text>
        </view>
        <text class="" :selectable="false" @tap="openCalendar">
          {{ currentDate }}
        </text>
        <view class="flex items-center" @tap="changeDate(1)">
          <text> 后一天 </text>
          <nut-icon name="right" />
        </view>
      </view>
    </nut-cell>
    <view class="cell-picker">
      <view
        :class="['cell-btn', isMorning ? 'select' : '']"
        @tap="changeisMorning(true)"
      >
        上午
      </view>
      <view
        :class="['cell-btn', !isMorning ? 'select' : '']"
        @tap="changeisMorning(false)"
      >
        下午
      </view>
    </view>
    <nut-calendar
      v-model:visible="calendarVisible"
      :default-value="currentDate"
      :start-date="dateRange[0]"
      :end-date="dateRange[1]"
      @choose="setDate"
    >
    </nut-calendar>
    <nut-tabs v-model="currentBuilding">
      <nut-tabpane
        v-for="building in buildings"
        :title="building.name"
        :pane-key="building.id"
        class="room-list"
      >
        <Room :list="roomListMaps[building.name]" :morning="isMorning" :date="currentDate" />
      </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Room from "@/components/roomCard/index.vue";
import { formatToDate, today, daysAgo } from "@/utils/dateUtil";
import { getRoomList, getBuildingList } from "@/apis/room";
const swiperIndex = ref(0);
const currentBuilding = ref(1);
const buildings = ref<buildingInfo[]>([]);
const roomListMaps = reactive<Record<string, singleRoom[]>>({});
const calendarVisible = ref(false);
const currentDate = ref(formatToDate());
const dateRange = ref([today(), daysAgo(-14)]);

// 是上午
const isMorning = ref(true);
function changeisMorning(val: boolean) {
  isMorning.value = val;
}

function openCalendar() {
  calendarVisible.value = true;
}
function changeDate(offset: number) {
  currentDate.value = daysAgo(-1 * offset, currentDate.value);
}
function setDate(params: string[]) {
  currentDate.value = params[3];
}

onMounted(async () => {
  buildings.value = await getBuildingList();
  buildings.value.forEach(async (b) => {
    const res = await getRoomList({
      building: b.id,
      date: currentDate.value,
      morning: Number(isMorning.value),
    });
    roomListMaps[b.name] = res;
  });
});
</script>

<style lang="scss">
.index {
  height: 100vh;
}
.nut-swiper-item {
  line-height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
}

.room-list {
  height: calc(100vh - 260px);
}

.cell-picker {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  height: 40px;
  text-align: center;
  @apply bg-gray-200;
}
.cell-btn {
  background-color: #fff;
  width: 46%;
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
