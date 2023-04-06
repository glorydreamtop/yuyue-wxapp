interface singleRoom {
  id: number;
  name: string;
  building: number;
  buildingName: string;
  amount: number;
  available: number;
}

interface userInfo {
  avatar: string;
  name: string;
  openid: string;
  age: number;
  inuse: number;
}

interface buildingInfo {
  id: number;
  name: string;
}

interface singleOrder {
  id: number;
  userId: string;
  date: string;
  roomId: number;
  roomName: string;
  buildingName:string;
  inuse: number;
  range: number;
  count: number;
  reason: string;
  userName?:string;
  creatTime: string;
}

interface roomInfo {
  id: number;
  name: string;
  amount: number;
  building: number;
  buildingName?: string;
}

interface singleArticle {
  id: number;
  title: string;
  pic: string;
  content: string;
}
