<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  width: 400px;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  margin-top: 150px;
  margin-bottom: 150px;
}

.form-group {
  margin-bottom: 20px;
}

.kakao-login-btn {
  width: 170px;
}

.login-btn {
  background-color: #e5f5f2;
  color: #085c57;
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  height: 42px;
  width: 170px;
}

main {
  text-align: right;
  position: relative;
}

#left-icon {
  text-align: right;
  width: 220px;
  position: absolute;
  bottom: 0;
  left: 0;
}

#right-icon {
  text-align: right;
  width: 400px;
  position: absolute;
  bottom: 0;
  right: 0;
}

</style>
<template>
  <main id="mainContainer" style="background-color: #428176;">
    <img id="left-icon" src="../../../public/assets/img/graphic/login_left.png">
    <img id="right-icon" src="../../../public/assets/img/graphic/login_right.png">
    <div class="section1400">
      <div class="login-container">
        <h2 class="mb-4 TheJamsil400 pine_Green_text mt-2 mb-5">Login</h2>

        <!-- 아이디 및 비밀번호 입력 폼 -->
        <form style="text-align: left;">
          <div class="form-group">
            <label for="username">아이디:</label>
            <input v-model="userType" type="text" class="form-control" id="username"
                   placeholder="일반유저: 1, PT쌤: 2, 관리자: 3 으로 로그인해주세요.">
          </div>

          <div class="form-group">
            <label for="password">패스워드:</label>
            <input type="password" class="form-control" id="password" placeholder="비밀번호는 입력할 필요 없습니다.">
          </div>

          <!--     로그인 버튼     -->
          <div class="mt-5" style="text-align: center">
            <div>
              <router-link :to="getRouterLink" class="router-link">
                <button type="button" class="mb-2 btn-signature login-btn">로그인</button>
              </router-link>
            </div>
            <!--            <div>-->
            <!--              <router-link to="pt_home" class="router-link">-->
            <!--                <button type="button" class="btn-signature login-btn">PT 선생님 회원으로 로그인</button>-->
            <!--              </router-link>-->
            <!--            </div>-->
            <router-link to="d_home" class="router-link">
              <img class="kakao-login-btn" src="../../assets/img/kakao_login_medium_narrow.png">
            </router-link>
          </div>

          <!-- 회원가입 / 아이디 비번 찾기-->
          <div class="mt-5">
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
          </div>


        </form>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      userType: '', // 입력된 아이디 정보임
    }
  },
  mounted() {
    this.setMainHeight();
    window.addEventListener('resize', this.setMainHeight);
  },
  unmounted() {
    window.removeEventListener('resize', this.setMainHeight);
  },
  methods: {
    setMainHeight() { // 로그인 페이지의 높이를 동적으로 조절하기 위한 메서드
      const loginContainer = document.querySelector('.login-container');
      const mainContainer = document.getElementById('mainContainer');
      if (loginContainer && mainContainer) {
        const margins = parseInt(getComputedStyle(loginContainer).marginTop) +
            parseInt(getComputedStyle(loginContainer).marginBottom);
        mainContainer.style.height = loginContainer.offsetHeight + margins + 'px';
      }
    },
    getTokken() { // 로그인 버튼을 눌렀을 때, 토큰을 받아오는 메서드
      this.$axios
          .post("http://localhost/login", this.formData, {
          })
          .then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.log(error.message);
          });
    }
  },
  computed: {
    getRouterLink() {
      switch (this.userType) {
        case '1':
          return 'd_home';
        case '2':
          return 'pt_home';
        case '3':
          return 'a_userList';
        default:
          return 'd_home';
      }
    }
  }
};
</script>
