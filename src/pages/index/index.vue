<template>
  <view class="index">
    <nut-tabs v-model="currentBuilding">
      <nut-tabpane title="一教" pane-key="one">
        <Room :list="roomListMaps.one" />
      </nut-tabpane>
      <nut-tabpane title="三教" pane-key="three">
        <Room :list="roomListMaps.three" />
      </nut-tabpane>
      <nut-tabpane title="四教" pane-key="four">
        <Room :list="roomListMaps.four" />
      </nut-tabpane>
      <nut-tabpane title="六教" pane-key="six">
        <Room :list="roomListMaps.six" />
      </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from "vue";
import Room from "@/components/roomCard/index.vue";
const currentBuilding = ref("three");
const roomListMaps = reactive<Record<string, singleRoom[]>>({
  one: [],
  three: [
    { id: 1, name: "1006", amount: 40, available: 12 },
    { id: 1, name: "1007", amount: 40, available: 16 },
    { id: 1, name: "1008", amount: 40, available: 30 },
    { id: 1, name: "1006", amount: 40, available: 0 },
  ],
  four: [],
  six:[]
});
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
