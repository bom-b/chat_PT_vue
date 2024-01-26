<template>
  <main>
    <div class="section1400">
      <div id="box">
        <h2
          class="mb-5"
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-delay="0"
        >
          <span class="highlight">등록 방법</span>을 선택해주세요.
        </h2>
        <div class="row" style="text-align: center; margin: auto; padding-bottom : 50px;">
          <router-link
            to="/default/d_upload_self"
            class="col-md-6 col-sm-12 router-link"
            style="display: flex; justify-content: center; margin: auto"
          >
            <div
              class="goal-box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              "
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <p class="TheJamsil400" style="display: inline-block"> 직접 등록하기</p>
              <img
                class=""
                src="../../../public/assets/img/graphic/tap.png"
                alt=""
                style="width: 60px"
              />
            </div>
          </router-link>
          <router-link
            to="/default/d_upload_auto"
            class="col-md-6 col-sm-12 router-link"
            style="display: flex; justify-content: center; margin: auto"
          >
            <div
              class="goal-box"
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              "
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <p class="TheJamsil400" style="display: inline-block">
                자동으로 등록하기
              </p>
              <img
                class=""
                src="../../../public/assets/img/graphic/auto.png"
                alt=""
                style="width: 60px"
              />
            </div>
          </router-link>
        </div>
      </div>
      <div>
      <router-link to="/default/d_upload_result" class="router-link">
        <a style="font-weight: bold"
        > <img
                class=""
                src="../../../public/assets/img/graphic/result.png"
                alt=""
                style="width: 60px"
              />
              결과 보기</a>
      </router-link>
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
  width: 275px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin-left:20px;
  margin-right: 20px ;
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

@media (max-width: 768px) {
  .goal-box {
    margin-top: 25px;
  }
}
</style>
<script setup></script>
