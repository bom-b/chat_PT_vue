<script>
export default {
  data() {
    return {
      height: '',
      weight: '',
      BMI: '',
      sex: '',
      purpose: 999,
      activity: 999,
    };
  },
  computed: {
    progress() {
      if (this.height && this.weight && this.sex) {
        return 75;
      } else {
        return 50;
      }
    },
    // 이미지 데이터 배열
    images() {
      return [
        { path: require('../../../assets/img/ptgogo.png'), alt: 'Image 1', active: this.BMI >= 0 && this.BMI < 18.5 },
        { path: require('../../../assets/img/ptgogo.png'), alt: 'Image 2', active: this.BMI >= 18.5 && this.BMI < 23 },
        { path: require('../../../assets/img/qrchoon.png'), alt: 'Image 3', active: this.BMI >= 23 && this.BMI < 25 },
        { path: require('../../../assets/img/qrchoon.png'), alt: 'Image 4', active: this.BMI >= 25 },
      ];
    },
    getImagePath() {
      if (this.BMI >= 0 && this.BMI < 18.5) {
        return require('../../../assets/img/ptgogo.png');
      } else if (this.BMI >= 18.5 && this.BMI < 23) {
        // return require('@/assets/정상.png');
        return require('../../../assets/img/ptgogo.png');
      } else if (this.BMI >= 23 && this.BMI < 25) {
        // return require('@/assets/과체중.png');
        return require('../../../assets/img/qrchoon.png');
      } else if (this.BMI >= 25) {
        // return require('@/assets/비만.png');
        return require('../../../assets/img/qrchoon.png');
      } else {
        return require('../../../assets/img/춘식얼굴.png'); // or provide a default image path
      }
    },
  },
  methods: {
    proceedToNextPage() {
      if (this.height && this.weight && this.sex) {
        this.$router.push('/sign_up4');
      } else {
        alert('키, 몸무게, 성별을 입력해주세요!');
      }
    },
    calculateBMI() {
      if (this.height && this.weight) {
        this.BMI = (this.weight / ((this.height / 100) ** 2)).toFixed(2);
        return this.BMI;
      } else {
        return '';
      }
    },
    setSex(sex) {
      this.sex = sex;
    },
    setPurpose(purpose) {
      this.purpose = purpose;
    },
    setActivity(activity) {
      this.activity = activity;
    }
  },
};
</script>
<template>
  <main class="main">
    <div class="container">
      <div class="progress fixed-top" style="margin-top: 81px">
        <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
          aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div class="container mt-5 pt-2">
        <h2>키와 몸무게 입력</h2>
        <div class="input-container">
          <ul>
            <li>
              <label for="sex">성별</label>
              <div class="btn-group" role="group">
                <button type="button" class="btn" :class="{ 'btn-male': sex === 'male' }" @click="setSex('male')">
                  <i class="material-icons">male</i>
                </button>
                <button type="button" class="btn" :class="{ 'btn-female': sex === 'female' }" @click="setSex('female')">
                  <i class="material-icons">female</i>
                </button>
              </div>
            </li>
            <li>
              <label for="age">나이(만)</label>
              <input class="form-control" type="number" id="age" v-model="age">
            </li>
            <li>
              <label for="height">키(cm)</label>
              <input class="form-control" type="number" id="height" v-model="height">
            </li>
            <li>
              <label for="weight">몸무게(kg)</label>
              <input class="form-control" type="number" id="weight" v-model="weight">
            </li>
            <li>
              <label for="bmi"> bmi </label>
              <div>{{ calculateBMI() }}</div>
            </li>
            <div class="image-container">
              <div v-for="image in images" :key="image.path" :class="{ 'active-image': image.active }">
                <img :src="image.path" :alt="image.alt" class="image">
              </div>
            </div>
            <li>
              <label for="purpose">목적</label>
              <div class="purpose_list">
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 0 }" id="diet"
                  @click="setPurpose(0)"> 다이어트 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 1 }" id="keep"
                  @click="setPurpose(1)"> 체중유지 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 2 }" id="bulk-up"
                  @click="setPurpose(2)"> 벌크업 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 3 }" id="improve"
                  @click="setPurpose(3)"> 식습관 개선 </button>
              </div>
            </li>
            <li>
              <label for="activity">활동량</label>
              <div class="purpose_list">
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 0 }" id="diet"
                  @click="setActivity(0)"> 안 함</button>
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 1 }" id="keep"
                  @click="setActivity(1)"> 가끔 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': purpose === 2 }" id="bulk-up"
                  @click="setActivity(2)"> 열심 </button>

              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-success" @click="proceedToNextPage"
          :disabled="!height || !weight || !sex || !purpose">
          다음
        </button>
      </div>
    </div>
  </main>
</template>


<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin: auto;
  border: 1px solid #f0f2f1;
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* 그림자 추가 */
  transition: background-color 0.2s ease;
}

li {
  list-style-type: none;
  /* 기본 마커 제거 */
  position: relative;
  /* 하위 요소에 절대 위치 지정을 위함 */
  padding-left: 30px;
  /* 이미지와 텍스트 간 거리 조정 */
}

li::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  width: 20px;
  /* 원하는 너비로 설정 */
  height: 20px;
  /* 원하는 높이로 설정 */
  background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif');
  background-size: cover;
  /* 이미지가 요소를 완전히 덮도록 설정, 필요에 따라 'contain'으로 변경 가능 */
  background-repeat: no-repeat;
  /* 이미지가 반복되지 않도록 설정 */
  background-position: center;
  /* 이미지가 요소의 중앙에 위치하도록 설정 */
}


.active-image {
  border: 2px solid red;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.image {
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
}


.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-group {
  display: flex;
}

.btn-group button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.btn-male {
  background-color: skyblue;
}

.btn-female {
  background-color: pink;
}

@import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  text-align: center;
  padding: 100px;
  background: whitesmoke;
  display: table-cell;
}

button {
  margin: 20px;
}

.selected-purpose {
  background-color: black;
  /* 선택된 목적 버튼에 원하는 스타일을 추가하세요 */
}
</style>