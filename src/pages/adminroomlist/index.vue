<template>
  <view class="h-full relative">
    <nut-tabs v-model="currentBuilding" class="h-100vh">
      <nut-tabpane
        v-for="building in buildings"
        :title="building.name"
        :pane-key="building.id"
        class="admin-room-list"
      >
        <nut-infiniteloading
          pull-icon="refresh"
          container-id="refreshScroll"
          :use-window="false"
          :is-open-refresh="true"
          @refresh="refresh"
        >
          <view
            v-for="item in roomListMaps[building.name]"
            :key="item.id"
            class="min-h-60px w-9/20 room"
            @tap="toDetail(item.id)"
            @longpress="edit(item.id)"
          >
            <view class="name text-primary">{{ item.name }}</view>
            <view>座位数：{{ item.amount }}</view>
          </view>
        </nut-infiniteloading>
      </nut-tabpane>
    </nut-tabs>
    <view
      @tap="showPopup"
      class="rounded-1 bg-primary w-20 h-20 right-8 bottom-8 absolute flex items-center justify-center"
    >
      <nut-icon size="40" color="#FFFFFF" name="plus"></nut-icon>
    </view>
    <nut-popup
      position="bottom"
      pop-class="pt-4"
      :style="{ height: '240px' }"
      v-model:visible="showBottom"
    >
      <view class="flex items-center gap-2 pl-6 pt-2">
        <view class="whitespace-nowrap">房间名</view>
        <nut-input v-model="roomInfo.name" placeholder="请输入房间名" />
      </view>
      <view class="flex items-center gap-2 pl-6 pt-2">
        <view class="whitespace-nowrap">可用数量</view>
        <nut-inputnumber
          v-model.number="roomInfo.amount"
          :min="0"
          placeholder="请输入可用数量"
        />
      </view>
      <view class="pl-6 pt-4">
        <nut-radiogroup v-model="roomInfo.building" direction="horizontal">
          <nut-radio v-for="b in buildings" :label="b.id">{{
            b.name
          }}</nut-radio>
        </nut-radiogroup>
      </view>
      <nut-button
        class="mx-auto mt-8 w-9/10"
        block
        shape="square"
        type="primary"
        @tap="saveRoom"
      >
        创建
      </nut-button>
    </nut-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import Taro, { eventCenter, getCurrentInstance } from "@tarojs/taro";
import { getBuildingRoomList, getBuildingList, addRoom } from "@/apis/room";

const currentBuilding = ref(1);
const buildings = ref<buildingInfo[]>([]);
const roomListMaps = reactive<Record<string, singleRoom[]>>({});

const showBottom = ref(false);

function toDetail(id: number) {
  Taro.navigateTo({
    url: `/pages/adminroomdate/index?id=${id}`,
  });
}

function showPopup() {
  showBottom.value = true;
}

const roomInfo = reactive<Partial<roomInfo>>({
  building: 0,
  amount: 0,
  name: "",
});

function clear(){
  Object.assign(roomInfo, {
    building: 0,
    amount: 0,
    name: "",
  });
}

async function saveRoom() {
  await addRoom(roomInfo);
  clear()
  Taro.showToast({
    title: "创建成功",
    icon: "success",
    duration: 2000,
  });
  await updateList();
  showBottom.value = false;
}
const refresh = async (done: () => void) => {
  await updateList();
  setTimeout(done, 1000);
};

function edit(id: number) {
  clear();
  showPopup();
  roomInfo.id = id;
  roomInfo.building = currentBuilding.value;
  roomInfo.buildingName = buildings.value.find((b) => b.id === currentBuilding.value)?.name || '';
  roomInfo.name = roomListMaps[roomInfo.buildingName].find((r) => r.id === id)?.name || '';
  roomInfo.amount = roomListMaps[roomInfo.buildingName].find((r) => r.id === id)?.amount || 0;
}

async function updateList() {
  buildings.value = await getBuildingList();
  buildings.value.forEach(async (b) => {
    const res = await getBuildingRoomList({
      building: b.id,
    });
    roomListMaps[b.name] = res;
  });
}

onMounted(() => {
  eventCenter.on(getCurrentInstance().router!.onShow, () => {
    updateList();
  });
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

// 不停旋转的动画
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
