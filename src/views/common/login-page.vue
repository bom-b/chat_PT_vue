<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
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

form {
  padding: 2rem;
}

#select-tap {

}

.tab-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.tab-button {
  width: 200px;
  height: 60px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #dee2e6;
  color: #495057;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#tab-left {
  border-top-left-radius: 5px;
}

#tab-right {
  border-top-right-radius: 5px;
}

.tab-button:hover {
  background-color: #ced4da;
}

.tab-button.active {
  background-color: #ffffff;
  color: #000000;
}

.form-group {
  margin-bottom: 20px;
}

.kakao-login-btn {
  width: 170px;
}

.kakao-login-btn:hover {
  cursor: pointer;
}

.login-btn {
  background-color: #c0e0d6;
  color: #085c57;
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  height: 42px;
  width: 170px;
  transition: background-color 0.3s ease, color 0.3s ease ;
}

.login-btn:hover {
  background-color: #b0d5c8;
  transition: background-color 0.3s ease, color 0.3s ease ;
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

a {
  text-decoration: none;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  #left-icon {
    display: none;
  }
  #right-icon {
    display: none;
  }
}

</style>
<template>
  <main id="mainContainer" style="background-color: #428176;">
    <img id="left-icon" src="../../../public/assets/img/graphic/login_left.png">
    <img id="right-icon" src="../../../public/assets/img/graphic/login_right.png">
    <div class="section1400">
      <div class="login-container">
        <div id="select-tap" class="tab-container">
          <button id="tab-left" class="tab-button" :class="{active : selectedTab === 'NORMAL'}"
                  @click="selectTab('NORMAL')">회원 로그인
          </button>
          <button id="tab-right" class="tab-button" :class="{active : selectedTab === 'ADMIN'}"
                  @click="selectTab('ADMIN')">관리자 로그인
          </button>
        </div>

        <!-- 회원 로그인 -->
        <form v-if="selectedTab === 'NORMAL'" id="loginForm" @submit.prevent="login" style="text-align: left;">
          <div class="form-group">
            <label for="username">아이디:</label>
            <input v-model="user.userName" type="text" class="form-control" id="username"
                   placeholder="테스트용 ID: 1">
          </div>

          <div class="form-group">
            <label for="password">패스워드:</label>
            <input v-model="user.password" type="password" class="form-control" id="password"
                   placeholder="테스트용 PW: 1">
          </div>

          <!--     아이디 저장     -->
          <div class="form-group">
            <input type="checkbox" id="save-id" v-model="saveId">
            <label for="save-id" style="margin-left: 0.3rem;">아이디 기억하기</label>
          </div>

          <!--     로그인 버튼     -->
          <div class="mt-5" style="text-align: center">
            <div>
              <button type="submit" class="mb-2 login-btn">로그인</button>
            </div>
            <div>
              <img @click="kakaoLogin" class="kakao-login-btn" src="../../assets/img/kakao_login_medium_narrow.png" alt="">
            </div>
          </div>

          <!-- 회원가입 / 아이디 비번 찾기-->
          <div class="mt-5">
            <a class="mt-3 icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;"
               href="/signUp/sign_up_main">
              회원가입
            </a>
            <br>
            <a class="mt-2 icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;"
               href="/service/find_id">
              아이디 찾기
            </a>
            <span> | </span>
            <a class="mt-2 icon-link icon-link-hover" style="--bs-link-hover-color-rgb: 25, 135, 84;"
               href="/service/find_pw">
              비밀번호 찾기
            </a>
          </div>
        </form>

        <!-- 관리자 로그인 -->
        <form v-else id="loginForm" @submit.prevent="admin_login" style="text-align: left;">
          <div class="form-group">
            <label for="username">아이디:</label>
            <input v-model="admin.userName" type="text" class="form-control" id="username"
                   placeholder="아이디를 입력해주세요.">
          </div>

          <div class="form-group">
            <label for="password">패스워드:</label>
            <input v-model="admin.password" type="password" class="form-control" id="password"
                   placeholder="비밀번호를 입력해주세요.">
          </div>

          <!--     로그인 버튼     -->
          <div class="mt-5" style="text-align: center">
            <div>
              <button type="submit" class="mb-2 btn-signature login-btn">로그인</button>
            </div>
          </div>

        </form>

      </div>
    </div>
  </main>
