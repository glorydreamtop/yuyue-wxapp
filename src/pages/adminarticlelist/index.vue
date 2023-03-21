<template>
  <view class="h-100vh overscroll-y-auto flex flex-col gap-4 relative">
    <view
      @tap="edit(a.id)"
      v-for="a in articleList"
      :key="a.id"
      class="w-9/10 mx-auto rounded-md card"
    >
      <img mode="widthFix" class="w-full" :src="a.pic" :alt="a.title" />
      <view class="text-lg font-bold p-2">
        {{ a.title }}
      </view>
    </view>
    <view
      @tap="add"
      class="rounded-1 bg-primary w-20 h-20 right-8 bottom-8 absolute flex items-center justify-center"
    >
      <nut-icon size="40" color="#FFFFFF" name="plus"></nut-icon>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { getArticleListApi } from "@/apis/article";
import { getCurrentInstance, eventCenter, navigateTo } from "@tarojs/taro";

const articleList = ref<singleArticle[]>([]);
onMounted(async () => {
  eventCenter.on(getCurrentInstance().router?.onShow, () => {
    updateList();
  });
});

async function updateList() {
  articleList.value = await getArticleListApi();
}

function add() {
  navigateTo({
    url: `/pages/adminarticleedit/index`,
  });
}

function edit(id: number) {
  navigateTo({
    url: `/pages/adminarticleedit/index?id=${id}`,
  });
}
</script>

<style lang="scss">
.card {
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
