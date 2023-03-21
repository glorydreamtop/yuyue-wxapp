<template>
  <view class="h-100vh overflow-y-auto flex flex-col p-4 gap-4">
    <view class="flex items-center gap-2">
      <view class="whitespace-nowrap">公告标题</view>
      <nut-input
        v-model="article.title"
        placeholder="请输入公告标题"
      ></nut-input>
    </view>
    <view>
      封面：
    </view>
    <nut-uploader
      maximum="1"
      class="w-full"
      v-model:file-list="filelist"
      :before-xhr-upload="up"
    ></nut-uploader>
    <view>
      正文内容：
    </view>
    <nut-textarea
      v-model="article.content"
      placeholder="请输入正文"
    ></nut-textarea>
    <nut-button @tap="save" type="primary">保存</nut-button>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { uploadApi } from "@/utils/http";
import {
  eventCenter,
  getCurrentInstance,
  showToast,
  navigateBack,
} from "@tarojs/taro";
import {
  addAritcleApi,
  updateAritcleApi,
  getAritcleDetailApi,
} from "@/apis/article";

const article = reactive<singleArticle>({
  title: "",
  content: "",
  pic: "",
  id: 0,
});

const filelist = ref([
  {
    url: "",
  },
]);

function up(xhr: any, options) {
  console.log(options);
  uploadApi(options.taroFilePath).then((res) => {
    article.pic = res;
    options.onSuccess();
  });
}

async function save() {
  const id = getCurrentInstance().router?.params.id;
  if (id) {
    article.id = Number(id);
    await updateAritcleApi(article);
  } else {
    await addAritcleApi(article);
  }
  showToast({
    title: "保存成功",
    icon: "success",
  });
  navigateBack();
}

onMounted(() => {
  eventCenter.on(getCurrentInstance().router?.onShow, async () => {
    const id = getCurrentInstance().router?.params.id;
    if (id) {
      const res = await getAritcleDetailApi({ id: Number(id) });
      Object.assign(article, res);
      filelist.value[0].url = res.pic;
      console.log(filelist.value[0].url);
      
    }
  });
});
</script>

<style lang="scss">
.nut-uploader__upload,
.nut-uploader__preview-img,
.nut-uploader__preview {
  width: 100%;
}
</style>
