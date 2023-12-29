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
        </ul>
      </div>

      <div class="button-container">
        <button type="button" class="btn btn-primary" @click="proceedToNextPage" :disabled="!height || !weight || !sex">
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
</style>

<script>
export default {
  data() {
    return {
      height: '',
      weight: '',
      BMI: '',
      sex: '',
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
  },
  methods: {
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
  },
};
</script>