<template>
  <main>
    <div class="section1400">
      <div id="box">
        <div id="hello-box" data-aos="fade-in-up" data-aos-duration="1000" data-aos-delay="0">
          <h5 class="mb-2" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">
            <strong>{{ kakaoNickname || kakaoEmail }}</strong>님 안녕하세요!</h5>
          <h5 class="mt-3" style="white-space:nowrap;" data-aos="fade-in" data-aos-duration="1000"
              data-aos-delay="0"><span class="kakao-signup-text">카카오 간편가입 완료를 위해</span> 몇가지 정보를 더 알려주세요 🙂</h5>
        </div>
        <h2 class="mb-5" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">가입할 <span
            class="highlight">유형</span>을 선택해주세요.</h2>
        <div class="row" style="text-align: center; margin: auto; padding-bottom: 50px;">
          <router-link to="/signUp/sign_up" class="col-md-6 col-sm-12 router-link"
                       style="display: flex; justify-content: center; margin: auto;">
            <div class="goal-box "
                 style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">일반회원</p>
              <img class="" src="../../../public/assets/img/graphic/normal-user.png" alt="" style="width: 60px;">
            </div>
          </router-link>
          <router-link to="/signUp/kakao" class="col-md-6 col-sm-12 router-link"
                       style="display: flex; justify-content: center; margin: auto;">
            <div class="goal-box"
                 style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">트레이너회원</p>
              <img class="" src="../../../public/assets/img/graphic/trainer-user.png" alt="" style="width: 60px;">
            </div>
          </router-link>
        </div>
        <div id="cancel-box" class="mt-4" style="white-space:nowrap;">
          <a class="link" @click="disconnectKakao">카카오 정보 제공 철회를 원하시면 클릭해주세요.</a>
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

#cancel-box {
  padding-top: 50px;
}

#hello-box {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px;
  margin-bottom: 100px;
}

.goal-box {
  width: 250px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  border: 1px solid #f0f2f1;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  transition: background-color 0.2s ease;
  margin: auto;
}

.highlight {
  color: #00997b;
}

.goal-box:hover {
  background-color: #f0f2f1; /* 마우스를 올릴 때 바뀔 배경색 설정 */
}

.link {
  color: #0b5cff;
}

.link:hover {
  cursor: pointer;
}

@media (max-width: 768px) {
  .goal-box {
    margin-top: 25px;
  }
  .kakao-signup-text {
    display: block;
  }
}
</style>
<script>
export default {
  computed: {
    newKakaoUserData() {
      return JSON.parse(window.localStorage.getItem('newKakaoUserData'));
    },
    kakaoAccessToken() {
      return this.newKakaoUserData.accessToken || '';
    },
    kakaoNickname() {
      return this.newKakaoUserData.nickname || '';
    },
    kakaoEmail() {
      return this.kakaoUserData.email || '';
    }
  },
  methods: {
    disconnectKakao() {
      this.$swal.fire({
        title: '',
        text: "카카오 정보 제공을 해제하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          const accessToken = this.kakaoAccessToken;
          const url = 'https://kapi.kakao.com/v1/user/unlink';

          fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then(() => {
            this.$swal.fire('', '성공적으로 연결 해제 되었습니다.', 'success');
            this.$router.push({path: '/service/login'});
            window.localStorage.removeItem('newKakaoUserData')
          }).catch(() => {
            this.$swal.fire('', '잠시 후 다시 시도해주세요.', 'warning');
            this.$router.push({path: '/service/login'});
            window.localStorage.removeItem('newKakaoUserData')
          });
        }
      })
    }
  },
}
</script>