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
      <router-link to="/trainer/pt_home" class="router-link">
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
        <button class="btn">
          {{name}} 님
        </button>
        <div class="profile-img-container d-flex" style="margin-right: 20px">
          <img
              class="profile-img"
              src="../../assets/img/trainer1.jpg"
              alt=""
              style="width: 32px; object-fit: contain"
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
import {ref} from "vue";
import router from "@/router";

export default {
  name: "app-header",
  components: {},
  computed: {
    name() {
      return window.localStorage.getItem('name');
    }
  },
  setup() { // useRoute, useRouter 대신 VueRouter.createRouter를 사용합니다.
    const isLoggedIn = ref(!!localStorage.getItem("jwtToken"));

    const logout = () => {
      window.localStorage.removeItem('jwtToken');
      window.localStorage.removeItem('name');
      window.localStorage.removeItem('role');
      isLoggedIn.value = false; // isLoggedIn 상태를 업데이트
      router.push("/");
    };

    return {isLoggedIn, logout};
  },
  data() {
    return {
      navLinks: [
        {name: "수강회원 관리", route: "/trainer/pt_members"},
        {name: "스케줄 관리", route: "/trainer/pt_schedule"},
        {name: "프로필 관리", route: "/trainer/pt_profile"},
      ],
    };
  },
  watch: {
    $route(newRoute) {
      this.currentRoute = newRoute.path;
    },
  },
};
</script>

