<template>
  <nut-tabs v-model="currentBuilding">
    <nut-tabpane
      v-for="building in buildings"
      :title="building.name"
      :pane-key="building.id"
      class="room-list"
    >
      <view> </view>
    </nut-tabpane>
  </nut-tabs>
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

<style lang="scss"></style>
