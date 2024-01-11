<template>
  <main_header/>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div id="section1" class="scroll-area" style="">
      <div class="img-text">
        <p id="sec1-title" class="TheJamsil300 font120px" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
           style="color: white;">Life on <span class="TheJamsil400 font50"
                                               style="color: #A9D18E; margin-top: 20px; font-weight: bold;">Chat PT</span>
        </p>
        <p id="sec1-sub" class="font15 mt-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"
           style="color: white;">일상과 함께하는 식단관리 서비스</p>
      </div>
      <p id="more-scroll" class="font15"><span id="arrow" class="material-icons font25">expand_more</span>스크롤해서 더 알아보세요.
      </p>
    </div>

    <!--  섹션2  -->
    <div id="section2" class="scroll-area" style="">
      <div class="img-text" style="">
        <div id="sec2-title">
          <p id="sec2-sub-title" class="pine_Green_text TheJamsil100 font15 mb-3" data-aos="fade-in"
             data-aos-duration="1000"
             data-aos-delay="">확실한 식단관리가 필요한 당신에게,</p>
          <p class="TheJamsil400 font35" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            어디서나 간편하게 식단을 등록하고<br>추천을 받아보세요.</p>
        </div>
      </div>
      <div class="img-icon">
        <img id="sec2-icon" src="/assets/img/graphic/사용자아이콘.png" alt="" data-aos="fade-in" data-aos-duration="2000"
             data-aos-delay="400">
      </div>
    </div>

    <!--  섹션3  -->
    <div id="section3" class="scroll-area" style="">
      <div class="img-text" style="">
        <div id="sec3-title">
          <p id="sec3-sub-title" class="pine_Green_text TheJamsil100 font15 mb-3" data-aos="fade-in"
             data-aos-duration="1000"
             data-aos-delay="">회원의 식단관리를 대신 해줄 사람이 필요한 당신에게,</p>
          <p class="TheJamsil400 font35" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            운동 코칭에만 집중할 수 있도록<br>식단 관리는 저희가 해드릴게요.</p>
        </div>
      </div>
      <div class="img-icon">
        <img id="sec3-icon" src="/assets/img/graphic/PT아이콘2.png" alt="" data-aos="fade-in" data-aos-duration="2000"
             data-aos-delay="400">
      </div>
    </div>

    <!--  섹션4  -->
    <div id="section4" class="scroll-area" style="">
      <video id="" class="background-video" autoplay loop muted playsinline>
        <source src="/assets/img/background/fdd.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div id="section4-content">
        <p class="TheJamsil400 font35 mb-5" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">지금
          시작해보세요!</p>

        <router-link to="/signUp/sign_up" class="router-link">
          <button class="mb-3 btn-signature" type="button" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200">이메일로
            가입하기
          </button>
        </router-link>
        <br/>

        <router-link to="/default/d_kakao" class="router-link">
          <img id="kakao-btn" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="200"
               src="/assets/img/graphic/kakao_login_kor.png">
        </router-link>

      </div>
    </div>


  </div>


</template>
<script>


export default {
  mounted() {
    this.setVideoPlaybackRate();
  },
  methods: {
    setVideoPlaybackRate() {
      var video = document.querySelector('.background-video');
      if (video) {
        video.playbackRate = 0.7;
      }
    },
  },
};

</script>
<style>
.nav-item {
  color: white;
}
</style>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
}

@keyframes moveAndHighlight {
  0% {
    transform: translateY(0);
    color: white; /* 초기 색상 설정 */
  }
  50% {
    transform: translateY(10px); /* 이동할 거리 설정 */
    color: #A9D18E; /* 강조할 색상 설정 */
  }
  100% {
    transform: translateY(0);
    color: white; /* 초기 색상으로 복귀 */
  }
}

#arrow {
  animation: moveAndHighlight 2s infinite; /* 2s 동안 반복되는 애니메이션 설정 */
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
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  scroll-snap-align: center;
}

.img-in-box {
  width: 1800px;
  margin: 0 auto;
  position: absolute
}

.img-text {
  width: 1400px;
  max-width: 100%;
  margin: 0 auto;
}

.img-icon {
  width: 1400px;
  max-width: 100%;
  margin: 0 auto;
  height: 100vh;
  text-align: right;
  position: relative;
}

#more-scroll {
  opacity: 0.7;
  text-align: center;
  width: 450px;
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%, -50%);
}

#section1 {
  background-image: url('../../assets/img/background/1.png');
  background-size: cover; /* 배경 이미지를 섹션에 맞게 확대/축소 */
  background-position: center; /* 배경 이미지를 가운데 정렬 */
  color: white;
  align-items: center;
  text-align: left;

  #sec1-title {
    white-space: nowrap;
  }
}

#section2 {
  background-image: url('../../assets/img/background/2.png');
  background-size: cover;
  background-position: center;
  color: white;
  align-items: center;
  text-align: left;
  flex-direction: column;

  #sec2-title {
    white-space: nowrap;
    color: white;
    position: absolute;
    top: 20%;
  }

  #sec2-icon {
    text-align: right;
    width: 450px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

#section3 {
  background-image: url('../../assets/img/background/3.png');
  background-size: cover;
  background-position: center;
  color: white;
  align-items: center;
  text-align: left;
  flex-direction: column;

  #sec3-title {
    white-space: nowrap;
    color: white;
    position: absolute;
    top: 20%;
  }

  #sec3-icon {
    text-align: right;
    width: 450px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

#section4 {

}

#section4-content {
  color: white;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.background-video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1000;
}

.router-link {
  //pointer-events: auto; /* Ensure that pointer events are not disabled */
}

button {
  background-color: #e5f5f2;
  color: black;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 18px;
  width: 350px;
  height: 52.5px;
}

#kakao-btn {
  width: 350px;
}

.font120px {
  top: 20%;
  font-size: 120px;
  white-space: nowrap;
}

.font35 {
  //font-size: 3vw;
  font-size: 3.5rem;
  white-space: nowrap;
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
