<template>
  <view class="h-full">
    <view class="text-xl px-4 mt-4">
      <view class="text-primary text-2xl"> 房间：{{ roomInfo.name }} </view>
      <view> 所属教学楼：{{ roomInfo.buildingName }} </view>
    </view>
    <view class="cell-picker">
      <view
        :class="['cell-btn', range === 1 ? 'select' : '']"
        @tap="changeRange(1)"
      >
        {{ rangeSet[1] }}
      </view>
      <view
        :class="['cell-btn', range === 2 ? 'select' : '']"
        @tap="changeRange(2)"
      >
      {{ rangeSet[2] }}
      </view>
      <view
        :class="['cell-btn', range === 3 ? 'select' : '']"
        @tap="changeRange(3)"
      >
      {{ rangeSet[3] }}
      </view>
      <view
        :class="['cell-btn', range === 4 ? 'select' : '']"
        @tap="changeRange(4)"
      >
      {{ rangeSet[4] }}
      </view>
    </view>
    <view class="px-4 pb-4">
      <nut-calendar
        title="本房间可用日期"
        :poppable="false"
        :is-auto-back-fill="true"
        :start-date="calendarRange.startDate"
        :end-date="calendarRange.endDate"
        @choose="setChooseValue"
      >
        <template v-slot:day="date">
          <span @tap="showPopup(date.date)">{{
            date.date.day <= 9 ? "0" + date.date.day : date.date.day
          }}</span>
        </template>
        <template v-slot:bottomInfo="date">
          <span class="text-sm text-blue-400" @tap="showPopup(date.date)">{{
            dateBottom(date.date)
          }}</span>
        </template>
      </nut-calendar>
      <nut-button type="primary" shape="square" block class="mx-auto" @tap="add7Days"
        >一键添加最近七个日期全可用</nut-button
      >
      <nut-button type="danger" shape="square" block class="mx-auto mt-2" @tap="delCurRoom"
        >删除房间</nut-button
      >
    </view>
    <nut-popup
      position="bottom"
      pop-class="pt-4"
      :style="{ height: '140px' }"
      v-model:visible="showBottom"
    >
      <view class="flex items-center gap-2 pl-6 pt-2">
        <view class="whitespace-nowrap">可用数量</view>
        <nut-inputnumber
          v-model.number="curDateAmount"
          :max="roomInfo.amount"
          :min="0"
          placeholder="请输入可用数量"
        />
      </view>
      <nut-button
        class="mx-auto mt-8 w-9/10"
        block
        type="primary"
        @tap="saveDate"
      >
        保存
      </nut-button>
    </nut-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted,watch } from "vue";
import { showToast, getCurrentInstance,navigateBack } from "@tarojs/taro";
import {
  getRoomInfo,
  delRoom,
  addRoomDateList,
  getRoomDateList,
  updateRoomDate,
} from "@/apis/room";
import { dateUtil, daysAgo, formatToDate, today } from "@/utils/dateUtil";
import { rangeSet } from "@/utils/helper";

const roomDateList = ref<{ date: string; amount: number }[]>([]);
const range = ref(1);
function changeRange(val: number) {
  range.value = val;
}
function dateBottom(date) {
  if (roomDateList.value?.length === 0) return 0;
  const today = `${date.year}-${date.month}-${date.day}`;
  console.log([today]);
  
  if (
    dateUtil(today).isAfter(calendarRange.endDate) ||
    dateUtil(today).isBefore(calendarRange.startDate)
  )
    return "";
  const t = roomDateList.value!.find((d) => d.date === formatToDate(today));
  return t?.amount || 0;
}

const showBottom = ref(false);
const curDate = ref("");
const curDateAmount = ref(0);

function showPopup(date) {
  showBottom.value = true;
  const today = `${date.year}-${date.month}-${date.day}`;
  curDateAmount.value = roomDateList.value!.find(
    (d) => d.date === today
  )!.amount;
  curDate.value = `${date.year}-${date.month}-${date.day}`;
}

async function saveDate() {
  await updateRoomDate({
    roomId: roomInfo.id,
    amount: curDateAmount.value,
    date: curDate.value,
    range: range.value,
  });
  showBottom.value = false;
  showToast({
    title: "修改成功",
    icon: "success",
    duration: 2000,
  });
  await updateList();
}

const calendarRange = reactive({
  startDate: today(),
  endDate: daysAgo(-7),
});

const roomInfo = reactive<roomInfo>({
  building: 0,
  amount: 0,
  name: "",
  id: 0,
  buildingName: "",
});

async function add7Days() {
  const res = await addRoomDateList({
    roomId: roomInfo.id,
    range: range.value,
    startDate: today(),
    endDate: daysAgo(-7),
  });
  showToast({
    title: res,
    duration: 2000,
  });
  await updateList();
}

function setChooseValue() {}

async function delCurRoom() {
  await delRoom({ id: roomInfo.id });
  showToast({
    title: "删除成功",
    icon: "success",
    duration: 2000,
  });
  navigateBack();
}

watch(range,()=>{
  updateList()
})

async function updateList() {
  roomDateList.value = await getRoomDateList({
    roomId: roomInfo.id,
    range: range.value,
    ...calendarRange,
  });
}

onMounted(async () => {
  const id = parseInt(getCurrentInstance().router?.params.id!);
  const res = await getRoomInfo({ id });
  Object.assign(roomInfo, res);
  await updateList();
});
</script>

<style lang="scss">
.admin-room-list {
  .nut-infinite-container {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    overflow-y: scroll;
    height: calc(100vh - 60px);

    .room {
      @apply p-2 shadow-warm-gray-200 shadow rounded-md;
      border: 1px solid rgba(168, 162, 158, 0.5);

      .name {
        @apply text-left text-xl font-bold;
      }
    }
  }
}

.cell-picker {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  height: auto;
  padding: 4px;
  text-align: center;
  @apply bg-gray-200;
}
.cell-btn {
  background-color: #fff;
  width: 48%;
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
