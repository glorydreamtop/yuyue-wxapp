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