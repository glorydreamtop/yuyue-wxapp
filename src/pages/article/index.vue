<template>
  <view class="p-4 flex flex-col gap-2">
    <image class="w-full" mode="widthFix" :src="article.pic" />
    <view class="indent-2em leading-8">
      {{ article.content }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { eventCenter, getCurrentInstance,setNavigationBarTitle } from "@tarojs/taro";
import { getAritcleDetailApi } from "@/apis/article";

const article = reactive<singleArticle>({
  title: "",
  content: "",
  pic: "",
  id: 0,
});

onMounted(async () => {
  eventCenter.on(getCurrentInstance().router!.onShow, async () => {
    const id = getCurrentInstance().router?.params.id;
    if (id) {
      const res = await getAritcleDetailApi({ id: Number(id) });
      Object.assign(article, res);
      setNavigationBarTitle({
        title:article.title
      })
    }
  });
});
</script>

<style lang="scss"></style>
