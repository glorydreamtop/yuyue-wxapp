import { createApp } from "vue";
import { createPinia } from "pinia";
// import "@nutui/nutui-taro/dist/style.css";
import {
  Icon,
  Sticky,
  Button,
  List,
  Tabs,
  TabPane,
  Calendar,
  Popup,
  OverLay,
  Cell,
  Swiper,
  SwiperItem,
  Image,
  NumberKeyboard,
  Input,
  RadioGroup,
  Radio,
} from "@nutui/nutui-taro";
import { IconFont } from '@nutui/icons-vue-taro';

import "windi.css";
import "./app.scss";

const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia())
  .use(Icon)
  .use(Sticky)
  .use(Button)
  .use(List)
  .use(TabPane)
  .use(Tabs)
  .use(Calendar)
  .use(Popup)
  .use(OverLay)
  .use(Cell)
  .use(Swiper)
  .use(SwiperItem)
  .use(Image)
  .use(NumberKeyboard)
  .use(Input)
  .use(Radio)
  .use(RadioGroup).use(IconFont);

export default App;
