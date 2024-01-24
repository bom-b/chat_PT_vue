<style lang="scss" scoped>
nav {
  opacity: 1;
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

.nav-link {
  font-weight: bold;
}

</style>
<style lang="scss" scoped>

.floating-widget { // [st]마이페이지 위젯 스타일링
  position: fixed;
  top: 100px;
  right: 20px;

  padding: 10px;
  background-color: rgba(255, 255, 255);
  border: 1px solid #ccc;
  opacity: 1;
}
</style>

<template>
  <nav
      class="navbar navbar-expand-sm navbar-light bg-light fixed-top"
      style="min-height: 80px; background-color: white !important"
  >
    <div class="container-fluid">
      <router-link to="/d_home" class="router-link">
        <img
            src="../../assets/img/배경지운 로고.png"
            alt=""
            style="width: 50px"
        />
        <a class="navbar-brand TheJamsil400" style="font-weight: bold"
        >Chat
          <span class="TheJamsil400 pine_Green_text" style="font-weight: bold"
          >PT</span
          ></a
        >
      </router-link>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in navLinks" :key="link.name">
            <router-link
                :to="link.route"
                class="nav-link"
                :class="{ activeLink: currentRoute === link.route }"
            >{{ link.name }}
            </router-link
            >
          </li>
        </ul>
        <div class="profile-img-container d-flex" style="margin-right: 20px">
          <img
              class="profile-img"
              :src="`${this.$s3BaseURL}/normal_user/profile_img/${userInfo.nm_PROFILEIMG}`"
              alt="adsf"
              style="width: 32px; object-fit: contain"
          />
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
  components: {

  },
  name: "app-header",
  data() {
    return {
      navLinks: [
        {name: "회원 관리", route: "/admin/a_userList"},
        {name: "데이터 관리", route: "/admin/a_checkFood"},
        {name: "신고 관리", route: "/admin/a_report"},
      ],
      userInfo: {
      },
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods:{
    fetchUserInfo() {
      // Axios를 사용하여 사용자 정보 가져오기
      this.$axios
        .get("/getuserInfo")
        .then((response) => {
          const userData = response.data[0]; // 데이터 배열의 첫 번째 요소를 사용
          this.userInfo = {
            // ID: userData.id,
            // // EMAIL: userData.email,
            // // PASSWORD: userData.password,
            // NICKNAME: userData.nickname, // 닉네임 필드가 name으로 가정
            // name:userData.name,
            // gender: userData.gender,
            // role:  userData.role,
            // birth:  userData.birth,
            // target_WEIGHT:  userData.target_WEIGHT,
            // kakaocode:  userData.kakaocode,
            // height:  userData.height,
            // activity:  userData.activity ,
            // weight:  userData.weight,
            // purpose:  this.purposeToText(userData.purpose),// v-model 들어갈 데이터라 원본(purpose의 숫자형태) 보존안함
            // region: userData.region,
            nm_PROFILEIMG:  userData.nm_PROFILEIMG,
            // // 변환해서 저장할 데이터
            // age: this.calculateAge(userData.birth),

          };
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    // 생일 변환
    calculateAge(birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    },
    // 운동 목적 to TEXT
    purposeToText(purpose) {
      switch (purpose) {
        case 0:
          return "다이어트";
        case 1:
          return "체중유지";
        case 2:
          return "벌크업";
        default:
          return "알 수 없음"; // 기본값 처리
      }
    },
  },
  
  watch: {
    $route(newRoute) {
      this.currentRoute = newRoute.path;
    },
  },
};
</script>

