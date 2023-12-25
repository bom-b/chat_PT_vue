<style lang="scss" scoped>
nav {
  position: fixed; /* 네비게이션바를 화면에 고정 */
  top: 0; /* 화면 상단에 위치 */
  width: 100%; /* 전체 화면 폭을 차지하도록 설정 */
  z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
}

.router-link {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 링크 색상 유지 */
}

a {
  text-decoration: none !important; /* 밑줄 제거 */
  color: inherit !important; /* 기본 텍스트 색상 사용 */
}
</style>
<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light"
       style="height: 60px; background-color: white !important;">
    <div class="container-fluid">
      <router-link to="/d_home" class="router-link navbar-brand">
        <img src="../../assets/img/배경지운 로고.png" alt="" style="width: 50px;">
        Chat PT
      </router-link>

        <ul class="navbar-nav ml-auto text-right">
          <li class="nav-item dropdown">

            <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <span class="material-icons">chat</span>
              <span class="badge bg-success badge-number">3</span>
            </a><!-- End Messages Icon -->

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li class="dropdown-header">
                3개의 확인하지 않은 메시지가 있습니다.
                <a href="#"><span class="badge rounded-pill bg-warning p-2 ms-2">모두보기</span></a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li class="message-item" style="padding: 10px;">
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

              <li class="message-item" style="padding: 10px;">
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

    </div>
  </nav>
</template>
<script>
export default {
  name: "app-header",
};
</script>
