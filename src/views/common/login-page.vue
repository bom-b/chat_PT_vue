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
        <div>
          <a class="icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="/sign_up">
            회원가입            
          </a>
          <br>
          <a class="icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="#">
            아이디/패스워드 찾기            
          </a>
          


          <!-- <a class="" href="#">아이디/패스워드 찾기</a> -->
          <router-link to="d_home" class="router-link">
            <button type="button" class="btn btn-primary btn-login">일반사용자로 로그인</button>
          </router-link>
          <router-link to="pt_home" class="router-link">
            <button type="button" class="btn btn-success btn-login">PT 선생님 회원으로 로그인</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.arrow {
  display: inline-block;
  transition: transform 0.5s ease; /* 부드러운 전환 효과 */
}

.signup-link:hover .arrow {
  transform: translateX(-5px); /* 호버시 왼쪽으로 5픽셀 이동 */
}
</style>