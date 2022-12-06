export default defineAppConfig({
  pages: ["pages/index/index","pages/mine/index"],
  tabBar: {
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath:"assets/home.png",
        selectedIconPath:"assets/home-a.png",
      },
      {
        text: "我的预约",
        pagePath: "pages/mine/index",
        iconPath:"assets/mine.png",
        selectedIconPath:"assets/mine-a.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
