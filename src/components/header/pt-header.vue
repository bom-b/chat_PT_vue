<style>
.router-link {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 링크 색상 유지 */
}
</style>
<template>
<nav class="navbar navbar-expand-sm navbar-light bg-light" style="min-height: 80px;">
  <div class="container-fluid">
    <router-link to="/pt_home" class="router-link">
      <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
      <a class="navbar-brand">Chat PT</a>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link to="/about" class="router-link">
            <a class="nav-link" href="javascript:void(0)">회원 관리</a>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(0)">Link</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="text" placeholder="Search">
        <button class="btn btn-primary" type="button">Search</button>
      </form>
    </div>
  </div>
</nav>
</template>
<script>
  export default {
    name: "app-header",
  };
</script>