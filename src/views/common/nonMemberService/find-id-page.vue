<template>
  <main>
    <findIdPwNav_header/>
    <div class="section1400" style="text-align: left;">
      <div class="title-box">
        <h3 class="mt-5">회원정보 입력</h3>
        <p style="color:#989494;">가입 시 입력한 본인정보를 입력해 주세요.</p>
      </div>

      <div class="main-box mt-5">
        <div class="q-box "
             v-if="!found_id"
             style=""
             data-aos="fade-in" data-aos-duration="100" data-aos-delay="">
          <p class="highlight">이메일 인증</p>
          <form @submit.prevent="findId" class="mt-5">
            <div class="form-group">
              <label for="exampleInputEmail1">이름</label>
              <input v-model="user.name" type="text" class="form-control" id="name">
            </div>
            <div class="mt-3 form-group">
              <label for="exampleInputPassword1">이메일 주소</label>
              <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <div>
              <p id="bad-result" class="mt-5" style="color:darkred;" v-html="badResult"></p>
            </div>
            <div class="mt-5" style="text-align: right">
              <button type="submit" class="mb-2 btn-signature login-btn">아이디 찾기</button>
            </div>
          </form>
        </div>
        <div class="r-box "
             v-else
             style=""
             data-aos="fade-in" data-aos-duration="100" data-aos-delay="">
          <p class="TheJamsil400">입력된 정보로 등록된 아이디는 아래와 같습니다.</p>
          <p class="mt-5"><span class="highlight">▶</span> {{found_id}}</p>
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
        name: '',
        email: '',
      },
      found_id: '',
      badResult: '',
    };
  },
  created() {
  },
  methods: {
    findId() {
      if (!this.user.name) {
        this.badResult = '이름을 입력해주세요.'
        return;
      } else if (!this.user.email) {
        this.badResult = '이메일을 입력해주세요.'
        return;
      }

      this.$axiosWithoutValidation.post('/service/findId', this.user)
          .then((response) => {
            this.found_id = response.data;
          }).catch(() => {
            this.badResult = '입력하신 정보와 일치하는 회원이 없습니다.<br>해당 정보를 다시 확인하거나 회원가입을 진행해주세요.'
      })
    }
  },
  watch: {
    'user.name'() {
      this.badResult = '';
    },
    'user.email'() {
      this.badResult = '';
    }
  },
  computed: {},
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