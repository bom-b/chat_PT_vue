<style lang="scss" scoped>
nav {
  opacity: 1;
}

.container-fluid {
  max-width: 1800px;
  margin: 0 auto;
  text-align: center;
}

.router-link {
  text-decoration: none;
  /* 밑줄 제거 */
  color: inherit;
  /* 기본 링크 색상 유지 */
}

.btn-login {
  background-color: #c0e0d6;
  color: #085c57;
  border-radius: 15px;
  transition: background-color 0.3s ease, color 0.3s ease ;
}

.btn-login:hover {
  background-color: #b0d5c8;
  transition: background-color 0.3s ease, color 0.3s ease ;
}


.profile-img-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  .btn-login {
    margin-top: 50px;
  }
}

.activeLink {
  color: #085c57;
}

.nav-link {
  font-weight: bold;
}

</style>
<style lang="scss" scoped>

.floating-widget { // [st]마이페이지 위젯 스타일링
  position: fixed;
  top: 100px;
  right: 20px;

  padding: 10px;
  background-color: rgba(255, 255, 255);
  border: 1px solid #ccc;
  opacity: 1;
}
</style>

<template>
  <nav
      class="navbar navbar-expand-sm navbar-light bg-light fixed-top"
      style="min-height: 80px; background-color: white !important"
  >
    <div class="container-fluid">
      <router-link to="/default/d_home" class="router-link">
        <img
            src="../../assets/img/배경지운 로고.png"
            alt=""
            style="width: 50px"
        />
        <a class="navbar-brand TheJamsil400" style="font-weight: bold"
        >Chat
          <span class="TheJamsil400 pine_Green_text" style="font-weight: bold"
          >PT</span
          ></a
        >
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in navLinks" :key="link.name">
            <router-link
                :to="link.route"
                class="nav-link"
                :class="{ activeLink: currentRoute === link.route }"
            >{{ link.name }}
            </router-link
            >
          </li>
        </ul>
        <!-- [st]위젯 -->

        <button @click="toggleWidget" class="btn">
          {{ widgetVisible ? "❌ 닫기" : nickname + "님의 마이페이지" }}
        </button>

        <div v-if="widgetVisible" class="floating-widget" :style="{ width: widgetWidth, height: widgetHeight }">
          <!-- <div v-if="widgetVisible" class="floating-widget"> -->
          <!-- 위젯 내용 -->
          <WidgetContent :widgetVisible="widgetVisible"/>
        </div>

        <!-- [ed]위젯 -->

        <div class="profile-img-container d-flex" style="margin-right: 20px">
          <img
              class="profile-img"
              src="../../assets/img/코딩춘식.jpeg"
              alt=""
              style="width: 32px; object-fit: contain"
              @click="mypage_edit"
          />
        </div>
        <form class="d-flex">
          <button @click="logout" class="btn btn-login" type="button">로그아웃</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import WidgetContent from "@/components/header/mypage/WidgetContent.vue";
import {ref} from "vue";
import router from "@/router";

export default {

  name: "app-header",

  components: {
    WidgetContent, // 마이페이지 위젯사용을 위한 추가
  },

  computed: {
    nickname() {
      return window.localStorage.getItem('nickname');
    }
  },

  setup() { // useRoute, useRouter 대신 VueRouter.createRouter를 사용합니다.
    const isLoggedIn = ref(!!localStorage.getItem("jwtToken"));

    const logout = () => {
      window.localStorage.removeItem('jwtToken');
      window.localStorage.removeItem('nickname');
      window.localStorage.removeItem('role');
      isLoggedIn.value = false; // isLoggedIn 상태를 업데이트
      router.push("/");
    };

    return {isLoggedIn, logout};
  },

  data() {
    return {
      navLinks: [
        {name: "카카오톡 채널", route: "/default/d_kakao"},
        {name: "식단등록", route: "/default/d_upload_main"},
        {name: "식단 추천 받기", route: "/default/d_recommand"},
        {name: "식단 분석", route: "/default/d_a_change_calory"},
        {name: "트레이너 찾기", route: "/default/d_find_trainer"},
        {name: "마이페이지 수정", route: "/default/d_member_edit"},
      ],
      currentRoute: this.$route.path,
      widgetVisible: false, // 마이페이지 위젯
      widgetWidth: "960px", // 마이페이지 위젯 
      widgetHeight: "607px", // 마이페이지 위젯
    };
  },
  mounted() { //마이페이지 위젯
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // 초기 렌더링 시 호출
  },
  unmounted() { //마이페이지 위젯
    window.removeEventListener('resize', this.handleResize);
  },

  watch: {
    $route(newRoute) {
      this.currentRoute = newRoute.path;
    },
  },

  methods: { //마이페이지 위젯 사용을 위해 추가
    toggleWidget() {
      this.widgetVisible = !this.widgetVisible;
    },
    handleResize() {
      // 창 크기 변화 감지
      this.widgetWidth = window.innerWidth > 768 ? '960px' : '468px';
      this.widgetHeight = window.innerWidth > 768 ? '607px' : '750px';
      // 원하는 조건에 따라 크기를 동적으로 변경할 수 있습니다.
    },
  },
};
</script>

