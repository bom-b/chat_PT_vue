<style lang="scss" scoped>
#hero {
  height: 350px;
  background-image: url("../../assets/img/어두운 배경.png"); /* 이미지 파일 경로를 설정하세요 */
  background-size: cover; /* 배경 이미지를 섹션에 맞게 확대/축소 */
  background-position: center; /* 배경 이미지를 가운데 정렬 */
  color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
  text-align: left;

  #hero-title {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1.5rem;
  }

  #hero-sub {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1rem;
    text-decoration: none;
  }
}

.goal-box {
  width: 200px;
  height: 110px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin: 10px 10px 10px 10px;
  border: 1px solid #f0f2f1;
}

.goal-box:hover {
  background-color: rgba(166, 227, 215, 0.99); /* 원하는 hover 시 배경 색상 */
}

// 이미지 업로드 텍스트
.img-upload {
  padding: 0 0 0 50px;
  height: 300px;
  text-align: left;

  .up-btn {
    margin-top: 50px;
  }
}

#MultiImageUploader {
  margin-top: 70px;
  max-width: 600px;
}

// 비디오 또는 그래픽
#mobile-food-icon {
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#web-food-icon .video::-webkit-media-controls {
  display: none !important;
}

.video::-webkit-media-controls-enclosure {
  display: none !important;
}

// 모바일 버튼 처음엔 숨기기
#mobile-btn {
  display: none;
  text-align: center;
  margin-top: 50px;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  #hero {
    height: 300px;
    padding: 0 20px;

    // 글자크기 작게
    #hero-title {
      white-space: nowrap;
      margin: 1vw;
      font-size: 1.3rem;
    }

    #hero-sub {
      white-space: nowrap;
      margin: 3vw 1vw 1vw;
      font-size: 1rem;
      text-decoration: none;
    }
  }

  .goal-box {
    font-size: 13px;
    width: 140px;
    height: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    color: #000000;
    text-align: left;
    margin: 10px 10px 10px 10px;
    border: 1px solid #f0f2f1;
  }

  // 이미지 업로드 텍스트
  .img-upload {
    margin-top: 50px;
    padding: 0 0 0 10px;
    text-align: center;

    .up-btn {
      margin-top: 10px;
    }
  }

  // 모바일에선 슬롯머신 보여주고 그래픽 숨기기
  #mobile-food-icon {
    display: block;
  }

  #web-food-icon {
    display: none;
  }

  // 드래그앤 드롭 숨기기
  #MultiImageUploader {
    display: none;
  }

  // 대신 모바일 전용 버튼 보여주기
  #mobile-btn {
    display: block;
  }
}

