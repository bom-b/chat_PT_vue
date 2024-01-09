<template>
  <main id="main" class="">
    <div>
      <h1>오늘 섭취한 칼로리 : 3000Kcal</h1>
    </div>
    <div class="categories">
      <div v-for="(images, category) in categorizedImages" :key="category">
        <div class="category-title-container">
          <h1 class="badge rounded-pill bg-secondary category-name">{{ category }}</h1>
        </div>
        <div
            v-for="(image, index) in images"
            :key="index"
            draggable="false"
            class="image-item"
        >
          <div class="image-text-container">
            <img :src="image" alt="Uploaded Image" class="uploaded-image"/>
            <p>음식명 : 피자<br>
              양 : 300g<br>
              칼로리 : 400Kcal<br>
              탄수화물 : 30g<br>
              단백질 : 20g<br>
              지방 : 10g</p>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
//import sha256 from 'js-sha256';
//import EXIF from 'exif-js';

export default {

  data() {
    return {
      categorizedImages: {
        아침: ['@/assets/img/pizza.jpeg','@/assets/img/pizza.jpeg','@/assets/img/pizza.jpeg'], // 이미지 URL 배열
        점심: ['@/assets/img/pizza.jpeg'],
        저녁: ['@/assets/img/pizza.jpeg'],
        간식: ['@/assets/img/pizza.jpeg'],
      },
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.image-text-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px; /* 이미지와 텍스트 사이의 간격 */
}

.image-text-container p {
  white-space: pre-wrap; /* 줄바꿈과 공백 유지 */
}

.category-title-container {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto; /* 필요에 따라 조정 가능 */
  /* 추가적인 스타일링 */
}
.category-name {
  flex-shrink: 0; /* 카테고리 이름의 크기가 줄어들지 않도록 설정 */
  margin-right: 20px; /* 이름과 이미지 사이의 간격을 설정 */
  font-size: 24px;

}
#app {
  width: 100%;
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
  position: relative; /* 하위 요소들의 위치 지정 기준 */
}

.categories {
  display: flex;
  flex-wrap: wrap; /* 필요한 경우 요소들이 다음 줄로 넘어가도록 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  gap: 10px; /* 카테고리 간의 간격 설정 */
  flex-direction: column; /* 세로 정렬 */
  box-sizing: border-box;
  width: 100%; /* 화면 전체 너비 */
  align-items: flex-start; /* 좌측 정렬 */
}

.category {
  flex-grow: 1; /* 각 카테고리가 공간을 균등하게 차지하도록 함 */
  padding: 10px; /* 내부 패딩 추가 */
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
  display: flex; /* flexbox 레이아웃 적용 */
  flex-direction: row; /* 자식 요소들을 가로로 정렬 */
  align-items: center; /* 자식 요소들을 가로로 늘림 */
  min-height: 200px; /* 최소 높이 설정 */
  margin: 10px;
  //max-width: 22%;
  min-width: 22%;
}

.drag-area {
  display: flex; /* flex 컨테이너로 설정 */
  flex-direction: row; /* 자식 요소들을 가로로 나열 */
  flex-wrap: nowrap; /* 자식 요소들이 다음 줄로 넘어가지 않도록 설정 */
  overflow-x: auto; /* 내용이 넘칠 경우 스크롤 가능하게 설정 */
  flex-grow: 1; /* drag-area가 남은 공간을 모두 차지하도록 함 */
  align-items: stretch;

}
.over {
  background-color: lightblue; /* 드래그 오버 시 시각적 피드백 */
}

.uploaded-image {
  border: 2px solid red; /* 붉은 색 테두리 */
}

.image-item {
  position: relative;
  flex-shrink: 0; /* 이미지 크기가 줄어들지 않도록 설정 */
  display: inline-block; /* 또는 필요에 따라 다른 디스플레이 속성 사용 */
}

.delete-button {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px; /* 폰트 크기 조정 */
  width: 20px;     /* 버튼 너비 */
  height: 20px;    /* 버튼 높이 */
  padding: 0;      /* 패딩 제거 또는 조정 */
  border-radius: 50%; /* 원형 버튼을 원한다면 추가 */
}

.multi-image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drag-drop {
  padding: 20px;
  text-align: center;
}

.drag-over {
  border-color: #2196F3;
}

.preview {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 10px;
}

.image-item img {
  max-width: 100%;
  max-height: 200px;
}
</style>