import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import router from "./routes";
import SvgIcon from 'vue3-icon';

createApp(App)
  .use(router)
  .component('svg-icon', SvgIcon)
  .mount('#app');
