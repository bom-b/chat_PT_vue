<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light "
       style="min-height: 80px; !important;">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in navLinks" :key="link.name">
            <router-link :to="link.route" class="nav-link" :class="{ activeLink: currentRoute === link.route }">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        { name: '변화추이', route: '/default/d_a_change' },
        { name: '영양균형', route: '/default/d_a_balance' },
        { name: '식사기록', route: '/default/d_a_record' }
      ]
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.activeLink {
  color: #085c57;
}

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
</style>