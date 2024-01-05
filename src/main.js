import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos';
import "aos/dist/aos.css";
import '@/../public/assets/css/global-style.css';
import '@/../public/assets/css/button-style.css';
import 'material-icons/iconfont/material-icons.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "xe-utils";
import vxetable from "vxe-table";
import "vxe-table/lib/style.css";



const app = createApp(App);
app.use(vxetable);
app.use(router);
app.use(store);
app.use(vxetable);

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 페이지 테스트
//app.component('PagiNate', Paginate)

app.mount('#app');

// 1229 머지
