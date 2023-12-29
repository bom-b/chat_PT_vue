<template>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div class="scroll-area"
         style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="row" style="margin-top: 50px; text-align: center; display: flex;">

      <div style="margin-bottom: 100px;"
          data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
        <span class="material-icons pine_Green_text">bar_chart</span>
        <span id="" class="pine_Green_text TheJamsil400"
              style="white-space: nowrap; font-size: 1.7rem;">나만의 맞춤 음식 추천</span>
      </div>

      <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;"
          data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
        <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 칼로리</p>
        <img src="../../assets/img/메인_칼로리.png" style="max-height: 40%; object-fit: contain; " alt="s">
      </div>

      <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;"
          data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
        <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 영양소</p>
        <img src="../../assets/img/바차트.png" style="max-height: 40%; object-fit: contain; " alt="s">  
      </div>
      
      </div><!-- 사진 등록 -->
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
