<template>

  <section id="hero" class="hero d-flex align-items-center section-bg">
        <div class="col-12" style="max-width: 1600px; margin: 0 auto;">
          <h1 data-aos="fade-in" data-aos-duration="1000" class="TheJamsil400"
              style="white-space: nowrap; margin: 1vw;">간편하게 이용하는 식단관리
            솔루션,<br>Chat PT</h1>
          <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" class=""
             style="white-space: nowrap; margin: 1vw; color: #727070">
            건강한 식단을 찾고 계신 당신에게
            <br>
            맞춤 식단 전문가가 되어 드립니다.
          </p>
          <div class="d-flex" data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100">
            <a href="shipdan.me/" class="" style="margin: 1vw; text-decoration: none;">자세히 알아보기</a>
          </div>
        </div>
      </section><!-- End Hero Section -->
  
  
    <!--  오늘 어쩌구~ -->
    <section>
      <div class="gray" style="min-height: 100%; height: auto; padding: 30px">
        <div class="section1800">
          <h3
            class="TheJamsil400"
            data-aos="fade-in"
            data-aos-duration="2000"
            data-aos-delay="100"
          ></h3>
          <div
            class="row justify-content-center align-items-center"
            style="margin-top: 50px; text-align: center"
          >
            <div
              class="goal-box col-2"
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
                <router-link to="/pt_coupon" class="router-link">
                <button class="select_button_menu cupon_cl">
                  
                  <img
                    class=""
                    src="../../assets/img/cupon.png"
                    alt=""
                    style="width: 32px"
                  />쿠폰관리</button
                ><br />
                </router-link>
              </p>
            </div>
            <div
              class="goal-box col-2"
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
                <router-link to="/pt_members" class="router-link">
                <img
                  class=""
                  src="../../assets/img/time.png"
                  alt=""
                  style="width: 32px"
                /><button class="select_button_menu time_cl">휴무일</button><br />
              </router-link>
              </p>
            </div>
            <div
              class="goal-box col-2"
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
                <router-link to="/pt_members" class="router-link">
                <img
                  class=""
                  src="../../assets/img/user_icon.png"
                  alt=""
                  style="width: 32px"
                /><button class="select_button_menu mem_cl">회원 관리</button
                ><br />
                </router-link>
              </p>
            </div>
            <div
              class="goal-box col-2"
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
                <router-link to="/pt_chat" class="router-link">
                <img
                  class=""
                  src="../../assets/img/chat.png"
                  alt=""
                  style="width: 32px"
                /><button class="select_button_menu chat_cl" ref="#">
                  채팅방</button
                ><br />
                </router-link>
              </p>
            </div>
  
            <div
              class="goal-box col-2"
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
                <router-link to="/pt_review#" class="router-link">
                <img
                  class=""
                  src="../../assets/img/recommend.png"
                  alt=""
                  style="width: 32px"
                /><button class="select_button_menu review_cl">리뷰 관리</button
                ><br />
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section class="">
      <div class="">
        <div class="card-container" style="text-align: center; border: none">
          <div
            class="card "
            style="
              width: 18rem;
              display: inline-block;
              margin: 1rem;
              border: none;
            "
          >
            <img src="../../assets/img/칼로리.png" class="card-img-top" alt="1" />
            <div class="card-body">
              <h5 class="card-title">상담신청 회원 수</h5>
              <p class="card-text"></p>
            </div>
          </div>
          <div
            class="card"
            style="
              width: 18rem;
              display: inline-block;
              margin: 1rem;
              border: none;
            "
          >
            <img src="../../assets/img/칼로리.png" class="card-img-top" alt="1" />
            <div class="card-body">
              <h5 class="card-title">새로운 채팅</h5>
              <p class="card-text"></p>
            </div>
          </div>
          <div
            class="card"
            style="
              width: 18rem;
              display: inline-block;
              margin: 1rem;
              border: none;
            "
          >
            <img src="../../assets/img/칼로리.png" class="card-img-top" alt="1" />
            <div class="card-body">
              <h5 class="card-title">새로운 리뷰</h5>
              <p class="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  <div class="col-12 green" style="height: 100px; margin-bottom: 0;">
  </div>
  <!-- ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ   -->
  <section>
    <div class="card card_plale">
      <div class="card-header">
        <div class="faq-tab">
          <a class="faq-tab-item active">공지사항</a>
          <!-- 추가 질문 탭들을 필요에 따라 추가 -->
        </div>
      </div>
  
      <div class="card-body">
        <!-- 나머지 코드는 그대로 유지 -->
  
        <div class="content-box">
          <div class="title"><a href="view.html">안녕하세요 이것은 게시판 제목입니다 .</a></div>
        </div>
  
        <div class="content-list">
          <div class="title"><a href="view.html">게시판에 제목을 입력합니다.</a></div>
  
        </div>
  
        <div class="content-box">
          <div class="title"><a href="view.html">이곳에 제목을 입력해주세요.</a></div>
        </div>
  
        <div class="content-box">
          <div class="title"><a href="view.html">오늘의 날씨는 어떤가요.</a></div>
        </div>
  
        <ul class="number">
          <li><a href="#">&lt; </a></li>
          <li><a href="#" class="active">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">&gt; </a></li>
        </ul>
      </div>
    </div>
  </section>
  <div>
  
    <a><img src="../../assets/img/춘식이눕기.png"></a>
  
  </div>
  </template>
  
  
  <script>
  export default {
  
  };
  
  
  
  const cards = document.querySelectorAll(".card");
  
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });
  
  </script>
  
  <style scoped>
  .select_button_menu {
    border: none;
    background-color: white;
  }
  
  
  .container {
    width:100%;
    margin:0 auto;
  }
  
  .title {
    text-align:center;
  }
  
  .qna-list {
    list-style-type:none;
    padding:0;
  }
  
  .qna-item {
    margin-bottom:10px;
  }
  
  </style>
  
  
  <style scoped>
  li {
  list-style: non; /* list 생성시 나오는 '-' 마크 제거 */
  }
  a {
  
  color: inherit; /* 글자 색생은 부모로부터 상속 */
  text-decoration: none;
  
  }
  
  head {
  display: none;
  }
  body {
  display: block;
  }
  .card_plale {
  width: 700px;
  height: 500px;
  margin: 100px auto;
  
  box-shadow: 3px 3px 50px #e6e6e6;
  /* box-shadow: 1px 1px 10px #000; */
  /* box-shadow: offset x y blur color; */
  /* offset x:는 얼마나, y:는 얼마나 blur:흐림정도는 얼마나 color:색은 어떤걸로*/
  
  border-radius: 20px;
  position: center; /* 상대적인 값 */
  }
  
  .card-header {
  padding: 20px;
  text-align: center;
  }
  .card-header h1 {
  font-size: 30px;
  font-weight: 600;
  }
  .card-body {
  padding: 20px;
  text-align: center;
  }
  .card-body input[type="search"] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #999;
  border-radius: 10px;
  width: 300px;
  font-size: 16px;
  }
  .card-body a.search {
  padding: 10px 15px 10px 15px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: tomato;
  color: #fff;
  }
  .card-body div {
  margin-top: 10px;
  border-bottom: 1px solid #e6e6e6;
  }
  
  .card-body div div {
  display: inline-block;
  padding: 15px 10px 15px 10px;
  margin: 0;
  border: none;
  }
  
  .card-body .check ,.delete {
  width: 5%;
  }
  .card-body .title {
  width: 70%;
  text-align: left;
  }
  .card-body .delete button {
  background-color: #fff;
  border: none;
  }
  .number {
  padding: 10px;
  }
  
  .number li {
  display: inline-block;
  }
  
  
  .number li a {
  display: block;
  width: 40px;
  /* text-align이 위로 올라간다 */
  line-height: 40px;
  border-radius: 10px;
  margin: 3px;
  margin-top: 20px;
  box-shadow: 0 5px 10px #f1f1f1;
  
  }
  
  .number li a.active {
  background-color: rgb(13, 179, 115);
  
  }
  
  .btn {
  /* position: absolute; 는 절대적인 값으로 상대적인 값이 필요하다. */
  /* 상대적인 값은 전체 영역을 담당하는 class="card"에 position: relative; 을 추가한다. */
  position: absolute; /* 절대적인 값 */
  right: 0;
  bottom: 0;
  padding: 10px;
  margin: 10px 10px 20px 10px ;
  }
  
  .btn a {
  padding: 10px;
  background-color: tomato;
  color: #fff;
  border-radius: 10px;
  }
  
  </style>