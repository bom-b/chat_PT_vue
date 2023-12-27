<style lang="scss" scoped>


nav {
  opacity: 0.9;
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
  background-color: #e5f5f2;
  color: #085c57;
  border-radius: 15px;
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
</style>

<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top" style="min-height: 80px; background-color: white !important;">
    <div class="container-fluid">
      <router-link to="/d_home" class="router-link">
        <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
        <a class="navbar-brand TheJamsil400" style="font-weight: bold;">Chat <span class="TheJamsil400 pine_Green_text" style="font-weight: bold;">PT</span></a>
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
        <div class="profile-img-container d-flex" style="margin-right: 20px;">
          <img class="profile-img" src="../../assets/img/코딩춘식.jpeg" alt="" style="width: 32px; object-fit: contain;">
        </div>
        <form class="d-flex">
          <router-link to="/" class="router-link">
            <button class="btn btn-login" type="button">로그아웃</button>
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
        { name: '카카오톡 채널', route: '/d_kakao' },
        { name: '식단등록', route: '/d_upload' },
        { name: '식단 추천 받기', route: '/pt_schedule' },
        { name: '식단 분석', route: '/d_a_change' },
        { name: '트레이너 찾기', route: '/d_find_trainer' }
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