</template>
<script>
import AuthService from "@/services/AuthService";
import AdminService from "@/services/AdminService";
import router from "@/router";

export default {
  data() {
    return {
      user: {
        userName: '',
        password: '',
      },
      admin: {
        userName: '',
        password: '',
      },
      // 탭 상태
      selectedTab: 'NORMAL',
      // 아이디 저장 여부
      saveId: false,
    }
  },
  setup() {
    // 이 함수는 메인 페이지에 정의되어 있어야 합니다.
    // 함수를 전역으로 등록하려면 다음과 같이 window 객체에 추가할 수 있습니다.
    // 하지만 이는 일반적인 Vue 패턴이 아니며, 가능하면 피해야 합니다.
    window.handleKakaoResponse = (isSign, token, email, nickname, profileImage) => {
      if (isSign) {
        // 이미 회원가입이 되어 있는 경우
        localStorage.setItem('jwtToken', token);
        // 로그인 성공 후 메인 페이지로 리디렉션
        router.push('/');
      } else {
        // 회원가입이 필요한 경우
        // 회원가입 페이지로 리디렉션하거나
        // 회원가입에 필요한 데이터를 로컬 스토리지에 저장
        localStorage.setItem('kakaoSignupEmail', email);
        localStorage.setItem('kakaoSignupNickname', nickname);
        localStorage.setItem('kakaoSignupProfileImage', profileImage);
        // 회원가입 페이지로 리디렉션
        router.push('/signup');
      }
    };
  },
  mounted() {
    this.setMainHeight();
    window.addEventListener('resize', this.setMainHeight);

    // 저장된 아이디가 있을 경우
    if (localStorage.getItem('savedId')) {
      this.user.userName = localStorage.getItem('savedId');
      this.saveId = true;
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.setMainHeight);
  },
  methods: {
    selectTab(tabName) {
      this.selectedTab = tabName;
    },
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

            // 에러처리
            if (response.data.error === "로그인 실패") {
              this.$swal.fire('', '아이디 또는 비밀번호가 일치하지 않습니다.', 'warning');
              this.user.password = '';
            } else if (response.data.error === "관리자 로그인 이용 필요") {
              this.$swal.fire('', '관리자 로그인을 이용해주세요.', 'warning');
              this.user.userName = '';
              this.user.password = '';
            }

            // 응답에 토큰이 있다면
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
              }

              // 아이디를 저장한다고 체크했을 경우 localStorage에 아이디를 저장
              if (this.saveId) {
                localStorage.setItem('savedId', this.user.userName);
              } else {
                localStorage.removeItem('savedId');
              }
            }
          })
          .catch(() => {
            this.$swal.fire('', '서버와의 연결이 원활하지 않습니다..', 'warning');
          });
    },
    admin_login() {
      // 위 코드 복붙해서 구현해주시면 될거같아요
      console.log("UserName  : " + this.admin.userName);
      console.log("password : " + this.admin.password);
      if (!this.admin.userName) {
        this.$swal.fire('', '아이디를 입력해주세요.');
        return;
      } else if (!this.admin.password) {
        this.$swal.fire('', '비밀번호를 입력해주세요.');
        return;
      }

      AdminService.login(this.admin)
          .then((response) => {
        if (response.data.token != null) {
          console.log('응답 : ' + response.data);
          window.localStorage.clear();
          window.localStorage.setItem('jwtToken', response.data.token);
          window.localStorage.setItem('role', response.data.role);

          const role = response.data.role;
          if (role === 'ADMIN') {
            window.location.href = '/admin/a_userList';
          }
        }
      })
          .catch(() => {
            this.$swal.fire('', '아이디 또는 비밀번호가 일치하지 않습니다.', 'warning');
            // 비밀번호 초기화
            this.user.password = '';
          });
    },
    kakaoLogin() {
      const REST_API_KEY = 'aa7e1b658afaea7d32248761c5aed3ef';
      const REDIRECT_URI = this.$vueBaseURL + '/service/kakaojoin';

      // 새 창의 크기
      const width = 500;
      const height = 800;

      // 새 창의 옵션
      const windowFeatures = `width=${width},height=${height},resizable=yes,scrollbars=yes,status=yes`;
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`, 'kakaoLogin', windowFeatures;

    }
  },
  computed: {}
};
</script>
