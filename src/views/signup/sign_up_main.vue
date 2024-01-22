<template>
  <main>
    <div class="section1400">
      <div id="box">
        <h2 id="title" class="mb-5" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">
          가입할 <span class="highlight">유형</span>을 선택해주세요.
        </h2>
        <div class="row" style="text-align: center; margin: auto; padding-bottom: 50px;">
          <router-link to="/signUp/sign_up" class="col-md-6 col-sm-12 router-link"
            style="display: flex; justify-content: center; margin: auto">
            <div class="goal-box" style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              " data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block">일반회원</p>
              <img class="" src="../../../public/assets/img/graphic/normal-user.png" alt="" style="width: 60px" />
            </div>
          </router-link>
          <router-link to="/signUp/pt_sign_up" class="col-md-6 col-sm-12 router-link"
            style="display: flex; justify-content: center; margin: auto">
            <div class="goal-box" style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              " data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block">
                트레이너회원
              </p>
              <img class="" src="../../../public/assets/img/graphic/trainer-user.png" alt="" style="width: 60px" />
            </div>
          </router-link>
        </div>
        <div id="kakao-box" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">
          <p id="title" class="mb-4" style="color: #525f5e">
            간편하게 가입하고 로그인해보세요.
          </p>
          <img @click="kakaoLogin" class="kakao-login-btn" src="../../assets/img/kakao_login_medium_narrow.png" alt="">
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.goal-box {
  width: 250px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin: auto;
  border: 1px solid #f0f2f1;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

.highlight {
  color: #00997b;
}

.goal-box:hover {
  background-color: #f0f2f1;
  /* 마우스를 올릴 때 바뀔 배경색 설정 */
}

.kakao-login-btn:hover {
  cursor: pointer;
}

#kakao-box {
  margin-top: 100px;
}

@media (max-width: 768px) {
  .goal-box {
    margin-top: 25px;
  }

  #title {
    margin-top: 30px;
  }

  #kakao-box {
    margin-top: 0px;
    margin-bottom: 60px;
  }

}
</style>
<script>
export default {
  methods: {
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
  }
}
</script>
