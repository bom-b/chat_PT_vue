<template>
  <main id="main">
    <div class="center-div">
      <input type="date"  v-model="selectedDate" @change="getTodayPhoto">
      <h1>오늘 섭취한 칼로리 : {{ totalCalories }}Kcal</h1>
    </div>
    <div class="categories">
      <div class="categories" v-if="hasData">
        <div v-for="(data, category) in filteredCategorizedImages" :key="category" class="category-center">
          <div class="category-title-container">
            <h1 class="badge rounded-pill bg-secondary category-name">{{ category }}</h1>
          </div>
          <div v-for="(e, index) in data" :key="index" class="image-item">
            <div class="image-text-container" style="">
              <img :src="`${this.$s3BaseURL}/user_upload_food/${e.upphotoid}.jpg`" alt="Uploaded Image" class="uploaded-image"/>
              <div>
                <p>{{ e.foodName }}</p>
                <button class="btn btn-secondary" @click="togglePopover(e, $event)">
                  상세보기
                </button>
                <div v-if="activePopover === e" class="popover-content" :style="popoverStyle">
                  <div class="close-button-container">
                    <button class="close-button" @click="closePopover()">&#10006;</button> <!-- X 버튼이 있는 줄 -->
                  </div>
                  <div v-if="!e.editMode">
                    <p>음식명: {{ foods[e.foodnum] }} {{ e.predictrate }}%</p>
                    <p>양: {{ e.mass }}g</p>
                    <p>칼로리: {{ e.foodcal.toFixed(2) }}Kcal</p>
                    <p>탄수화물: {{ e.food_TAN }}g</p>
                    <p>단백질: {{ e.food_DAN }}g</p>
                    <p>지방: {{ e.food_GI }}g</p>
                    <p>후보1: {{ foods[e.candidate1] }} {{ e.candidate1RATE }}%</p>
                    <p>후보2: {{ foods[e.candidate2] }} {{ e.candidate2RATE }}%</p>
                    <p>후보3: {{ foods[e.candidate3] }} {{ e.candidate3RATE }}%</p>
                    <button class="btn btn-primary" @click="editFood(e)" style="float: right;">수정</button>
                    <button class="btn btn-danger" @click="deleteFood(e.upphotoid)" style="float: right;">삭제</button>
                  </div>
                  <div v-else>
                    <div style="display: flex; align-items: center;">
                      <input type="text" v-model="e.foodName" placeholder="음식명" />
                      <div style="flex-grow: 1;"></div> <!-- 남은 공간을 채우는 빈 div -->
                      <button class="btn" @click="resetFoodName(e)" style="float: right;">
                        <span class="material-icons">sync</span>
                      </button>
                    </div>
                    <div style="display: flex; align-items: center;">
                      <input type="number" v-model="e.quantity" placeholder="양" /> g
                      <div style="flex-grow: 1;"></div> <!-- 남은 공간을 채우는 빈 div -->
                      <button class="btn" @click="resetFoodQuantity(e)" style="float: right;">
                        <span class="material-icons">sync</span>
                      </button>
                    </div>

                    <p>칼로리: {{ e.foodcal.toFixed(2) }}Kcal</p>
                    <p>탄수화물: {{ e.food_TAN }}g</p>
                    <p>단백질: {{ e.food_DAN }}g</p>
                    <p>지방: {{ e.food_GI }}g</p>
                    <div v-for="candidate in [e.candidate1, e.candidate2, e.candidate3]" :key="candidate">
                      <input type="radio" :id="candidate" :value="candidate" v-model="e.selectedCandidate" @change="updateFoodName(e, candidate)">
                      <label :for="candidate">{{ foods[candidate] }}</label>
                    </div>
                    <button class="btn btn-danger" @click="cancelEdit(e)" style="float: right;">취소</button>
                    <button class="btn btn-success" @click="updateFood(e.upphotoid, e)" style="float: right;">저장</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-data-message">
        결과가 없습니다.
      </div>
    </div>
  </main>
</template>

