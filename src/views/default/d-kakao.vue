<template>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div class="scroll-area green"
         style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="row section1400">
        <div id="phone-col" class="col-lg-6 col-sm-12" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
          <img id="phone" class="" src="../../assets/img/kakaoplus.png" alt=""
               style="width: 400px; object-fit: contain;">
        </div>
        <div class="col-lg-6 col-sm-12" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
          <div class="description">
            <div id="chun-icon">
              <img class="" src="../../assets/img/헤헷.png" alt="" style="">
            </div>
            <p class="TheJamsil400 font25" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
               style=" color: #FFFFFF;"><span class="TheJamsil400 font25"
                                              style="color: #FEE500; margin-top: 20px;">카카오톡</span>채널
              추가하고</p>
            <p class="TheJamsil400 font15" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
               style="color: #00997b; margin-top: 20px; ">어디서나 간편하게 사용해보세요.</p>
            <div id="kakao-plus-btn">
              <a @click="openPlusFriend">
                <!--                    <img class="" src="../../assets/img/QR.png" alt="" style="width: 100px;">-->
                <img class="" src="../../assets/img/friendadd_large_yellow_rect.png" alt="" style="">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  섹션2  -->
    <div class="scroll-area" style="background-color:#d5d1d1; display: flex; justify-content: center; align-items: center;">
      <div class="row">
        <div class="col-6" >
          <div class="row img-container">
            <div class="col-6">
              <img class="captureImg" src="../../../public/assets/img/kakaoImages/up1.png">
            </div>
            <div class="col-6">
              <img class="captureImg" src="../../../public/assets/img/kakaoImages/up2.png">
            </div>
          </div>
        </div>
        <div class="col-6 text-container">
<!--          <p class="TheJamsil400 font20" style=" color: #000000;">카카오톡으로 편하게 사진을 보내면</p>-->
<!--          <br/>-->
<!--          <p class="TheJamsil400 font20" style="color: #000000; margin-top: 0px; ">바로 식단을 분석하고 기록해드려요.</p>-->
          <img class="kakaotalk-text" src="../../../public/assets/img/kakaoImages/se2-2.png">
        </div>
      </div>
    </div>
    <!--  섹션3  -->
    <div class="scroll-area" style="background-color:#d5d1d1; display: flex; justify-content: center; align-items: center;">
      <div class="row">
        <div class="col-6 text-container-3">
<!--          <p class="TheJamsil400 font20" style=" color: #000000;">다음에 뭘 먹을지 고민될땐,</p>-->
<!--          <br/>-->
<!--          <p class="TheJamsil400 font20" style=" color: #000000;"><span class="TheJamsil400 font20" style="color: #1e6b7b;">영양균형</span>과 <span class="TheJamsil400 font20" style="color: #1e6b7b;">기호</span>에 맞는 식단을 <br/>추천받아보세요.</p>-->
          <img class="kakaotalk-text" src="../../../public/assets/img/kakaoImages/se3.png">
        </div>
        <div class="col-6" >
          <div class="row img-container-3">
            <div class="col-6" style="  display: flex; flex-direction: column-reverse; justify-content: flex-start; align-items: center;">
              <img class="captureImg" src="../../../public/assets/img/choonisk/배부른춘식이.png">
            </div>
            <div class="col-6">
              <img class="captureImg-3" src="../../../public/assets/img/kakaoImages/re.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
export default {
  methods: {
    openPlusFriend() {
      window.open('https://pf.kakao.com/_CdMBG');
    },
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
}

/* 부모 스크롤 스냅 컨테이너 */
.scroll-container {
  width: 100%;
  height: 100vh;
  overflow: auto;
  scroll-snap-type: y mandatory;
}

/* 자식 스크롤 스냅 영역 */
.scroll-area {
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
}

#kakao-plus-btn {
  margin-top: 80px;
}

.description {
  text-align: left;
}

.col-lg-6 {
  padding: 0 100px;
}

#chun-icon {
  margin-bottom: 10px;
  text-align: right;
}

.font25 {
  font-size: 2.5rem;
  white-space: nowrap;
}

.font20 {
  font-size: 2.0rem;
  white-space: nowrap;
}

.font15 {
  font-size: 1.5rem;
  white-space: nowrap;
}

.captureImg {
  width: 90%;
  max-height: 1000px;
}

.captureImg-3 {
  width: 120%;
  max-height: 1000px;
}

.img-container {
  padding-top: 120px;
  padding-left: 50px;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
}

.img-container-3 {
  padding-top: 120px;
  padding-right: 50px;
}

.text-container-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 120px;
}

.kakaotalk-text {
  width: 550px;
}

@media (max-width: 768px) {
  div {
    overflow: hidden;
  }

  .col-lg-6 {
    padding: 0px;
  }

  #phone {
    height: 250px;
  }

  #phone-col {
    margin-top: 100px;
  }

  #chun-icon {
    display: none;
  }

  .description {
    margin-top: 50px;
  }

  .font25 {
    font-size: 22px;
    text-align: center;
  }

  .font15 {
    font-size: 16px;
    text-align: center;
  }

  #kakao-plus-btn {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 150px;
  }
}
</style>
