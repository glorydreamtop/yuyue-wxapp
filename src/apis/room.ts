import { defHttp } from "@/utils/http";

export async function getRoomList(data: {
  building: number;
  date: string;
  morning: number;
}) {
  const list = await defHttp.get<singleRoom[]>({
    url: "/room/availableRoomList",
    data,
  });
  return list;
}

export async function getBuildingList() {
  const list = await defHttp.get<buildingInfo[]>({
    url: "/room/buildingList",
  });
  return list;
}
