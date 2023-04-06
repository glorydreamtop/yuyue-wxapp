<template>
  <view class="index">
    <nut-swiper :init-page="swiperIndex" :loop="false">
      <nut-swiper-item v-for="a in articleList">
        <img @tap="toArticle(a.id)" :src="a.pic" />
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
        <nut-infiniteloading
          v-if="roomListMaps[building.name]?.length > 0"
          pull-icon="refresh"
          container-id="refreshScroll"
          :use-window="false"
          :is-open-refresh="true"
          @refresh="refresh"
        >
          <Room
            :list="roomListMaps[building.name]"
            :range="range"
            :date="currentDate"
            @refresh="refresh"
          />
        </nut-infiniteloading>
        <view class="h-60 flex justify-center items-center" v-else>
          <text @tap="refresh">
            {{ loading?'加载中...':'点击刷新' }}
          </text>
        </view>
      </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import Room from "@/components/roomCard/index.vue";
import { formatToDate, today, daysAgo } from "@/utils/dateUtil";
import { getRoomList, getBuildingList } from "@/apis/room";
import { getCurrentInstance, eventCenter ,navigateTo} from "@tarojs/taro";
import { useMainStore } from "@/store";
import { rangeSet } from "@/utils/helper";
import { getArticleListApi } from "@/apis/article";
const swiperIndex = ref(0);
const currentBuilding = ref(1);
const buildings = ref<buildingInfo[]>([]);
const roomListMaps = reactive<Record<string, singleRoom[]>>({});
const calendarVisible = ref(false);
const currentDate = ref(formatToDate());
const dateRange = ref([today(), daysAgo(-14)]);

const range = ref(1);
function changeRange(val: number) {
  range.value = val;
}
const loading = ref(false)

function openCalendar() {
  calendarVisible.value = true;
}
function changeDate(offset: number) {
  currentDate.value = daysAgo(-1 * offset, currentDate.value);
}
function setDate(params: string[]) {
  currentDate.value = params[3];
}

watch(
  () => [currentDate, range],
  () => {
    refresh();
  },
  {
    deep: true,
  }
);

async function refresh(done?: () => void) {
  loading.value = true;
  buildings.value = await getBuildingList();
  buildings.value.forEach(async (b) => {
    const res = await getRoomList({
      building: b.id,
      date: currentDate.value,
      range: range.value,
    });
    roomListMaps[b.name] = res;
  });
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  if (done) done();
}

const articleList = ref<singleArticle[]>([]);

function toArticle(id:number){
  navigateTo({
    url:`/pages/article/index?id=${id}`
  })
}
onMounted(async () => {
  eventCenter.on(getCurrentInstance().router!.onShow, async () => {
    await refresh();
    articleList.value = await getArticleListApi();
    useMainStore().loginState = true;
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
  height: calc(100vh - 330px);
}

.cell-picker {
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
