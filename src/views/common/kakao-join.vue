<template>
<div>
  <main>
    <div class="section1400">
      <div id="box">
        <h4 class="mt-4">계정을 확인중입니다.</h4>
      </div>
    </div>
  </main>
</div>
</template>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
export default {
  data() {
    return {
      code : '',
    }
  },
  created() {
    this.code = this.$route.query.code;
    this.getToken();
  },
  methods: {
    getToken() {
      const self = this;
      self.$axiosWithoutValidation.get('/kakao/kakaoLogin/' + self.code)
          .then((response) => {

            // 에러처리
            if (response.data.error === "관리자 로그인 이용 필요") {
              this.$swal.fire('', '관리자 로그인을 이용해주세요.', 'warning');
            }

            // 로그인 성공
            if(response.data.isSign === "true") {
              const role = response.data.role;

              window.localStorage.clear();
              window.localStorage.setItem('jwtToken', response.data.token);
              window.localStorage.setItem('role', role);

              if (role === 'NORMAL') {
                window.localStorage.setItem('nickname', response.data.nickname);
                window.location.href = '/default/d_home';
              } else if (role === 'TRAINER') {
                window.localStorage.setItem('name', response.data.name);
                window.location.href = '/trainer/pt_home';
              }

              this.$router.push({path: '/'});

              // 회원가입 시키러 보내기
            } else {
              const newKakaoUserData = {
                id: response.data.id,
                email: response.data.email,
                nickname: response.data.nickname,
                profileImage: response.data.profileImage,
              }
              this.$store.commit('newKakaoUserData', newKakaoUserData);
              this.$router.push({path: '/signUp/kakao_sign_up_main'});
            }
          })
          .catch(() => {
            this.$swal.fire('', '서버와의 연결이 원활하지 않습니다..', 'warning');
          });
    }
  }
}
</script>