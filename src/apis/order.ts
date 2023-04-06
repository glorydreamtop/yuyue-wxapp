import { defHttp } from "@/utils/http";

export async function getMyOrderList() {
  const list = await defHttp.get<singleOrder[]>({
    url: "/order/mylist",
  });
  return list;
}

export async function getAllOrderList() {
  const list = await defHttp.get<singleOrder[]>({
    url: "/order/all",
  });
  return list;
}

export async function addOrder(data: Partial<singleOrder>) {
  const order = await defHttp.post<singleOrder>({
    url: "/order/add",
    data,
  });
  return order;
}

export async function updateOrder(data: Partial<singleOrder>) {
  const order = await defHttp.post<singleOrder>({
    url: "/order/update",
    data,
  });
  return order;
}