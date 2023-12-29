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
            <label for="age">나이</label>
            <input class="form-control" type="number" id="age" v-model="age">
          </li>
          <li>
            <label for="height">키(cm)</label>
            <input class="form-control" type="number" id="height" v-model="height">
          </li>
          <li>
            <label for="weight">몸무게(kg)</label>
            <input class='form-control' type="number" id="weight" v-model="weight">
          </li>
          <li>
            <label for="bmi">BMI</label>
            <div>{{ calculateBMI() }}</div>
          </li>
          <li>
            <label for="obesity">비만 여부</label>
            <div>{{ determineObesity() }}</div>
          </li>
        </ul>
      </div>

      <div class="bmi-chart-container">
        <h2>BMI 분포도</h2>
        <div class="bmi-chart">
          <div class="bmi-point" :style="{ top: getBMIPointPosition(), left: getAgePosition() }"></div>
        </div>
      </div>

      <div class="button-container">
        <button type="button" class="btn btn-primary" @click="proceedToNextPage" :disabled="!age || !height || !weight">
          다음
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.bmi-chart-container {
  text-align: center;
  margin-top: 50px;
}

.bmi-chart {
  position: relative;
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
}

.bmi-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

.input-container {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      age: '',
      height: '',
      weight: '',
      BMI: '',
      obesity: '',
      bmiMin: 18.5,
      bmiMax: 35,
    };
  },
  computed: {
    progress() {
      if (this.age && this.height && this.weight) {
        return 75;
      } else {
        return 50;
      }
    },
  },
  methods: {
    proceedToNextPage() {
      if (this.age && this.height && this.weight) {
        if (this.hasAllergy === 'yes') {
          this.showAllergyToast = true;
        } else {
          this.$router.push('/next-page');
        }
      } else {
        // 나이, 키, 몸무게 중 하나라도 입력되지 않았을 때 처리
        alert('나이, 키, 몸무게를 입력해주세요!');
      }
    },
    calculateBMI() {
      if (this.age && this.height && this.weight) {
        this.BMI = (this.weight / ((this.height / 100) ** 2)).toFixed(2); // 키를 cm에서 m로 변환하고 소수점 두 자리까지 계산
        return this.BMI;
      } else {
        return '';
      }
    },
    determineObesity() {
      if (this.BMI) {
        if (this.BMI < 18.5) {
          this.obesity = '저체중';
        } else if (this.BMI < 23) {
          this.obesity = '정상 체중';
        } else if (this.BMI < 25) {
          this.obesity = '과체중';
        } else if (this.BMI < 30) {
          this.obesity = '경도 비만';
        } else if (this.BMI < 35) {
          this.obesity = '중등도 비만';
        } else {
          this.obesity = '고도 비만';
        }
        return this.obesity;
      } else {
        return '';
      }
    },
    getBMIPointPosition() {
      const BMI = this.calculateBMI(); // BMI 값을 계산하여 저장

      if (BMI) {
        const percentage = (BMI - this.bmiMin) / (this.bmiMax - this.bmiMin);
        const chartHeight = 200;
        const pointPosition = chartHeight - percentage * chartHeight;
        return `${pointPosition}px`;
      } else {
        return 0;
      }
    },
    getAgePosition() {
      if (this.age) {
        const chartWidth = 300;
        const agePercentage = this.age / 100; // 임의로 나이를 100으로 나누어 표기
        const agePosition = agePercentage * chartWidth;
        return `${agePosition}px`;
      } else {
        return 0;
      }
    },
  },
};
</script>