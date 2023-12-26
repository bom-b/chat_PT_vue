import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos';
import "aos/dist/aos.css";
import './assets/css/global-style.css';
import 'material-icons/iconfont/material-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "xe-utils";
import vxetable from "vxe-table";
import "vxe-table/lib/style.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vxetable); 

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

app.mount('#app');