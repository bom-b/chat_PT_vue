<template>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div class="scroll-area section1400"
         style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="row" style="margin-top: 50px; text-align: center; display: flex;">

        <div style="margin-bottom: 50px;"
            data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
          <span class="material-icons pine_Green_text">bar_chart</span>
          <span id="" class="pine_Green_text TheJamsil400"
                style="white-space: nowrap; font-size: 1.7rem;">나만의 맞춤 음식 추천</span>
        </div>
        <div style="margin-bottom: 50px;">
          <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">추천 음식 리스트</p>
          <p>회원님의 선호 음식을 AI가 분석해 추천해 드려요</p>
          <div id="app">
            <div class="header section1400">
              <span class="title">마지막으로 등록한 음식</span>
              <div class="profile-image-wrapper">
                <img src="../../assets/img/don.jpeg" alt="프로필 이미지" class="profile-image">
              </div>
              <div class="subtitle">돈까스</div>
            </div>
            </div>
            <!-- 상품 목록을 감싸는 컨테이너 -->
            <div class="product-container">
              <!-- 상품을 나타내는 div, 실제 데이터를 연결하기 위한 v-for 디렉티브는 제거 -->
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <div class="product-item">
                <!-- 이미지를 넣을 자리 -->
                <img src="placeholder-image-url" alt="상품 설명" class="product-image">
                <!-- 상품 설명을 넣을 자리 -->
                <div class="product-details">
                  <h3>상품 이름</h3>
                  <p>상품 가격</p>
                </div>
              </div>
              <!-- 다른 상품들도 이런 식으로 div를 추가하면 됩니다 -->
            </div>

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
      
      
      </div>
    </div>
    <!--  섹션2  -->
    <div class="scroll-area" style="display: flex; justify-content: center; align-items: center;">
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
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
}

.profile-image-wrapper {
  border-radius: 50%;
  overflow: hidden;
  width: 100px; /* 프로필 이미지 크기 조정 */
  height:100px;
  border: 2px solid blue; /* 테두리 색상은 이미지에 맞게 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: auto;
}

.subtitle {
  font-size: 1rem;
  color: #555;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 16px;
}

/* 개별 상품 아이템 스타일 */
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.product-details {
  padding: 8px;
}
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
  height: 150vh;
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