<script>
import bootstrap from 'bootstrap'
export default {

  inject: ['foods'],
  data() {
    return {

      imgLink: 'http://localhost/springpt/images/upphoto/',
      categorizedImages: {
        아침: [],
        점심: [],
        저녁: [],
        간식: [],
      },
      activePopover: null,
      popoverStyle: {},
      selectedDate: null, // 선택된 날짜
    };
  },
  created() {
    this.selectedDate = new Date().toISOString().substr(0, 10);
    this.getTodayPhoto(); // 초기 날짜로 사진을 가져옵니다.
  },
  mounted() {
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        .forEach(function (popoverTriggerEl) {
          new bootstrap.Popover(popoverTriggerEl);
        });
  },
  computed: {
    totalCalories() {
      let total = 0;
      for (const category in this.categorizedImages) {
        for (const item of this.categorizedImages[category]) {
          total += item.foodcal;
        }
      }
      return total.toFixed(2); // 소수점 두 자리로 반올림
    },
    filteredCategorizedImages() {
      const filtered = {};
      for (const [category, data] of Object.entries(this.categorizedImages)) {
        if (data.length > 0) {
          filtered[category] = data;
        }
      }
      return filtered;
    },
    hasData() {
      return Object.values(this.filteredCategorizedImages).some(category => category.length > 0);
    },
  },
  hasData() {
    return Object.values(this.categorizedImages).some(category => category.length > 0);
  },
  methods: {
    async getTodayPhoto() {
      this.categorizedImages = { 아침: [], 점심: [], 저녁: [], 간식: [] };
      try {
        const response = await this.$axios.get(`/todayPhoto?date=${this.selectedDate}`);
        console.log("서버 응답:", response.data);
        for (const food of response.data) {
          if (!this.categorizedImages[food.category]) {
            this.categorizedImages[food.category] = [];
          }
          const weightRatio = food.mass / food.foodweight;

          food.foodcal = parseFloat((food.foodcal * weightRatio).toFixed(2));
          food.food_TAN = parseFloat((food.food_TAN * weightRatio).toFixed(2));
          food.food_DAN = parseFloat((food.food_DAN * weightRatio).toFixed(2));
          food.food_GI = parseFloat((food.food_GI * weightRatio).toFixed(2));

          let foodName = "";
          if(food.foodnum == -1){
            // 비동기 함수 호출 시 await 사용
            foodName = await this.getRequestFoodName(food.upphotoid);
            console.log("foodName : " + foodName)
          } else {
            foodName = this.foods[food.foodnum];
          }
          console.log("이게?이게? : " + foodName)
          const extendedFood = {
            ...food,
            editMode: false,
            foodName: foodName,
            originalFoodName: foodName, // 원래 음식명
            quantity: food.mass,
            selectedCandidate: null
          };

          this.categorizedImages[food.category].push(extendedFood);
        }
        console.log(this.categorizedImages);
      } catch (error) {
        console.error("서버 통신 오류:", error);
      }
    },
    async getRequestFoodName(upphotoid){
      try {
        const response = await this.$axios.get(`/getRequestFoodName?upphotoid=${upphotoid}`);
        console.log("response.data : " + response.data)
        return response.data;
      } catch (error) {
        console.error("서버 통신 오류:", error);
        return ""; // 오류 발생 시 빈 문자열 반환
      }
    },
    togglePopover(foodItem, event) {
      this.activePopover = this.activePopover === foodItem ? null : foodItem;
      if (this.activePopover) {
        this.calculatePopoverPosition(event.target);
      }
    },
    calculatePopoverPosition(button) {
      const popoverWidth = 300; // 팝오버 너비
      const popoverHeight = 450; // 팝오버 높이, 필요에 따라 조정
      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + (buttonRect.width / 2);
      const buttonBottomY = buttonRect.bottom + window.scrollY;

      let popoverX, popoverTop;
      // 가로 위치 계산
      if (buttonCenterX < window.innerWidth / 2) {
        popoverX = buttonCenterX;
      } else {
        popoverX = buttonCenterX - popoverWidth;
      }

      // 세로 위치 계산
      if (buttonBottomY + popoverHeight > window.innerHeight + window.scrollY) {
        // 화면 아래쪽에 공간 부족 시, 팝오버를 위로
        popoverTop = buttonRect.top + window.scrollY - popoverHeight;
      } else {
        // 공간 충분 시, 팝오버를 아래로
        popoverTop = buttonBottomY;
      }

      this.popoverStyle = {
        left: popoverX + 'px',
        top: popoverTop + 'px',
        opacity: 1,
        transform: 'translateY(10px)',
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      };
    },

    editFood(foodItem) {
      // 음식 편집 모드 활성화
      foodItem.editMode = true;
    },
    updateFoodName(foodItem, candidate) {
      // 후보 음식을 선택할 때 음식명 업데이트
      foodItem.foodName = this.foods[candidate];
    },
    resetFoodName(foodItem) {
      // 음식명에 대한 '새로고침' 기능
      foodItem.foodName = foodItem.originalFoodName;
    },
    resetFoodQuantity(foodItem) {
      // 양에 대한 '새로고침' 기능
      foodItem.quantity = foodItem.mass;
    },
    closePopover() {
      // 팝오버 닫기 기능
      this.activePopover = null;
    },
    cancelEdit(foodItem) {
      // 취소 버튼 기능: 편집 모드 해제 및 원래 값으로 복원
      foodItem.editMode = false;
      this.resetFoodName(foodItem);
      this.resetFoodQuantity(foodItem);
    },
    // 영양소 계산 메소드
    calculateNutrients(foodItem, foodData) {
      const weightRatio = foodItem.quantity / foodData.FOODWEIGHT;

      foodItem.foodcal = parseFloat((foodData.FOODCAL * weightRatio).toFixed(2));
      foodItem.food_TAN = parseFloat((foodData.FOOD_TAN * weightRatio).toFixed(2));
      foodItem.food_DAN = parseFloat((foodData.FOOD_DAN * weightRatio).toFixed(2));
      foodItem.food_GI = parseFloat((foodData.FOOD_GI * weightRatio).toFixed(2));

      console.log(foodItem);
    },
    updateFood(upphotoid, updatedData) {
      // 양 변경 여부 확인
      const quantityChanged = updatedData.quantity !== updatedData.mass;

      // 음식명 변경 여부 확인
      const nameChanged = updatedData.foodName !== updatedData.originalFoodName;

      // 양이 변경된 경우 즉시 업데이트
      if (quantityChanged) {
        this.$axios.post('/updateQuantity', {
          upphotoid: upphotoid,
          newQuantity: updatedData.quantity
        })
        .then(response => {
          console.log("양 업데이트 응답:", response.data);
          updatedData.mass = updatedData.quantity;
          // 영양소 재계산
          this.calculateNutrients(updatedData, response.data);
        })
        .catch(error => {
          console.error("양 업데이트 실패:", error);
        });
      }
      console.log("updatedData.foodName : " + updatedData.foodName)
      // 음식명이 변경된 경우 관리자 검수 요청
      if (nameChanged) {
        if(updatedData.selectedCandidate == null){
          updatedData.selectedCandidate = -1;
        }
        this.$axios.post('/requestNameChange', {
          upphotoid: upphotoid,
          imgeditcomment: updatedData.foodName,
          before : updatedData.foodnum,
          after :updatedData.selectedCandidate
        })
            .then(response => {
              console.log("음식명 변경 요청 응답:", response.data);
              this.$swal("음식명 변경 요청이 접수되었습니다. 검수 후 업데이트될 예정입니다.");
              this.getTodayPhoto();
            })
            .catch(error => {
              console.error("음식명 변경 요청 실패:", error);
            });
      }

      // 양이나 이름 중 하나라도 변경되었다면 편집 모드 해제
      if (quantityChanged || nameChanged) {
        updatedData.editMode = false;
      }
    },
    deleteFood(upphotoid) {
      console.log('upphotoid : ' + upphotoid);
      // 서버에 삭제 요청
      this.$axios.post('/deleteFood', {
        'upphotoid' : upphotoid
      })
      .then(response => {
        console.log("서버 응답:", response.data);
        // 삭제 성공 시, 클라이언트 측 데이터 업데이트
        for (const category in this.categorizedImages) {
          const index = this.categorizedImages[category].findIndex(food => food.upphotoid === upphotoid);
          if (index !== -1) {
            this.categorizedImages[category].splice(index, 1);
            break;
          }
        }
      })
      .catch(error => {
        console.error("서버 통신 오류:", error);
      });
    },



  },

};
</script>


<style lang="scss" scoped>
.no-data-message {
  text-align: center;
  margin-top: 20px;
}

.category-center {
  text-align: center;
  margin: auto;
  /* 필요에 따라 추가 스타일링을 적용할 수 있습니다. 예를 들어, 너비나 패딩 등 */
}
.center-div {
  margin: auto;
  width: 50%; /* 또는 원하는 너비 */
  text-align: center;
}
.close-button-container {
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px; /* 폰트 크기 조절 */
  border-radius: 50%;
  width: 20px; /* 버튼 크기 조절 */
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0;
  margin: 5px;
}
.popover-content {
  position: fixed;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform-origin: center;
  animation: popoverGrowShake 0.5s ease-out;
}

/* 커지면서 흔들리는 효과 */
@keyframes popoverGrowShake {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  95% {
    transform: scale(1) translateY(-5px);
  }
}




.image-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
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
  justify-content: center; /* 수평 방향으로 가운데 정렬 */
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
  max-height: 100px;
}
</style>