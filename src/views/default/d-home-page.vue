<style>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#hero {
  background-image: url('../../assets/img/어두운 배경.png'); /* 이미지 파일 경로를 설정하세요 */
  background-size: cover; /* 배경 이미지를 섹션에 맞게 확대/축소 */
  background-position: center; /* 배경 이미지를 가운데 정렬 */
  color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
  text-align: center; /* 텍스트를 가운데 정렬 */
  padding: 0.2vw; /* 내용과의 간격을 설정하세요 */
}
</style>
<template>
  <main id="main" class="main background">
    <nav class="navbar navbar-expand-sm navbar-light bg-light"
         style="min-height: 80px; background-color: white !important;">
      <ul class="d-flex text-right align-right">

        <li class="nav-item dropdown">

          <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <span class="material-icons">chat</span>
            <span class="badge bg-success badge-number">3</span>
          </a><!-- End Messages Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
            <li class="dropdown-header">
              3개의 확인하지 않은 메시지가 있습니다.
              <a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">모두보기</span></a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li class="message-item">
              <a href="#">
                <img src="../../assets/img/그림1.jpg" alt="" class="rounded-circle" style="width: 32px;">
                <div>
                  <h4>양승진 트레이너</h4>
                  <p>회원님 식단 올려주신거 잘 봤습니다. 조금 이따 뵐게요!</p>
                  <p>1시간 전</p>
                </div>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li class="message-item">
              <a href="#">
                <img src="../../assets/img/춘계인 확대.jpg" alt="" class="rounded-circle" style="width: 32px;">
                <div>
                  <h4>운영자</h4>
                  <p>트레이너 연결이 성공적으로 완료되었습니다.</p>
                  <p>6시간 전</p>
                </div>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li class="dropdown-footer">
              <a href="#">모두 보기</a>
            </li>

          </ul><!-- End Messages Dropdown Items -->

        </li><!-- End Messages Nav -->
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="../../assets/img/춘계인 확대.jpg" alt="Profile" class="rounded-circle" style="width: 32px;">
            <span class="d-none d-md-block dropdown-toggle ps-2">춘시기님</span>
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6>춘시기님</h6>
              <span>일반회원</span>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i class="bi bi-person"></i>
                <span>나의 프로필</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i class="bi bi-gear"></i>
                <span>신체 정보 수정</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                <i class="bi bi-question-circle"></i>
                <span>회원 정보 수정</span>
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="#">
                <i class="bi bi-box-arrow-right"></i>
                <span>로그 아웃</span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->
      </ul>
    </nav>
    <div class="col-lg-12" style="margin-bottom: 1vw;">
      <!-- ======= Hero Section ======= -->
      <section id="hero" class="hero d-flex align-items-center section-bg">
        <div class="container">
          <div class="row justify-content-between gy-5">
            <div
                class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h1 data-aos="fade-up" class="TheJamsil400" style="white-space: nowrap; margin: 1vw;">간편하게 이용하는 식단관리
                솔루션,<br>Chat PT</h1>
              <p data-aos="fade-up" data-aos-delay="100" class="" style="margin: 1vw;">
                건강한 식단을 찾고 계신 당신에게
                <br>
                맞춤 식단 전문가가 되어 드립니다.
              </p>
              <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="" class="" style="margin: 1vw;">자세히 알아보기</a>
              </div>
            </div>
          </div>
        </div>
      </section><!-- End Hero Section -->
    </div>

    <section class="section dashboard" style="padding:0 2vw;">
      <div class="row">

        <!-- Left side columns -->
        <div class="col-lg-8">
          <div class="row">

            <!-- 사진 등록 -->
            <div class="col-12">
              <div class="container-xl" style="min-height: 300px; padding: 2vw;">
                <h1 class="TheJamsil400" style="white-space: nowrap">오늘의 식단을 업로드 해주세요!</h1>
                <p class="" style="font-size: 1em; white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
                <button class="btn btn-warning">사진 업로드</button>
              </div>
              <div class="container-xl">
                <!--       캐러셀         -->
                <div>
                  <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
                    <SplideSlide>
                      <img src="../../assets/logo.png" alt="Sample 1">
                    </SplideSlide>
                    <SplideSlide>
                      <img src="../../assets/logo.png" alt="Sample 2">
                    </SplideSlide>
                  </Splide>
                </div>
              </div>
            </div><!-- 사진 등록 -->

          </div>
        </div><!-- End Left side columns -->

        <!-- Right side columns -->
        <div class="col-lg-4">
          <div class="col-12">
            <!-- 오늘의 칼로리 -->
            <div class="card" style="max-height: 500px; display: block; width: 100%; padding: 1vw;">
              <div class="card-body pb-0" style="height: auto;">
                <h5 class="card-title">오늘의 칼로리</h5>
                <img src="../../assets/img/칼로리.png"
                     style="margin-top: 2vw; max-width: 50%; height: auto; object-fit: cover;" alt="s">
              </div>
            </div><!-- 오늘의 칼로리 -->
          </div>
        </div><!-- End Right side columns -->

      </div>
    </section>

  </main><!-- End #main -->

</template>
<!-- ECharts Library -->
<script>
import {defineComponent} from 'vue'; // 추가
// import * as echarts from 'echarts';
import {Splide, SplideSlide} from '@splidejs/vue-splide';

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
  },

  // mounted() {
  //   // 'echarts' 변수가 'mounted' 훅 안에서 사용되므로 이곳에서 초기화
  //   echarts.init(document.querySelector("#trafficChart")).setOption({
  //     tooltip: {
  //       trigger: 'item'
  //     },
  //     legend: {
  //       top: '5%',
  //       left: 'center'
  //     },
  //     series: [{
  //       name: 'Access From',
  //       type: 'pie',
  //       radius: ['40%', '70%'],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: 'center'
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: '18',
  //           fontWeight: 'bold'
  //         }
  //       },
  //       labelLine: {
  //         show: false
  //       },
  //       data: [{
  //         value: 1048,
  //         name: '점심'
  //       },
  //         {
  //           value: 435,
  //           name: '아침'
  //         },
  //         {
  //           value: 0,
  //           name: '저녁'
  //         },
  //         {
  //           value: 120,
  //           name: '간식'
  //         },
  //         {
  //           value: 930,
  //           name: '남은 칼로리',
  //           itemStyle: {
  //             color: 'grey' // '남은 칼로리'를 회색으로 지정
  //           }
  //         }
  //       ]
  //     }]
  //   });
  // }
});
</script>
