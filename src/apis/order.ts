import { defHttp } from "@/utils/http";

export async function getMyOrderList() {
  const list = await defHttp.get<singleOrder[]>({
    url: "/order/mylist",
  });
  return list;
}

export async function addOrder(data:{date:string,roomId:number,range:number}) {
  const order = await defHttp.post<singleOrder>({
    url: "/order/add",
    data
  });
  return order;
}
