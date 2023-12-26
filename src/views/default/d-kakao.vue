<template>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div class="scroll-area green"
         style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; min-height: 100vh;">
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
              <a href="https://pf.kakao.com/_xccVXG">
                <!--                    <img class="" src="../../assets/img/QR.png" alt="" style="width: 100px;">-->
                <img class="" src="../../assets/img/friendadd_large_yellow_rect.png" alt="" style="">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  섹션2  -->
    <div class="scroll-area ivory" style="display: flex; justify-content: center; align-items: center;">
      <img class="" src="../../assets/img/열심.png" alt="" style="">
    </div>
    <!--  섹션3  -->
    <div class="scroll-area ivory" style="display: flex; justify-content: center; align-items: center;">
      <img class="" src="../../assets/img/헤헷.png" alt="" style="">
    </div>
  </div>


</template>
<script>

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

.font15 {
  font-size: 1.5rem;
  white-space: nowrap;
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
    width: 300px;
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
