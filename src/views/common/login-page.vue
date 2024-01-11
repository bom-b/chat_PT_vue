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
        <form id="loginForm" @submit.prevent="login" style="text-align: left;">
          <div class="form-group">
            <label for="username">아이디:</label>
            <input v-model="user.userName" type="text" class="form-control" id="username"
                   placeholder="아이디를 입력해주세요.">
          </div>

          <div class="form-group">
            <label for="password">패스워드:</label>
            <input v-model="user.password" type="password" class="form-control" id="password"
                   placeholder="비밀번호를 입력해주세요.">
          </div>

          <!--     로그인 버튼     -->
          <div class="mt-5" style="text-align: center">
            <div>
              <button type="submit" class="mb-2 btn-signature login-btn">로그인</button>
            </div>
            <router-link to="d_home" class="router-link">
              <img class="kakao-login-btn" src="../../assets/img/kakao_login_medium_narrow.png">
            </router-link>
          </div>

          <!-- 회원가입 / 아이디 비번 찾기-->
          <div class="mt-5">
            <a class="mt-3 icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="/signUp/sign_up_main">
              회원가입
            </a>
            <br>
            <a class="mt-2 icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="#">
              아이디/패스워드 찾기
            </a>
          </div>


        </form>
      </div>
    </div>
  </main>
</template>
<script>
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      user: {
        userName: '',
        password: '',
      }
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
    login() {
      // 로그인 버튼을 눌렀을 때, 토큰을 받아오는 메서드
      if (!this.user.userName) {
        this.$swal.fire('', '아이디를 입력해주세요.');
        return;
      } else if (!this.user.password) {
        this.$swal.fire('', '비밀번호를 입력해주세요.');
        return;
      }

      AuthService.login(this.user)
          .then((response) => {
        if (response.data.token != null) {
          // console.log('응답 : ' + response.data);
          window.localStorage.clear();
          window.localStorage.setItem('jwtToken', response.data.token);
          window.localStorage.setItem('role', response.data.role);

          const role = response.data.role;
          if (role === 'NORMAL') {
            window.localStorage.setItem('nickname', response.data.nickname);
            window.location.href = '/default/d_home';
          } else if (role === 'TRAINER') {
            window.localStorage.setItem('name', response.data.name);
            window.location.href = '/trainer/pt_home';
          } else if (role === 'ADMIN') {
            window.location.href = '/admin/a_userList';
          }
        }
      })
          .catch(() => {
            this.$swal.fire('', '아이디 또는 비밀번호가 일치하지 않습니다.', 'warning');
            // 비밀번호 초기화
            this.user.password = '';
          });
    }
  },
  computed: {}
};
</script>
