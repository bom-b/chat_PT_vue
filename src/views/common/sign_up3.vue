<template>
  <main>
    <div class="progress mt-3">
      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
        aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="container">
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
            <label for="age">나이</label>
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
              <img :src="image.path" :alt="image.alt" class="image" @click="handleImageClick(image)">
            </div>
          </div>
          <li>
            <label for="purpose">목적</label>
            <div class="purpose_list">
        <button class="btn btn-primary" :class="{ 'selected-purpose': purpose === 'diet' }" id="diet" @click="setPurpose('diet')"> 다이어트 </button>
        <button class="btn btn-primary" :class="{ 'selected-purpose': purpose === 'keep' }" id="keep" @click="setPurpose('keep')"> 체중유지 </button>
        <button class="btn btn-primary" :class="{ 'selected-purpose': purpose === 'bulk-up' }" id="bulk-up" @click="setPurpose('bulk-up')"> 벌크업 </button>
        <button class="btn btn-primary" :class="{ 'selected-purpose': purpose === 'improve' }" id="improve" @click="setPurpose('improve')"> 식습관 개선 </button>
      </div>

          </li>
        </ul>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-primary" @click="proceedToNextPage"
          :disabled="!height || !weight || !sex || !purpose">
          다음
        </button>
      </div>
    </div>
  </main>
</template>
<script>

export default {
  data() {
    return {
      height: '',
      weight: '',
      BMI: '',
      sex: '',
      purpose: '',
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
        { path: require('./ptgogo.png'), alt: 'Image 1', active: this.BMI >= 0 && this.BMI < 18.5 },
        { path: require('./ptgogo.png'), alt: 'Image 2', active: this.BMI >= 18.5 && this.BMI < 23 },
        { path: require('./qrchoon.png'), alt: 'Image 3', active: this.BMI >= 23 && this.BMI < 25 },
        { path: require('./qrchoon.png'), alt: 'Image 4', active: this.BMI >= 25 },
      ];
    },
    getImagePath() {
      if (this.BMI >= 0 && this.BMI < 18.5) {
        return require('./ptgogo.png');
      } else if (this.BMI >= 18.5 && this.BMI < 23) {
        // return require('@/assets/정상.png');
        return require('./ptgogo.png');
      } else if (this.BMI >= 23 && this.BMI < 25) {
        // return require('@/assets/과체중.png');
        return require('./qrchoon.png');
      } else if (this.BMI >= 25) {
        // return require('@/assets/비만.png');
        return require('./qrchoon.png');
      } else {
        return require('./춘식얼굴.png'); // or provide a default image path
      }
    },
  },
  methods: {
    handleImageClick(image) {
      // 클릭한 이미지에 따라 특정 동작 수행
      console.log(`Clicked on image: ${image.alt}`);
    },
    proceedToNextPage() {
      if (this.height && this.weight && this.sex) {
        // 다음 페이지로 이동
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
    }
  },
};
</script>

<style scoped>
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