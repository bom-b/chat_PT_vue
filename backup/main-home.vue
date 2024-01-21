<template>
  <main_header/>
  <div class="scroll-container"  style="user-select: none" >
    <!--  섹션1  -->
    <div class="scroll-area" style="position: relative; display: flex; justify-content: center; align-items: center;">
      <img class="background-img" src="/assets/img/background/1.png" alt="" style="">
      <div class="in-img-text">
        <p class="TheJamsil400 font120px" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
           style="color: white;">Life on <span class="TheJamsil400 font50"
                                               style="color: #A9D18E; margin-top: 20px; font-weight: bold;">Chat PT</span>
        </p>
        <p id="sec1-sub" class="font15 mt-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"
           style="color: white;">일상과 함께하는 식단관리 서비스</p>
      </div>
    </div>
    <!--  섹션2  -->
    <div class="scroll-area" style="">
      <img class="background-img" src="/assets/img/background/2.png" alt="" style="">
      <div class="img-text">
        <p id="sec1-sub" class="font15 mt-3" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"
           style="">어디서나 간편하게 식단을 등록하고 추천을 받아보세요.</p>
      </div>
    </div>
    <!--  섹션3  -->
    <div class="scroll-area" style="display: flex; justify-content: center; align-items: center;">
      <img class="background-img" src="/assets/img/background/3.png" alt="" style="">
    </div>
    <!--  섹션4  -->
    <div class="scroll-area" style="display: flex; justify-content: center; align-items: center;">
      <video id="" class="background-video" autoplay loop muted playsinline>
        <source src="/assets/img/background/fdd.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
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

.in-img-text {
  overflow: hidden;
  margin-top: 20px;
  position: absolute;
  left: 15%;
}

.img-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.background-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
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
