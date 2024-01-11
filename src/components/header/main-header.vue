<style lang="scss" scoped>

nav {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.container-fluid {
  background-color: rgba(255, 255, 255, 0) !important;

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

.nav-link {
  color: white;
}

.btn-login {
  background-color: #e5f5f2;
  color: #085c57;
  border-radius: 15px;
  opacity: 0.5;
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

a:hover {
  color: #00997b;
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
</style>

<template>
  <nav class="navbar navbar-expand-sm fixed-top" style="min-height: 80px;">
    <div class="container-fluid">
      <router-link to="/" class="router-link">
        <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
        <a class="navbar-brand TheJamsil400" style="font-weight: bold; color: white;">Chat <span class="TheJamsil400 pine_Green_text" style="font-weight: bold;">PT</span></a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in navLinks" :key="link.name">
            <router-link :to="link.route" class="nav-link" :class="{ activeLink: currentRoute === link.route }">{{ link.name }}</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <router-link to="/login" class="router-link">
            <button class="btn btn-login btn-signature" type="button">로그인</button>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
      navLinks: [
        { name: '회원가입', route: '/signUp/sign_up_main' },
      ],
      currentRoute: this.$route.path
    };
  },
  watch: {
    '$route'(newRoute) {
      this.currentRoute = newRoute.path;
    }
  }
};
</script>

