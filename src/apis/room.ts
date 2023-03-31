import { defHttp } from "@/utils/http";

export async function getRoomInfo(data: { id: number }) {
  const room = await defHttp.get<roomInfo>({
    url: "/room/roomInfo",
    data,
  });
  return room;
}

export async function delRoom(data: { id: number }) {
  return defHttp.post({
    url: "/room/del",
    data,
  });
}

export async function getRoomDateList(data: {
  roomId: number;
  range: number;
  startDate:string;
  endDate:string;
}) {
  const list = await defHttp.get<{ date: string; amount: number }[]>({
    url: "/room/roomDateList",
    data,
  });
  return list;
}

export async function addRoomDateList(data: {
  roomId: number;
  startDate: string;
  endDate: string;
  range: number;
}) {
  const res = await defHttp.post<string>({
    url: "/room/createRoomDate",
    data,
  });
  return res;
}

export async function updateRoomDate(data: {
  roomId: number;
  date: string;
  range: number;
  amount:number;
}) {
  const res = await defHttp.post<string>({
    url: "/room/updateRoomDate",
    data,
  });
  return res;
}

export async function getRoomList(data: {
  building: number;
  date: string;
  range: number;
}) {
  const list = await defHttp.get<singleRoom[]>({
    url: "/room/availableRoomList",
    data,
  });
  return list;
}

export async function getBuildingRoomList(data: { building: number }) {
  const list = await defHttp.get<singleRoom[]>({
    url: "/room/roomList",
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

export async function addRoom(roomInfo: Partial<roomInfo>) {
  return defHttp.post<roomInfo>({
    url: "/room/add",
    data: roomInfo,
  });
}
