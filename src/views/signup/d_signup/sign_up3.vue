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
      },
      // 기본값
      // 33, 70, 103, 133, 163
      // 16.5, 51.5, 118, 148, 171.5
      arrowXpoint: 171.5,
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
  },
  mounted() {
    // 페이지 로딩 시 화살표와 텍스트를 업데이트
    this.updateArrowAndText();
  },
  methods: {
    formatBirthDate() {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}/${month}/${day}`;
      return this.user.birth = formattedDate;
    },
    calculatebmi() {
      if (this.user.height && this.user.weight) {
        this.user.bmi = (this.user.weight / ((this.user.height / 100) ** 2)).toFixed(2);
        let bmi = this.user.bmi;
        if (bmi < 15) {
          return "Error";
        } else if (bmi < 18.5) {
          this.arrowXpoint = 16.5;
          return bmi;
        } else if (bmi < 25) {
          this.arrowXpoint = 51.5;
          return bmi;
        } else if (bmi < 30) {
          this.arrowXpoint = 118;
          return bmi;
        } else if (bmi < 35) {
          this.arrowXpoint = 148;
          return bmi;
        } else if (bmi < 40) {
          this.arrowXpoint = 171.5;
          return bmi;
        } else if (bmi > 50) {
          this.arrowXpoint = 16.5;
          return "Error";
        }
      } else {
        return '';
      }
    },

    updateArrowAndText() {
      // 화살표와 텍스트를 업데이트
      const arrowLine = this.$refs.arrowLine;
      if (arrowLine) {
        arrowLine.setAttribute('transform', `rotate(${this.arrowXpoint} 140 140)`);
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
      this.formatBirthDate();
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
          target_weight: this.user.target_weight
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
        <div id="title-box">
          <h2 id="title">정확한 판단을 위해 정보를 입력해주세요.</h2>
        </div>
        <div class="input-container">
          <ul>
            <li>
              <label for="user.gender">성별</label>
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-gender btn-gender-male"
                  :class="{ 'btn-male': user.gender === 'male' }" @click="setgender('male')">
                  <i class="material-icons">male</i>
                </button>
                <button type="button" class="btn btn-gender btn-gender-female"
                  :class="{ 'btn-female': user.gender === 'female' }" @click="setgender('female')">
                  <i class="material-icons">female</i>
                </button>
              </div>
            </li>
            <li>
              <label for="user.birth">생년월일</label>
              <input class="form-control" type="date" id="user.birth" v-model="user.birth" >
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
            </li>


            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300px"
              height="163px" viewBox="0 0 300 163">
              <g transform="translate(18,18)" style="font-family:arial,helvetica,sans-serif;font-size: 12px;">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7"></polygon>
                  </marker>
                  <path id="curvetxt1" d="M-4 140 A140 140, 0, 0, 1, 284 140" style="fill: none;"></path>
                  <path id="curvetxt2" d="M33 43.6 A140 140, 0, 0, 1, 280 140" style="fill: #none;"></path>
                  <path id="curvetxt3" d="M95 3 A140 140, 0, 0, 1, 284 140" style="fill: #none;"></path>
                  <path id="curvetxt4" d="M235.4 33 A140 140, 0, 0, 1, 284 140" style="fill: #none;"></path>
                </defs>

                <path
                  d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z"
                  fill="#1E90FF"></path>
                <path d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z" fill="#008137"></path>
                <path d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z" fill="#ffe400"></path>
                <path d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z" fill="#d38888"></path>
                <path d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z" fill="#bc2020"></path>
                <path d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z" fill="#8a0101"></path>
                <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff"></path>
                <circle cx="140" cy="140" r="10" fill="#666"></circle>
                <g style="paint-order: stroke;stroke: #fff;stroke-width: 2px;">
                  <text x="25" y="111" transform="rotate(-57, 10, 83)">18.5</text>
                  <text x="97" y="29" transform="rotate(-18, 97, 29)">25</text>
                  <text x="157" y="20" transform="rotate(12, 157, 20)">30</text>
                  <text x="214" y="45" transform="rotate(42, 214, 45)">35</text>
                  <text x="252" y="95" transform="rotate(72, 252, 95)">40</text>
                </g>
                <g style="font-size: 14px;"><text>
                    <textPath xlink:href="#curvetxt1">저체중</textPath>
                  </text><text>
                    <textPath xlink:href="#curvetxt2">정상</textPath>
                  </text><text>
                    <textPath xlink:href="#curvetxt3">과체중</textPath>
                  </text><text>
                    <textPath xlink:href="#curvetxt4">비만</textPath>
                  </text></g>
                <!-- 여기서 to 앞 값 고치기 -->
                <line ref="arrowLine" x1="140" y1="140" x2="80" y2="140" stroke="#666" stroke-width="2"
                  marker-end="url(#arrowhead)">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" :from="'0 140 140'"
                    :to="arrowXpoint + ' 140 140'" dur="1s" fill="freeze" repeatCount="3"></animateTransform>
                </line>
                <text x="100" y="120" style="font-size: 30px;font-weight:bold;color:#000;">{{ calculatebmi() }}</text>
              </g>
            </svg>



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
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 0 }" id="week12"
                  @click="setActivity(0)"> 주 1~2일 운동 </button>
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 1 }" id="week34"
                  @click="setActivity(1)"> 주 3~4일 운동 </button>
                <button class="btn btn-success" :class="{ 'selected-activity': user.activity === 2 }" id="every"
                  @click="setActivity(2)"> 매일 운동 </button>
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
  border: 2px solid skyblue;
}

.btn-female {
  background-color: pink;
}

.btn-gender-male:hover {
  background-color: skyblue;
  border: 2px solid skyblue;
  transform: scale(1.1);
  transition: transform 0.3s;
}

.btn-gender-male {
  border: 2px solid skyblue;
}

.btn-gender-female {
  border: 2px solid pink;
}

.btn-gender-female:hover {
  background-color: pink;
  border: 2px solid pink;
  transform: scale(1.1);
  transition: transform 0.3s;
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
  background-color: rgb(255, 255, 255);
  color: #00997b;
}

.selected-activity {
  background-color: rgb(255, 255, 255);
  color: #00997b;
}

#title-box {
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
    padding-bottom: 50px;
  }

  #title {
    font-family: 'TheJamsil400', sans-serif;
    font-size: 18px;
  }

}
</style>
