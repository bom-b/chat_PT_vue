<script>
export default {
  data() {
    return {
      user: {
        birth: '',
        height: '',
        weight: '',
        bmi: '',
        gender: '',
        purpose: null,
        activity: null,
        target_weight: '',
      }
    };
  },
  computed: {
    progress() {
      if (this.user.height && this.user.weight && this.user.gender && this.user.purpose && this.user.activity && this.user.target_weight) {
        return 75;
      } else {
        return 50;
      }
    },
    images() {
      return [
        { path: require('../../../../public/assets/img/bmi/bmi1.png'), alt: 'Image 1', active: this.user.bmi >= 0 && this.user.bmi < 18.5 },
        { path: require('../../../../public/assets/img/bmi/bmi2.png'), alt: 'Image 2', active: this.user.bmi >= 18.5 && this.user.bmi < 23 },
        { path: require('../../../../public/assets/img/bmi/bmi3.png'), alt: 'Image 3', active: this.user.bmi >= 23 && this.user.bmi < 25 },
        { path: require('../../../../public/assets/img/bmi/bmi4.png'), alt: 'Image 4', active: this.user.bmi >= 25 },
      ];
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
    setgender(gender) {
      this.user.gender = gender;
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
          birth: this.user.birth,
          height: this.user.height,
          weight: this.user.weight,
          bmi: this.user.bmi,
          gender: this.user.gender,
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
      <div class="container mt-5 pt-2" style="margin-top: 100px;">
        <div id="title-box" >
          <h2 id="title">정확한 판단을 위해 정보를 입력해주세요.</h2>
        </div>
        <div class="input-container">
          <ul>
            <li>
              <label for="user.gender">성별</label>
              <div class="btn-group" role="group">
                <button type="button" class="btn" :class="{ 'btn-male': user.gender === 'male' }"
                  @click="setgender('male')">
                  <i class="material-icons">male</i>
                </button>
                <button type="button" class="btn" :class="{ 'btn-female': user.gender === 'female' }"
                  @click="setgender('female')">
                  <i class="material-icons">female</i>
                </button>
              </div>
            </li>
            <li>
              <label for="user.birth">생년월일</label>
              <input class="form-control" type="date" id="user.birth" v-model="user.birth">
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
              <label for="user.weight">목표 체중</label>
              <input class="form-control" type="number" id="user.target_weight" v-model="user.target_weight">
            </li>
            <li>
              <label for="user.bmi"> BMI </label>
              <div>{{ calculatebmi() }}</div>
            </li>


            <!-- 
            <div class="image-container">
              <div v-for="image in images" :key="image.path" :class="{ 'active-image': image.active }">
                <img :src="image.path" :alt="image.alt" class="image">
              </div>
            </div> -->
            <div class="carousel">
              <div v-for="image in images" :key="image.path" class="carousel__face">
                <img :src="image.path" :alt="image.alt" :class="{ 'active-image': image.active }">
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
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 3 }" id="no2"
                  @click="setActivity(3)"> 고강도 </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-success" @click="proceedToNextPage"
          :disabled="!user.birth || !user.height || !user.weight || !user.gender || !user.target_weight || user.purpose === null || user.activity === null || !user.bmi">
          다음
        </button>
      </div>
    </div>
  </main>
</template>


<style scoped>
/* .carousel {
  perspective: 10000px;
  transform-style: preserve-3d;
  animation: spin 10s infinite linear;
}

.carousel__face {
  position: absolute;
  width: 200px;
  height: 200px;
  line-height: 200px;
  color: white;
  text-align: center;
  font-size: 40px;
}

.carousel__face:nth-child(1) {
  transform: rotateY(0deg) translateZ(288px);
}

.carousel__face:nth-child(2) {
  transform: rotateY(60deg) translateZ(288px);
}

.carousel__face:nth-child(3) {
  transform: rotateY(120deg) translateZ(288px);
}

.carousel__face:nth-child(4) {
  transform: rotateY(180deg) translateZ(288px);
}


@keyframes spin {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(1turn);
  }
} */

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

.active-image {
  border: 2px solid red;
}

.image-container .image {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  max-height: 200px;
  max-width: 100%;
  height: auto;
}


.image {
  width: 100px;
  height: 200px;
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
  background-color: rgb(13, 73, 204);
}

.selected-activity {
  background-color: rgb(13, 73, 204);
}

#title-box {
  padding-top: 50px;
  padding-bottom: 100px;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0px;
    margin-right: 0px;
    width: 100vw;
  }

  .container {
    margin-left: 0px;
    margin-right: 0px;
    width: 95vw;
  }

  #title-box {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  #title {
    font-family: 'TheJamsil400', sans-serif;
    font-size: 18px;
  }

}
</style>