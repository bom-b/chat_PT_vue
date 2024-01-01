<template>
  <main_header/>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div id="section1" class="scroll-area" style="">
      <div class="img-text">
        <p id="sec1-title" class="TheJamsil400 font120px" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
           style="color: white;">Life on <span class="TheJamsil400 font50"
                                               style="color: #A9D18E; margin-top: 20px; font-weight: bold;">Chat PT</span>
        </p>
        <p id="sec1-sub" class="font15 mt-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"
           style="color: white;">일상과 함께하는 식단관리 서비스</p>
      </div>
    </div>

    <!--  섹션2  -->
    <div id="section2" class="scroll-area" style="">
      <div class="img-text" style="">
        <div id="sec2-title">
          <p id="sec2-sub-title" class="pine_Green_text TheJamsil100 font25 mb-3" data-aos="fade-in"
             data-aos-duration="1000"
             data-aos-delay="">확실한 식단관리가 필요한 당신에게,</p>
          <p class="TheJamsil400 font45" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
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
          <p id="sec3-sub-title" class="pine_Green_text TheJamsil100 font25 mb-3" data-aos="fade-in"
             data-aos-duration="1000"
             data-aos-delay="">회원의 식단관리를 대신 해줄 사람이 필요한 당신에게,</p>
          <p class="TheJamsil400 font45" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
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
        <p class="TheJamsil400 font45" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">지금 시작해보세요!</p>

          <router-link to="/sign_up" class="router-link">
            <button class="" type="button">이메일로 가입하기</button>
          </router-link>
          <router-link to="/d_kakao" class="router-link">
            <img src="/assets/img/graphic/kakao_login_kor.png">
          </router-link>

      </div>
    </div>


  </div>


</template>
<script>
import main_header from '@/components/header/main-header.vue';

export default {
  components: {
    main_header,
  },
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
  width: 1800px;
  margin: 0 auto;
}

.img-icon {
  width: 1800px;
  margin: 0 auto;
  text-align: right;
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
    width: 50vw;
    position: absolute;
    bottom: 0%;
    right: 0%;
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
    width: 60vw;
    position: absolute;
    bottom: 0%;
    right: 0%;
  }
}

#section4 {
  z-index: -1000;

  #section4-content {
    color: white;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .router-link {
    pointer-events: auto; /* Ensure that pointer events are not disabled */
    z-index: 1; /* Adjust the z-index if needed */
  }

}


.background-video {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.font120px {
  top: 20%;
  font-size: 120px;
  white-space: nowrap;
}

.font45 {
  //font-size: 3vw;
  font-size: 4.5rem;
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
