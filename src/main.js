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
import axios from 'axios'

const app = createApp(App);
app.use(vxetable);
app.use(router);
app.use(store);
app.use(vxetable);

// axios 전역변수 등록
app.config.globalProperties.$axios=axios; // 전역변수 -> this.$axios
app.config.globalProperties.$serverUrl='http://localhost/springpt' //서버주소
const serverUrl = 'http://localhost/springpt'
// provide 함수는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 역할
// 자식 컴포넌트에서는 inject함수를 사용하여 해당 데이터를 찾아서 사용할 수 있다.
app.provide('$axios',axios)
app.provide('$serverUrl', serverUrl)

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 페이지 테스트
//app.component('PagiNate', Paginate)

app.mount('#app');
