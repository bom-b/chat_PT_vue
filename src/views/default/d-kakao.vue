<template>
  <main id="main">
    <!--  목표달성  -->
    <section>
      <div class="gray" style="min-height: 100%; height: auto; padding: 30px;">
        <div class="section1800">
          <h5 class="" style="color: #727070" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">chat PT를
            통해</h5>
          <h3 class="TheJamsil400" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">어떤 목표를 이루고
            싶으세요?</h3>
          <div class="row justify-content-center align-items-center" style="margin-top: 50px; text-align: center;">
            <div class="goal-box col-3" style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">뚜렷한<br>체중 감량</p>
              <img class="" src="../../assets/img/icon1.png" alt="" style="width: 32px;">
            </div>
            <div class="goal-box col-3" style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">현재 체중<br>유지</p>
              <img class="" src="../../assets/img/icon2.png" alt="" style="width: 32px;">
            </div>
            <div class="goal-box col-3" style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">체중 증량<br>(벌크업)</p>
              <img class="" src="../../assets/img/icon4.png" alt="" style="width: 32px;">
            </div>
            <div class="goal-box col-3" style="display: flex; justify-content: space-between; align-items: flex-start;"
                 data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
              <p class="TheJamsil400" style="display: inline-block;">건강한<br>식습관</p>
              <img class="" src="../../assets/img/icon3.png" alt="" style="width: 32px;">
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 green" style="height: 100px; margin-bottom: 0;">
      </div>
    </section>

    <!--  식단 업로드  -->
    <section class="ivory" style="padding:0 2vw;">
      <div class="section1800">
        <div class="row " style="margin-top: 100px; margin-bottom:200px; text-align: center;">

          <div class="col-lg-4 col-sm-6" style="height: 300px; text-align: left; "
               data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            <video class="video" autoplay loop muted playsinline style="object-fit: contain;">
              <source src="../../assets/img/changeable_diet_minified.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>

          <div class="col-lg-8 col-sm-6 img-upload" style="height: 300px; text-align: left;"
               data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            <h3 id="plz-up" class="TheJamsil400" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
            <p class="pine_Green_text" style=" white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
            <div id="MultiImageUploader">
              <MultiImageUploader/>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!--  식단 분석  -->
    <section class="lime-green" style="min-height: 100%; height: auto; padding: 30px;">
      <div class="section1800">
        <div class="row" style="margin-top: 50px; text-align: center; display: flex;">

          <div style="margin-bottom: 100px;"
               data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
            <span class="material-icons pine_Green_text">bar_chart</span>
            <span id="" class="pine_Green_text TheJamsil400"
                  style="white-space: nowrap; font-size: 1.7rem;">나만의 식습관 맞춤 리포트</span>
          </div>

          <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;"
               data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 칼로리</p>
            <img src="../../assets/img/칼로리.png" style="max-height: 50%; object-fit: contain; " alt="s">
          </div>

          <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;"
               data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300">
            <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 영양소</p>
            <img src="../../assets/img/바차트.png" style="max-height: 50%; object-fit: contain; " alt="s">
          </div>

        </div><!-- 사진 등록 -->
      </div>
    </section>

  </main><!-- End #main -->
</template>
<script>
  import MultiImageUploader from "@/components/util/img-upload.vue";

  export default {
    components: {MultiImageUploader}
  };
</script>
