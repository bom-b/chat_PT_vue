import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import AOS from 'aos';
import VueSweetalert2 from 'vue-sweetalert2';
import sweetalertOptions from '@/../public/assets/js/sweetalertOptions.js';
import AdminaxiosInstance from './utils/apiAdmin.js';
import axiosInstance from './utils/apiClient.js';
import axiosWithoutValidation from '@/utils/apiClientWithoutValidation.js';
import AdminaxiosWithoOutValidation from '@/utils/apiAdminWithoutValidation.js';
import "aos/dist/aos.css";
import '@/../public/assets/css/global-style.css';
import '@/../public/assets/css/button-style.css';
import 'material-icons/iconfont/material-icons.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "xe-utils";
import vxetable from "vxe-table";
import "vxe-table/lib/style.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 아이콘

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const app = createApp(App);
app.use(vxetable);
app.use(router);
app.use(store);
app.use(VueSweetalert2, sweetalertOptions);

// 웹사이트 베이스 주소
app.config.globalProperties.$vueBaseURL = 'http://www.chatpt.shop';

// 개발환경과 배포환경에서 동적으로 바뀌는 베이스 주소
app.config.globalProperties.$springBaseURL = process.env.VUE_APP_API_URL;

// s3 베이스 주소 (사진을 불러올때 사용)
app.config.globalProperties.$s3BaseURL = 'https://chat-pt.s3.ap-northeast-2.amazonaws.com';

// axios 전역변수 등록. 헤더에 토큰값을 적재하기 위해서 해당 $axios를 사용해야함.
// axios 요청이 일어날때 토큰의 유효성 검사도 함께 진행.
app.config.globalProperties.$axios = axiosInstance;

// 여전히 헤더에 토큰값은 적재하지만 토큰의 유효성 검사는 하지 않음.
app.config.globalProperties.$axiosWithoutValidation = axiosWithoutValidation;

// Admin axios 전역변수 등록
app.config.globalProperties.$Adminaxios = AdminaxiosInstance;

// Admin axios 토큰의 유효성 검사는 하지 않음.
app.config.globalProperties.$AdminaxiosWithoOutValidation = AdminaxiosWithoOutValidation

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 페이지 테스트
//app.component('PagiNate', Paginate)


  app.mount('#app');