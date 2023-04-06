export const rangeSet = [
  "",
  "7:30-9:30",
  "10:00-12:00",
  "14:00-16:00",
  "16:30-18:30",
];

export function orderStateFilter(inuse: number) {
  return ["已使用", "未签到", "已拒绝", "已过期"][inuse];
}
