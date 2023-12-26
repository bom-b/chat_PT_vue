<style>
.router-link {
  text-decoration: none;
  /* 밑줄 제거 */
  color: inherit;
  /* 기본 링크 색상 유지 */
}

</style>

<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light" style="min-height: 80px;">
    <div class="container-fluid">
      <router-link to="/d_home" class="router-link">
        <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
        <a class="navbar-brand">Chat PT</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/pt_members" class="router-link">
              <a class="nav-link" href="javascript:void(0)">수강회원 관리</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pt_schedule" class="router-link">
              <a class="nav-link" href="javascript:void(0)">스케줄 관리</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pt_profile" class="router-link">
              <a class="nav-link" href="javascript:void(0)">프로필 관리</a>
            </router-link>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-primary" type="button">로그인</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
