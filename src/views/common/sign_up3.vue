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
            <label for="height">키(cm)</label>
            <input class="form-control" type="number" id="height" v-model="height">
          </li>
          <li>
            <label for="weight">몸무게(kg)</label>
            <input class='form-control' type="number" id="weight" v-model="weight">
          </li>
          <li>
            <label for="bmi"> bmi </label>
            <div>{{ calculateBMI() }}</div>
          </li>
        </ul>
      </div>

      <div class="button-container">
        <button type="button" class="btn btn-primary" @click="proceedToNextPage" :disabled="!height || !weight">
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
</style>

<script>
export default {
  data() {
    return {
      height: '',
      weight: '',
      BMI: '',
    };
  },
  computed: {
    progress() {
      if (this.height && this.weight) {
        return 75;
      } else {
        return 50;
      }
    },
  },
  methods: {
    proceedToNextPage() {
      if (this.height && this.weight) {
        if (this.hasAllergy === 'yes') {
          this.showAllergyToast = true;
        } else {
          this.$router.push('/next-page');
        }
      } else {
        // 키 또는 몸무게가 입력되지 않았을 때 처리
        alert('키와 몸무게를 입력해주세요!');
      }
    },
    calculateBMI() {
      if (this.height && this.weight) {
        this.BMI = (this.weight / ((this.height / 100) ** 2)).toFixed(2); // 키를 cm에서 m로 변환하고 소수점 두 자리까지 계산
        return this.BMI;
      } else {
        return '';
      }
    },
  },
};
</script>