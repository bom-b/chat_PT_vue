<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

.login-container {
  max-width: 400px;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-login {
  width: 100%;
}
</style>
<template>
<div class="container">
  <div class="login-container">
    <h2 class="mb-4">Login</h2>

    <!-- 아이디 및 비밀번호 입력 폼 -->
    <form>
      <div class="form-group">
        <label for="username">아이뒤:</label>
        <input type="text" class="form-control" id="username" placeholder="Enter your username">
      </div>

      <div class="form-group">
        <label for="password">뺴쓰워드:</label>
        <input type="password" class="form-control" id="password" placeholder="Enter your password">
      </div>

      <!-- 로그인 버튼 -->
      <router-link to="d_home" class="router-link">
        <button type="button" class="btn btn-primary btn-login">일반사용자로 로그인</button>
      </router-link>
      <router-link to="pt_home" class="router-link">
        <button type="button" class="btn btn-success btn-login">PT 선생님 회원으로 로그인</button>
      </router-link>
    </form>
  </div>
</div>
</template>
<script>
  export default {};
</script>
