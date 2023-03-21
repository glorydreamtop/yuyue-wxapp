interface singleRoom {
  id: number;
  name: string;
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
  inuse: number;
  morning: number;
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
