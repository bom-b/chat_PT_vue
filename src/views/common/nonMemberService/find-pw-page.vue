<template>
  <main>
    <findIdPwNav_header/>
    <div class="section1400" style="text-align: left;">
      <div class="title-box" v-if="!isCorrect && !isSuccessChange">
        <h3 class="mt-5">회원정보 입력</h3>
        <p style="color:#989494;">가입 시 입력한 본인정보를 입력해 주세요.</p>
      </div>

      <div class="main-box mt-5">
        <!--    인증하는 창    -->
        <div class="q-box "
             v-if="!isCorrect"
             style=""
             data-aos="fade-in" data-aos-duration="100" data-aos-delay="">
          <p class="highlight">이메일 인증</p>
          <form @submit.prevent="sendMail" class="mt-5">
            <div class="form-group">
              <label for="id">ID</label>
              <input v-model="user.id" type="text" class="form-control" id="id">
            </div>
            <div class="mt-2 form-group">
              <label for="name">이름</label>
              <input v-model="user.name" type="text" class="form-control" id="name">
            </div>
            <div class="mt-2 form-group">
              <label for="email">이메일 주소</label>
              <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
              <button v-if="!isSend" type="submit" class="req-btn">인증번호 요청</button>
              <button v-else class="req-btn" @click="sendMail">다시 요청하기</button>
            </div>
            <div>
              <p id="bad-result" class="mt-3" style="color:darkred;" v-html="badResult"></p>
              <p id="bad-result" class="mt-3" style="color:#1e6b7b;" v-html="goodResult"></p>
            </div>
          </form>
          <form @submit.prevent="confirm" class="">
            <div class="mt-5 form-group">
              <label for="code">인증번호</label>
              <input v-model="submitCode" type="text" class="form-control" id="code">
            </div>
            <p id="bad-result" class="mt-3" style="color:darkred;" v-html="finalResult"></p>
            <div class="mt-5" style="text-align: right">
              <button type="submit" class="mb-2 btn-signature login-btn">인증하기</button>
            </div>
          </form>
        </div>
        <!--    인증이 완료되면 뜨는 창    -->
        <div class="r-box "
             v-if = "isCorrect && !isSuccessChange"
             style=""
             data-aos="fade-in" data-aos-duration="100" data-aos-delay="">
          <p class="highlight">성공적으로 인증되었습니다.</p>
          <h3 class="TheJamsil400">비밀번호를 재설정 해주세요.</h3>
          <form @submit.prevent="changePw" class="">
            <div class="mt-5 form-group">
              <label for="newPw">새 비밀번호</label>
              <input v-model="password.newPw" type="password" class="form-control" id="newPw">
            </div>
            <div class="mt-2 form-group">
              <label for="pwCheck">새 비밀번호 확인</label>
              <input v-model="password.pwCheck" type="password" class="form-control" id="pwCheck">
            </div>
            <p id="bad-result" class="mt-3" style="color:darkred;" v-html="pwBadResult"></p>
            <div class="mt-5" style="text-align: right">
              <button type="submit" class="mb-2 btn-signature login-btn">변경하기</button>
            </div>
          </form>
        </div>
        <!--    비밀번호 변경이 완료되면 뜨는 창    -->
        <div class="mt-5">
          <h2 v-if="isSuccessChange" class="TheJamsil400 highlight">비밀번호 변경이 성공적으로 완료되었습니다.</h2>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import findIdPwNav_header from "@/components/header/find-id-pw-nav.vue";

export default {
  components: {
    findIdPwNav_header,
  },
  data() {
    return {
      user: {
        id: '',
        name: '',
        email: '',
      },
      password: {
        newPw: '',
        pwCheck: '',
      },

      isSend: false,
      isCorrect: false,
      isSuccessChange: false,

      serverCode: '',
      submitCode: '',

      goodResult: '',
      badResult: '',
      finalResult: '',
      pwBadResult: '',
    };
  },
  created() {
  },
  methods: {
    sendMail() {
      this.badResult = '';

      if (!this.user.id) {
        this.badResult = 'ID를 입력해주세요.'
        return;
      } else if (!this.user.name) {
        this.badResult = '이름을 입력해주세요.'
        return;
      } else if (!this.user.email) {
        this.badResult = '이메일을 입력해주세요.'
        return;
      }

      this.goodResult = '인증번호를 발송 중입니다. 잠시만 기다려주세요.'
      this.isSend = true;

      this.$axiosWithoutValidation.post('/service/findPw', this.user)
          .then((response) => {
            this.goodResult = '인증번호가 발송 되었습니다.<br>이메일을 확인해주세요.'
            this.serverCode = response.data;
          }).catch(() => {
        this.badResult = '입력하신 정보와 일치하는 회원이 없습니다.<br>해당 정보를 다시 확인하거나 회원가입을 진행해주세요.'
      })
    },
    confirm() {
      this.finalResults = ''

      if (!this.isSend) {
        this.finalResult = '인증번호 요청을 먼저 해주세요.'
      }
      else if (this.submitCode === '') {
        this.finalResult = '인증번호를 입력해주세요.'
      } else if (this.submitCode == this.serverCode) {
        this.isCorrect = true;
      } else {
        this.finalResult = '인증번호가 일치하지 않습니다.'
      }
    },
    changePw() {
      this.pwBadResult = ''

      if (!this.password.newPw) {
        this.pwBadResult = '새 비밀번호를 입력해주세요.'
        return;
      } else if (!this.password.pwCheck) {
        this.pwBadResult = '새 비밀번호 확인을 입력해주세요.'
        return;
      }

      if (this.password.newPw !== this.password.pwCheck) {
        this.pwBadResult = '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.'
        return;
      }

      const data = {
        id: this.user.id,
        newPassword: this.password.newPw,
      }

      this.$axiosWithoutValidation.post('/service/changePw', data)
          .then(() => {
            this.isSuccessChange = true;
          }).catch(() => {
        this.$swal.fire('', '서버와의 통신이 불안정합니다. 다시 시도해주세요.', 'warning');
      })
    }
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

.highlight {
  color: #00997b;
}

.form-group label {
  width: 120px; /* 원하는 너비로 조절하세요. */
}

input {
  width: 300px;
  border-radius: 1px;
}

.title-box {
  margin: 0px 0px 0px 20px;
}

.main-box {
  margin: 10px 50px 50px 20px;
}

.req-btn {
  height: 36px;
  border: none;
  background-color: #cccccc;
  color: black;
}

.req-btn:hover {
  background-color: #b8b8b8 !important;
  color: black !important;
}

.q-box {
  width: 750px;
  height: auto;
  background-color: #ffffff;
  border-radius: 1px;
  padding: 20px;
  color: #000000;
  text-align: left;
  border: 1px solid #f0f2f1;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

.r-box {
  width: 750px;
  height: auto;
  background-color: #ffffff;
  border-radius: 1px;
  padding: 20px;
  color: #000000;
  text-align: left;
  border: 1px solid #f0f2f1;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 10px; /* label과 input 사이의 간격을 조절하려면 이 값을 조정하세요. */
}
</style>