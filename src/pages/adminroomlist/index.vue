<template>
  <view class="h-full relative">
    <nut-tabs v-model="currentBuilding" class="h-100vh">
    <nut-tabpane
      v-for="building in buildings"
      :title="building.name"
      :pane-key="building.id"
      class="admin-room-list"
    >
      <view v-for="item in roomListMaps[building.name]" :key="item.id" class="h-80px w-4/10 room">
        <view class="name text-primary">房间：{{ item.name }}</view>
        <view>座位数：{{ item.amount }}</view>
      </view>
    </nut-tabpane>
  </nut-tabs>
  <view class="rounded-1 bg-primary w-20 h-20 right-4 bottom-4 absolute">
    <IconFont name="plus"></IconFont>
  </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { getBuildingRoomList, getBuildingList } from "@/apis/room";

const currentBuilding = ref(1);
const buildings = ref<buildingInfo[]>([]);
const roomListMaps = reactive<Record<string, singleRoom[]>>({});

onMounted(async () => {
  buildings.value = await getBuildingList();
  buildings.value.forEach(async (b) => {
    const res = await getBuildingRoomList({
      building: b.id,
    });
    roomListMaps[b.name] = res;
  });
});
</script>

<style lang="scss">
.admin-room-list{
    display: flex;
    gap:12px;
    flex-wrap: wrap;
    align-items: center;
    overflow-y: scroll;
    height: calc(100vh - 60px);

    .room{
        @apply p-2 shadow-warm-gray-200 shadow rounded-md;
        border: 1px solid rgba(168, 162, 158, 0.5);

        .name{
            @apply text-left text-xl font-bold;
        }
    }
}
</style>