img {
  transition: 0.2s ease-out;
}
</style>
<template>
  <main id="main">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="hero d-flex align-items-center section-bg">
      <div class="col-12" style="max-width: 1600px; margin: 0 auto">
        <p
          data-aos="fade-in"
          data-aos-duration="1000"
          class="TheJamsil400"
          id="hero-title"
        >
          간편하게 이용하는 식단관리 솔루션,<br />Chat PT
        </p>
        <p
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="100"
          class=""
          id="hero-sub"
          style="color: #727070"
        >
          건강한 식단을 찾고 계신 당신에게
          <br />
          맞춤 식단 전문가가 되어 드립니다.
        </p>
        <!--        <div class="d-flex" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">-->
        <!--          <a href="shipdan.me/" class="" id="hero-sub" style="color: cornflowerblue;">자세히 알아보기</a>-->
        <!--        </div>-->
      </div>
    </section>
    <!-- End Hero Section -->

    <!--  목표달성  -->
    <section>
      <div
        class="gray"
        style="
          min-height: 100%;
          height: auto;
          padding: 30px;
          padding-bottom: 120px;
        "
      >
        <div class="section1800">
          <h5
            class=""
            style="color: #727070"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="100"
          >
            chat PT를 통해
          </h5>
          <h3
            class="TheJamsil400"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="100"
          >
            어떤 목표를 이루고 계신가요? 🚀
          </h3>
          <div
            class="row justify-content-center align-items-center"
            style="margin-top: 50px; text-align: center"
          >
            <div
              class="goal-box col-6 col-sm-3"
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
                뚜렷한<br />체중 감량
              </p>
              <img
                class=""
                src="../../../public/assets/img/graphic/icon1.png"
                alt=""
                style="width: 32px"
              />
            </div>
            <div
              class="goal-box col-6 col-sm-3"
              style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                background-color: rgba(166, 227, 215, 0.99);
              "
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <p class="TheJamsil400" style="display: inline-block">
                현재 체중<br />유지
              </p>
              <img
                class=""
                src="../../../public/assets/img/graphic/icon2.png"
                alt=""
                style="width: 32px"
              />
            </div>
            <div
              class="goal-box col-6 col-sm-3"
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
                체중 증량<br />(벌크업)
              </p>
              <img
                class=""
                src="../../../public/assets/img/graphic/icon4.png"
                alt=""
                style="width: 32px"
              />
            </div>
            <div
              class="goal-box col-6 col-sm-3"
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
                건강한<br />식습관
              </p>
              <img
                class=""
                src="../../../public/assets/img/graphic/icon3.png"
                alt=""
                style="width: 32px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  연속 업로드  -->
    <section class="green" style="padding: 0 2vw">
      <div class="section1800" style="height: 300px; padding-top: 50px">
        <p
          class="TheJamsil400"
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay=""
          style="font-size: 20px; color: #00997b"
        >
          오늘까지
        </p>
        <p
          class="TheJamsil400"
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay=""
          style="color: #ffffff; margin-top: 20px; font-size: 30px"
        >
          연속
          <span
            class="TheJamsil400"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="500"
            style="color: #ffffff; margin-top: 20px; font-size: 50px"
            >10</span
          >
          일째
        </p>
        <p
          class="TheJamsil400"
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay=""
          style="margin-top: 10px; font-size: 20px; color: #00997b"
        >
          업로드 중입니다 😊
        </p>
      </div>
    </section>

    <!--  식단 업로드  -->
    <section class="ivory" style="padding: 0 2vw">
      <div class="section1800">
        <div
          class="row"
          style="margin-top: 100px; margin-bottom: 200px; text-align: center"
        >
          <div
            class="col-lg-4 col-sm-6"
            style="height: 300px; text-align: left"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <video
              id="mobile-food-icon"
              class="video"
              autoplay
              loop
              muted
              playsinline
              style="object-fit: contain"
            >
              <source
                src="../../assets/img/changeable_diet_minified.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div style="text-align: center; padding-left: 20px">
              <!--              <img id="web-food-icon" src="../../assets/img/graphic/taco%201.png"-->
              <!--                   style="margin-left: 20px; object-fit: contain;">-->
              <DynamicImage id="web-food-icon" />
              <!--              <img src="/assets/img/graphic/taco%201.png" style="max-height: 80%; object-fit: contain;">-->
            </div>
          </div>

          <div
            class="col-lg-8 col-sm-6 img-upload"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h3 id="plz-up" class="TheJamsil400" style="white-space: nowrap">
              오늘의 식단을 업로드 해주세요!
            </h3>
            <p class="pine_Green_text" style="white-space: nowrap">
              사진을 전부 등록 해주시면 저희가 분류해드릴게요.
            </p>
            <div id="MultiImageUploader">
              <MultiImageUploader />
            </div>
            <div id="mobile-btn">
              <button class="" @click="triggerFileInput">파일 선택</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  식단 분석  -->
    <section
      class="lime-green"
      style="min-height: 100%; height: auto; padding: 30px"
    >
      <div class="section1800">
        <div
          class="row"
          style="margin-top: 50px; text-align: center; display: flex"
        >
          <div
            style="margin-bottom: 100px"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            <span class="material-icons pine_Green_text">bar_chart</span>
            <span
              id=""
              class="pine_Green_text TheJamsil400"
              style="white-space: nowrap; font-size: 1.7rem"
              >나만의 식습관 맞춤 리포트</span
            >
          </div>

          <div
            class="col-lg-6 col-sm-6"
            style="height: 600px; text-align: center"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <p
              class="TheJamsil400"
              style="
                white-space: nowrap;
                font-size: 1.3rem;
                margin-bottom: 30px;
              "
            >
              오늘의 칼로리
            </p>
            <img
              src="../../assets/img/메인_칼로리.png"
              style="max-height: 40%; object-fit: contain"
              alt="s"
            />
          </div>

          <div
            class="col-lg-6 col-sm-6"
            style="height: 600px; text-align: center"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <p
              class="TheJamsil400"
              style="
                white-space: nowrap;
                font-size: 1.3rem;
                margin-bottom: 30px;
              "
            >
              오늘의 영양소
            </p>
            <img
              src="../../assets/img/바차트.png"
              style="max-height: 40%; object-fit: contain"
              alt="s"
            />
          </div>
        </div>
        <!-- 사진 등록 -->
      </div>
    </section>
  </main>
  <!-- End #main -->
</template>
<script>
import MultiImageUploader from "@/components/util/img-upload.vue";
import DynamicImage from "@/components/util/dynamic-image.vue";

export default {
  components: {
    MultiImageUploader,
    DynamicImage,
  },
};
</script>
