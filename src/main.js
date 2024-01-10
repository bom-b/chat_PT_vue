import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos';
import VueSweetalert2 from 'vue-sweetalert2';
import sweetalertOptions from '@/../public/assets/js/sweetalertOptions.js';
import axiosInstance from './utils/apiClient.js';
import "aos/dist/aos.css";
import '@/../public/assets/css/global-style.css';
import '@/../public/assets/css/button-style.css';
import 'material-icons/iconfont/material-icons.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "xe-utils";
import vxetable from "vxe-table";
import "vxe-table/lib/style.css";
// import axios from 'axios'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(vxetable);
app.use(router);
app.use(store);
app.use(vxetable);
app.use(VueSweetalert2, sweetalertOptions);

// axios 전역변수 등록. 헤더에 토큰값을 적재하기 위해서 해당 $axios를 사용해야함.
app.config.globalProperties.$axios = axiosInstance;

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 페이지 테스트
//app.component('PagiNate', Paginate)

app.mount('#app');
