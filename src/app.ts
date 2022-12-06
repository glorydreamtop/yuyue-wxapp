import { createApp } from "vue";
// import "@nutui/nutui-taro/dist/style.css";
import { Icon, Sticky,Button,List,Tabs,TabPane } from "@nutui/nutui-taro";

import "windi.css";
import "./app.scss";

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Icon).use(Sticky).use(Button).use(List).use(TabPane).use(Tabs);

export default App;
