<style>
.login-container {
  max-width: 400px;
  margin: auto;
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
<main>
    <div class="login-container">
      <h2 class="mb-4">Login</h2>

      <!-- 아이디 및 비밀번호 입력 폼 -->
      <form >
        <div class="form-group">
          <label for="username">아이디:</label>
          <input type="text" class="form-control" id="username" placeholder="Enter your username">
        </div>

        <div class="form-group">
          <label for="password">패스워드:</label>
          <input type="password" class="form-control" id="password" placeholder="Enter your password">
        </div>

        <!-- 로그인 버튼 -->
        <div>
          <a class="icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="/sign_up">
            회원가입
          </a>

          <span style="margin-right: 10px; margin-left: 10px;"> | </span> <!-- 공백을 위한 span 태그 -->

          <a class="icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="/pt_sign_up">
            PT쌤 회원가입
          </a>
          <br>
          <a class="icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="#">
            아이디/패스워드 찾기
          </a>



          <!-- <a class="" href="#">아이디/패스워드 찾기</a> -->
          <router-link to="d_home" class="router-link">
            <img src="../../assets/img/kakao_login_medium_wide.png">
          </router-link>
          <router-link to="d_home" class="router-link">
            <button type="button" class="btn btn-primary btn-login">일반사용자로 로그인</button>
          </router-link>
          <router-link to="pt_home" class="router-link">
            <button type="button" class="btn btn-success btn-login">PT 선생님 회원으로 로그인</button>
          </router-link>
        </div>
      </form>
    </div>
</main>
</template>
<script>

export default {

};
</script>
<style>
.arrow {
  display: inline-block;
  transition: transform 0.5s ease;
  /* 부드러운 전환 효과 */
}

.signup-link:hover .arrow {
  transform: translateX(-5px);
  /* 호버시 왼쪽으로 5픽셀 이동 */
}
</style>
