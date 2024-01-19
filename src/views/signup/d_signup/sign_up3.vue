<script>
export default {
  data() {
    return {
      user: {
        age: '',
        height: '',
        weight: '',
        bmi: '',
        sex: '',
        purpose: null,
        activity: null,
      }
    };
  },
  computed: {
    progress() {
      if (this.user.height && this.user.weight && this.user.sex && this.user.purpose && this.user.activity) {
        return 75;
      } else {
        return 50;
      }
    },
    images() {
      return [
        { path: require('../../../assets/img/ptgogo.png'), alt: 'Image 1', active: this.user.bmi >= 0 && this.user.bmi < 18.5 },
        { path: require('../../../assets/img/ptgogo.png'), alt: 'Image 2', active: this.user.bmi >= 18.5 && this.user.bmi < 23 },
        { path: require('../../../assets/img/qrchoon.png'), alt: 'Image 3', active: this.user.bmi >= 23 && this.user.bmi < 25 },
        { path: require('../../../assets/img/qrchoon.png'), alt: 'Image 4', active: this.user.bmi >= 25 },
      ];
    },
    getImagePath() {
      if (this.user.bmi >= 0 && this.user.bmi < 18.5) {
        return require('../../../assets/img/ptgogo.png');
      } else if (this.user.bmi >= 18.5 && this.user.bmi < 23) {
        // return require('@/assets/정상.png');
        return require('../../../assets/img/ptgogo.png');
      } else if (this.user.bmi >= 23 && this.user.bmi < 25) {
        // return require('@/assets/과체중.png');
        return require('../../../assets/img/qrchoon.png');
      } else if (this.user.bmi >= 25) {
        // return require('@/assets/비만.png');
        return require('../../../assets/img/qrchoon.png');
      } else {
        return require('../../../assets/img/춘식얼굴.png');
      }
    },
  },
  methods: {
    calculatebmi() {
      if (this.user.height && this.user.weight) {
        this.user.bmi = (this.user.weight / ((this.user.height / 100) ** 2)).toFixed(2);
        return this.user.bmi;
      } else {
        return '';
      }
    },
    setSex(sex) {
      this.user.sex = sex;
    },
    setPurpose(purpose) {
      this.user.purpose = purpose;
    },
    setActivity(activity) {
      this.user.activity = activity;
    },
    proceedToNextPage() {
      try {
        const isValid = 1;
        const data = {
          age: this.user.age,
          height: this.user.height,
          weight: this.user.weight,
          bmi: this.user.bmi,
          sex: this.user.sex,
          purpose: this.user.purpose,
          activity: this.user.activity,
        };
        if (isValid) {
          this.$emit("nextPage", data);
        } else {
          this.$swal("유효하지 않은 경로입니다.");
        }
      } catch (e) {
        console.log(e);
      }
    },
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
              <label for="user.sex">성별</label>
              <div class="btn-group" role="group">
                <button type="button" class="btn" :class="{ 'btn-male': user.sex === 'male' }" @click="setSex('male')">
                  <i class="material-icons">male</i>
                </button>
                <button type="button" class="btn" :class="{ 'btn-female': user.sex === 'female' }"
                  @click="setSex('female')">
                  <i class="material-icons">female</i>
                </button>
              </div>
            </li>
            <li>
              <label for="user.age">나이(만)</label>
              <input class="form-control" type="number" id="user.age" v-model="user.age">
            </li>
            <li>
              <label for="user.height">키(cm)</label>
              <input class="form-control" type="number" id="user.height" v-model="user.height">
            </li>
            <li>
              <label for="user.weight">몸무게(kg)</label>
              <input class="form-control" type="number" id="user.weight" v-model="user.weight">
            </li>
            <li>
              <label for="user.bmi"> BMI </label>
              <div>{{ calculatebmi() }}</div>
            </li>
            <div class="image-container">
              <div v-for="image in images" :key="image.path" :class="{ 'active-image': image.active }">
                <img :src="image.path" :alt="image.alt" class="image">
              </div>
            </div>
            <li>
              <label for="purpose">목적</label>
              <div class="purpose_list">
                <button class="btn btn-success" :class="{ 'selected-purpose': user.purpose === 0 }" id="diet"
                  @click="setPurpose(0)"> 다이어트 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': user.purpose === 1 }" id="keep"
                  @click="setPurpose(1)"> 체중유지 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': user.purpose === 2 }" id="bulk-up"
                  @click="setPurpose(2)"> 벌크업 </button>
                <button class="btn btn-success" :class="{ 'selected-purpose': user.purpose === 3 }" id="improve"
                  @click="setPurpose(3)"> 식습관 개선 </button>
              </div>
            </li>
            <li>
              <label for="activity">활동량</label>
              <div class="purpose_list">
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 0 }" id=""
                  @click="setActivity(0)"> 안 함</button>
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 1 }" id="no1"
                  @click="setActivity(1)"> 저강도 </button>
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 2 }" id="no2"
                  @click="setActivity(2)"> 중강도 </button>
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 2 }" id="no2"
                  @click="setActivity(3)"> 고강도 </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-success" @click="proceedToNextPage"
          :disabled="!user.age || !user.height || !user.weight || !user.sex || user.purpose === null || user.activity === null || !user.bmi">
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
  transition: background-color 0.2s ease;
}

li {
  list-style-type: none;
  position: relative;
  padding-left: 30px;
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
}

.selected-activity {
  background-color: black;
}
</style>