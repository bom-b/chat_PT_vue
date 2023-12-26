import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import AOS from 'aos'; // 스크롤 할때 애니메이션 보여주는 라이브러리
import "aos/dist/aos.css"; // 스크롤 할때 애니메이션 보여주는 라이브러리
import './assets/css/global-style.css'; // 전체 페이지에 적용할 css
import 'material-icons/iconfont/material-icons.css'; // 구글 아이콘 사용

// 테이블 추가
// import 'vxe-table/lib/style.css';
// import VXETable from 'vxe-table';

/*부트스트랩*/
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.use(router);
app.use(store);
// app.use(VXETable);
// app.use(BootstrapVue);
// app.use(IconsPlugin);
app.mount('#app');

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 페이지 테스트
app.component('PagiNate', Paginate)