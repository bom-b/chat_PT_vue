<template>
  <main>
    <div class="section1400">
      <div id="box">
        <h5 class="mb-2" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0"><strong>{{kakaoNickname}}</strong>님 안녕하세요</h5>
        <h5 class="" style="white-space:nowrap; margin-bottom: 100px;" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">카카오 간편가입 완료를 위해 몇가지 정보를 더 알려주세요 🙂</h5>
        <h2 class="mb-5" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="0">가입할 <span
            class="highlight">유형</span>을 선택해주세요.</h2>
        <div class="row">
          <router-link to="/signUp/kakao" class="col-6 router-link">
            <div class="goal-box "
                 style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">일반회원</p>
              <img class="" src="../../../public/assets/img/graphic/normal-user.png" alt="" style="width: 60px;">
            </div>
          </router-link>
          <router-link to="/signUp/kakao" class="col-6 router-link">
            <div class="goal-box col-6"
                 style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">트레이너회원</p>
              <img class="" src="../../../public/assets/img/graphic/trainer-user.png" alt="" style="width: 60px;">
            </div>
          </router-link>
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
  margin: 10px 50px 50px 10px;
  border: 1px solid #f0f2f1;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

.highlight {
  color: #00997b;
}

.goal-box:hover {
  background-color: #f0f2f1; /* 마우스를 올릴 때 바뀔 배경색 설정 */
}
</style>
<script>
export default {
  data() {
    return {
      kakaoNickname: '',
    }
  },
  created() {
    this.kakaoNickname = this.$route.query.nickname;
  },
}
</script>