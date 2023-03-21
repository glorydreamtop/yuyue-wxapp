import { defHttp } from "@/utils/http";

export async function getArticleListApi() {
  const list = await defHttp.get<singleArticle[]>({
    url: "/article/list",
  });
  return list;
}

export async function addAritcleApi(data: Partial<singleArticle>) {
  const order = await defHttp.post({
    url: "/article/add",
    data,
  });
  return order;
}

export async function updateAritcleApi(data: singleArticle) {
  const order = await defHttp.post({
    url: "/article/update",
    data,
  });
  return order;
}

export async function delAritcleApi(data: Partial<singleArticle>) {
  const order = await defHttp.post({
    url: "/article/del",
    data,
  });
  return order;
}

export async function getAritcleDetailApi(data: {id:number}) {
  const order = await defHttp.get({
    url: "/article/detail",
    data,
  });
  return order;
}
