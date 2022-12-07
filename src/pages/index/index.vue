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
    <nut-cell :showIcon="true">
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

    <nut-calendar
      v-model:visible="calendarVisible"
      :default-value="currentDate"
      :start-date="dateRange[0]"
      :end-date="dateRange[1]"
      @choose="setDate"
    >
    </nut-calendar>
    <nut-tabs v-model="currentBuilding">
      <nut-tabpane title="一教" pane-key="one" class="room-list">
        <Room :list="roomListMaps.one" />
      </nut-tabpane>
      <nut-tabpane title="三教" pane-key="three" class="room-list">
        <Room :list="roomListMaps.three" />
      </nut-tabpane>
      <nut-tabpane title="四教" pane-key="four" class="room-list">
        <Room :list="roomListMaps.four" />
      </nut-tabpane>
      <nut-tabpane title="六教" pane-key="six" class="room-list">
        <Room :list="roomListMaps.six" />
      </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import Room from "@/components/roomCard/index.vue";
import { formatToDate, today, daysAgo } from "@/utils/dateUtil";
const swiperIndex = ref(0);
const currentBuilding = ref("three");
const roomListMaps = reactive<Record<string, singleRoom[]>>({
  one: [],
  three: [
    { id: 1, name: "1006", amount: 40, available: 12 },
    { id: 1, name: "1007", amount: 40, available: 16 },
    { id: 1, name: "1008", amount: 40, available: 30 },
    { id: 1, name: "1010", amount: 40, available: 0 },
  ],
  four: [],
  six: [],
});
const calendarVisible = ref(false);
const currentDate = ref(formatToDate());
const dateRange = ref([today(), daysAgo(-14)]);

function openCalendar() {
  calendarVisible.value = true;
}
function changeDate(offset: number) {
  currentDate.value = daysAgo(-1 * offset, currentDate.value);
}
function setDate(params: string[]) {
  currentDate.value = params[3];
}
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

.room-list{
  height: calc(100vh - 260px);
}
</style>
