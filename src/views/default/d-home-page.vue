<style lang="scss" scoped>
#hero {
  height: 350px;
  background-image: url('../../../public/assets/img/background/어두운 배경.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //background-attachment: fixed; /* 스크롤을 내려도 이미지는 고정 */
  color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
  text-align: left;

  #hero-title {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1.5rem;
  }

  #hero-sub {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1rem;
    text-decoration: none;
  }
}

#upload-section {
  height: 750px;
}

.chart-section {
  display: flex;
  justify-content: space-around; // 간격을 넓힘
  flex-wrap: wrap;
  margin: 0;
  padding-top: 5px;
}

.chart {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 100%;
  max-width: 700px; // 차트 최대 너비 증가
  text-align: center;
}

.canvas-container {
  position: relative;
  height: 0;
  padding-top: 56.25%; // 16:9 비율 유지
  margin-bottom: 30px;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}


.goal-box {
  width: 200px;
  height: 110px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #000000;
  text-align: left;
  margin: 10px 10px 10px 10px;
  border: 1px solid #f0f2f1;
}

.goal-box:hover {
  background-color: rgba(166, 227, 215, 0.99);
  /* 원하는 hover 시 배경 색상 */
}

// 이미지 업로드 텍스트
.img-upload {
  padding: 0 0 0 50px;
  height: 300px;
  text-align: left;

  .up-btn {
    margin-top: 50px;
  }
}

#MultiImageUploader {
  margin-top: 70px;
  max-width: 600px;
}

// 비디오 또는 그래픽
#mobile-food-icon {
  display: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#web-food-icon .video::-webkit-media-controls {
  display: none !important;
}

.video::-webkit-media-controls-enclosure {
  display: none !important;
}

// 모바일 버튼 처음엔 숨기기
#mobile-btn-box {
  display: none;
  text-align: center;
  margin-top: 50px;
}

.mobile-btn {
  background-color: #00997b;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}


img {
  transition: 0.2s ease-out;
}

.drag-drop-container {
  width: 900px !important;
  height: 450px !important;
}

#changeWeight-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.flex-container {
  display: flex;
  align-items: center;
}

#changeWeight-container .form-group > input {
  margin-right: 10px;
}

.q-box {
  margin-top: 60px;
  width: 300px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 1px;
  padding: 20px;
  color: #000000;
  text-align: center;
  border: 1px solid #f0f2f1;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

#weightChart {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  width: 700px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 1px;
  border: 1px solid #f0f2f1;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  #hero {
    height: 300px;
    padding: 0 20px;

    // 글자크기 작게
    #hero-title {
      white-space: nowrap;
      margin: 1vw;
      font-size: 1.3rem;
    }

    #hero-sub {
      white-space: nowrap;
      margin: 3vw 1vw 1vw;
      font-size: 1rem;
      text-decoration: none;
    }
  }

  .goal-box {
    font-size: 13px;
    width: 140px;
    height: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    color: #000000;
    text-align: left;
    margin: 10px 10px 10px 10px;
    border: 1px solid #f0f2f1;
  }

  // 이미지 업로드 텍스트
  .img-upload {
    margin-top: 50px;
    padding: 0 0 0 10px;
    text-align: center;

    .up-btn {
      margin-top: 10px;
    }
  }

  // 모바일에선 슬롯머신 보여주고 그래픽 숨기기
  #mobile-food-icon {
    display: block;
  }

  #web-food-icon {
    display: none;
  }

  // 드래그앤 드롭 숨기기
  #MultiImageUploader {
    display: none;
  }

  // 대신 모바일 전용 버튼 보여주기
  #mobile-btn-box {
    display: block;
  }

  .chart {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 그림자 효과
    border-radius: 10px; // 둥근 모서리
    background: #fff; // 배경색
    padding: 20px;
    margin: 20px;
    width: 100%; // 너비 조정
    max-width: 450px; // 최대 너비 설정
    text-align: center;
  }

  #weightChart {
    display: none;
  }
}
</style>
<template>
  <main id="main">

    <!-- ======= Hero Section ======= -->
    <section id="hero" class="hero d-flex align-items-center section-bg">
      <div class="col-12" style="max-width: 1600px; margin: 0 auto;">
        <p data-aos="fade-in" data-aos-duration="1000" class="TheJamsil400" id="hero-title">간편하게 이용하는 식단관리
          솔루션,<br>Chat PT</p>
        <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" class="" id="hero-sub"
           style="color: #727070;">
          건강한 식단을 찾고 계신 당신에게
          <br>
          맞춤 식단 전문가가 되어 드립니다.
        </p>
      </div>
    </section>
    <!-- End Hero Section -->

    <!--  식단 업로드  -->
    <section style="background-color: white;">
      <div id="upload-section" class="section1800">
        <div class="row " style="margin-top: 100px; margin-bottom:200px; text-align: center;">

          <div class="col-lg-4 col-sm-6" style="height: 300px; text-align: left; " data-aos="fade-in"
               data-aos-duration="1000" data-aos-delay="200">
            <video id="mobile-food-icon" class="video" autoplay loop muted playsinline style="object-fit: contain;">
              <source src="../../assets/img/changeable_diet_minified.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div style="text-align: center; padding-left: 20px;">
              <!--              <img id="web-food-icon" src="../../assets/img/graphic/taco%201.png"-->
              <!--                   style="margin-left: 20px; object-fit: contain;">-->
              <DynamicImage id="web-food-icon"/>
              <!--              <img src="/assets/img/graphic/taco%201.png" style="max-height: 80%; object-fit: contain;">-->
            </div>
          </div>

          <div class="col-lg-8 col-sm-6 img-upload" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
            <h3 id="plz-up" class="TheJamsil400" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
            <p class="pine_Green_text" style=" white-space: nowrap">사진을 전부 등록 해주시면 저희가 분류해드릴게요.</p>
            <div id="MultiImageUploader">
              <MultiImageUploader/>
            </div>
            <div id="mobile-btn-box">
              <button class="mobile-btn" @click="triggerFileInput">파일 선택</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--  체중 기록  -->
    <section class="ivory" style="padding:0 2vw; height: 650px">
      <div id="" class="section1800" style="padding-top: 50px;">
        <p class="TheJamsil400" data-aos="fade-in" data-aos-duration="1000" data-aos-delay=""
           style="color: #787c79; font-size: 20px;">혹시 체중에 변화가 있으신가요?
        </p>
        <p class="mt-1 TheJamsil400" data-aos="fade-in" data-aos-duration="1000" data-aos-delay=""
           style="font-size: 30px; color: black;">오늘의 체중을 기록해주세요</p>
        <div id="changeWeight-container" style="margin: 100px;" data-aos="fade-in" data-aos-duration="2000"
             data-aos-delay="">
          <div class="flex-container">
            <div id="weightChart" class="mt-5">
              <canvas id="myWeight"></canvas>
            </div>
            <div class="q-box"
                 style=""
                 data-aos="fade-in" data-aos-duration="100" data-aos-delay="">
              <img src="../../../public/assets/img/graphic/icon2.png" alt="" style="width: 100px;">
              <form @submit.prevent="changeWeight" class="mt-3">
                <div class="form-group flex-container" style="justify-content: center;">
                  <input v-model="changeWeightInfo.weight" type="text" class="form-control" id="weight"
                         style="width: 120px; text-align: right">
                  <span>KG</span>
                </div>
                <div class="mt-5" style="text-align: center;">
                  <button type="submit" class="mb-2 btn-signature login-btn">기록하기</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <p id="bad-result" class="mt-5" style="color:#1e6b7b;" v-html="changeWeightInfo.goodResult"></p>
          <p id="bad-result" class="mt-5" style="color:darkred;" v-html="changeWeightInfo.badResult"></p>
        </div>
      </div>
    </section>

    <!--  연속 업로드  -->
    <section class="green" style="padding:0 2vw;">
      <div class="section1800" style="height: 300px; padding-top: 50px;">
        <p class="TheJamsil400" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
           style="color: #FFFFFF; margin-top: 20px; font-size: 30px;">연속
          <span class="TheJamsil400" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500"
                style="color: #FFFFFF; margin-top: 20px; font-size: 50px;">{{ Consecutive_Dates }}</span>
          일째
        </p>
        <p class="TheJamsil400" data-aos="fade-in" data-aos-duration="2000" data-aos-delay=""
           style="margin-top: 10px; font-size: 20px; color: #00997b;">업로드 중입니다 😊</p>
      </div>
    </section>

    <!--  식단 분석  -->
    <section class="lime-green" style="min-height: 100%; height: 100; padding: 30px;">
      <div class="section1800">
        <div class="row" style="margin-top: 50px; text-align: center; display: flex;">

          <div style="margin-bottom: 100px;" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
            <span class="material-icons pine_Green_text">bar_chart</span>
            <span id="" class="pine_Green_text TheJamsil400" style="white-space: nowrap; font-size: 1.7rem;">나만의 식습관 맞춤
              리포트</span>
          </div>
          <div class="chart-section" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
            <div class="chart">
              <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 칼로리</p>
              <div class="canvas-container">
                <canvas ref="myPieChart"></canvas>
              </div>
              <p class="TheJamsil400">칼로리 : {{ currentCal }} / {{
                  recommandCal
                }} (kcal)</p>
            </div>

            <div class="chart">
              <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 영양소</p>
              <div class="canvas-container">
                <canvas ref="myBarChart"></canvas>
              </div>
              <p class="TheJamsil400">탄수화물 : {{ currenttan }} / {{
                  recommand_tan
                }} (g)</p>
              <p class="TheJamsil400">단백질 : {{ currentdan }} / {{
                  recommand_dan
                }} (g)</p>
              <p class="TheJamsil400">지방 : {{ currentgi }} / {{
                  recommand_gi
                }}
                (g)</p>
            </div>
          </div>
        </div><!-- 사진 등록 -->
      </div>
    </section>

  </main><!-- End #main -->
</template>
<script>
import MultiImageUploader from '@/components/util/img-upload.vue';
import DynamicImage from '@/components/util/dynamic-image.vue';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);
export default {
  components: {
    MultiImageUploader,
    DynamicImage,
  },

  data() {
    return {
      changeWeightInfo: {
        myWeightChart: '',
        weight: '',
        goodResult: '',
        badResult: '',
      },

      // 기본적인 칼로리 및 영양성분 데이터들
      recommandCal: 0,
      recommand_tan: 0,
      recommand_dan: 0,
      recommand_gi: 0,
      
      currentCal: 0,
      currenttan: 0,
      currentdan: 0,
      currentgi: 0,
      // 칼로리 차트 데이터 
      chartData: {

        labels: ['현재 칼로리', '남은 칼로리'],

        datasets: [
          {
            data: [0, 0], // 초기 값으로 0을 설정
            backgroundColor: ['rgba(75, 192, 192, 0.5)', '#FFFFFF'],
            borderColor: 'rgba(75, 192, 192, 0.5)', // 파란색 계열 테두리
            borderWidth: 1,
          },
        ],
      },
      // 영양소 차트 데이터
      nutrientData: {
        labels: ['탄수화물', '단백질', '지방'],
        datasets: [
          {
            label: '섭취한 영양소',
            data: [], // 실제 섭취량 데이터 (추후 업데이트)
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: '권장 영양소',
            data: [], // 권장 섭취량 데이터
            backgroundColor: 'rgba(0, 0, 0, 0)', // 투명한 배경색
            borderColor: 'rgba(75, 192, 192,0.8 )', // 파란색 계열 테두리
            borderWidth: 1,

            fill: false, // 내부 채우기 없음
          }
        ]
      },
      showChart: true, // 차트를 보여줄지 여부를 조정하는 데이터 속성
    };
  },
  mounted() {
    if (this.showChart) {
      this.fetchData(); // 초기 데이터 로딩
      this.fetchDataAndCreateCharts();
    }
  },

  methods: {
    async fetchDataAndCreateCharts() {
      try{
      const res = await this.$axios.get('/getRecommandDailyTandangi')
      

        this.Consecutive_Dates = res.data.Consecutive_Dates.P_COUNT

        // 추천 데이터 등록         
        this.recommandCal = res.data.recommandTandnagi.p_recommand_cal.toFixed(2);
        this.recommand_tan = res.data.recommandTandnagi.p_recommand_tan.toFixed(2);
        this.recommand_dan = res.data.recommandTandnagi.p_recommand_dan.toFixed(2);
        this.recommand_gi = res.data.recommandTandnagi.p_recommand_gi.toFixed(2);

        if(res.data.totaldaily){
          this.currentCal = res.data.totaldaily.dailyTotalCal.toFixed(2);
          this.currenttan = res.data.totaldaily.dailyTotalTan.toFixed(2);
          this.currentdan = res.data.totaldaily.dailyTotalDan.toFixed(2);
          this.currentgi = res.data.totaldaily.dailyTotalGi.toFixed(2);
        }
        // 차트에 보여질 값 초기화
        


        if (!this.showChart) {
          return;
        }

        // 영양소 차트 데이터 업데이트
        this.updateNutritionChartData();
        // 칼로리 차트 데이터 업데이트
        this.updateCalChartData();

        this.createCharts();
        this.isLoading = false;
      }
          catch(error){

            console.error("에러 발생:", error);
          }
            
          


    },
    updateCalChartData() {
      // 남은 칼로리 계산
      let remainingCal = this.recommandCal - this.currentCal;

      // 차트에 표시할 데이터
      let chartData = [this.currentCal, Math.abs(remainingCal)];

      // 차트 색상 설정
      let chartColors = remainingCal < 0 ? ['rgba(75, 192, 192, 0.5)', 'rgba(75, 192, 192, 1.0)'] : ['rgba(75, 192, 192, 0.5)', '#FFFFFF'];
      // 차트에 표시할 데이터와 라벨
      let chartLabels = remainingCal < 0 ? ['현재 칼로리', '초과 칼로리'] : ['현재 칼로리', '남은 칼로리'];

      // 데이터셋 업데이트
      this.chartData.datasets[0].data = chartData;
      this.chartData.datasets[0].backgroundColor = chartColors;

      // 라벨 업데이트
      this.chartData.labels = chartLabels;
      // 차트 다시 그리기
      this.createCharts();

    },
    updateNutritionChartData() {
      this.nutrientData.datasets[0].data = [this.currenttan, this.currentdan, this.currentgi]; // 실제 섭취한 영양소
      this.nutrientData.datasets[1].data = [this.recommand_tan, this.recommand_dan, this.recommand_gi]; // 권장 영양소
    },
    createCharts() {

      // 데이터가 준비된 후에 차트를 생성합니다.
      this.$nextTick(() => {
        if (this.myChart) this.myChart.destroy(); // 기존 차트가 있다면 파괴
        if (this.myNutrientChart) this.myNutrientChart.destroy(); // 기존 영양소 차트가 있다면 파괴
        this.createCalChart();
        this.createNutrientChart();
      });
    },
    createCalChart() {
      this.$nextTick(() => {
        if (this.myChart) {
          this.myChart.destroy(); // 이미 생성된 Chart를 파괴
        }
        const ctxCal = this.$refs.myPieChart.getContext('2d');
        this.myChart = new Chart(ctxCal, {
          type: 'pie',
          data: this.chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
    },
    createNutrientChart() {
      this.$nextTick(() => {
        const ctxNutrient = this.$refs.myBarChart.getContext('2d');
        if (this.myNutrientChart) this.myNutrientChart.destroy();
        this.myNutrientChart = new Chart(ctxNutrient, {
          type: 'bar',
          data: this.nutrientData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
              x: {
                stacked: true, // x축도 쌓아서 표시합니다.
              }
            }
          }
        });
      });
    },
    changeWeight() {
      if (this.changeWeightInfo.weight === '') {
        this.changeWeightInfo.goodResult = '';
        this.changeWeightInfo.badResult = '체중을 입력해주세요.';
        return;
      } else if (isNaN(this.changeWeightInfo.weight)) {
        this.changeWeightInfo.goodResult = '';
        this.changeWeightInfo.badResult = '숫자만 입력해주세요.';
        return;
      } else if (this.changeWeightInfo.weight < 0) {
        this.changeWeightInfo.goodResult = '';
        this.changeWeightInfo.badResult = '0보다 큰 수를 입력해주세요.';
        return;
      }

      this.$axios.post('/changeWeight', {weight: this.changeWeightInfo.weight})
          .then(() => {
            this.changeWeightInfo.goodResult = '성공적으로 반영되었습니다.';
            this.changeWeightInfo.badResult = '';
            this.fetchData();
          }).catch(() => {
        this.changeWeightInfo.badResult = '잠시 후 다시 시도해주세요..'
      })
    },
    // 몸무게 차트 그리기
    fetchData() {

      // 시작날짜는 오늘에서 -6일
      let startPeriod = new Date();
      startPeriod.setDate(startPeriod.getDate() - 6);

      // 마지막날짜는 오늘
      let endPeriod = new Date();

      // 날짜를 yyyy-mm-dd 형식의 문자열로 변환
      startPeriod = `${startPeriod.getFullYear()}-${startPeriod.getMonth() + 1}-${startPeriod.getDate()}`;
      endPeriod = `${endPeriod.getFullYear()}-${endPeriod.getMonth() + 1}-${endPeriod.getDate()}`;


      this.$axios.get('/diet_weight_analysis', {
        params: {
          startPeriod: startPeriod,
          endPeriod: endPeriod
        }
      })
          .then((res) => {
            this.setupChart(res.data);
          })
    },
    // 몸무게 차트 그리기
    setupChart(res) {
      let data = res

      // 기존 차트 인스턴스가 존재하면 파괴
      if (this.changeWeightInfo.myWeightChart) {
        this.changeWeightInfo.myWeightChart.destroy();
        this.changeWeightInfo.myWeightChart = null;
      }

      let ctx = document.getElementById('myWeight').getContext('2d');

      let today = new Date();
      let labels = Array.from({length: 7}, (_, i) => {
        let date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
      });

      let dataset = [];
      let prevData = null;
      labels.forEach(label => {
        let index = data.weightList.findIndex(item => {
          let date = new Date(item.dietLogDate);
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let day = date.getDate().toString().padStart(2, '0');
          return `${month}-${day}` === label;
        });

        if (index !== -1) {
          prevData = data.weightList[index].dietLogKg;
        }
        dataset.push(prevData);
      });

      let goals = Array(labels.length).fill(data.targetWeight.target_Weight); // 목표 체중

      let lastWeight  = dataset[dataset.length - 1] // 오늘 체중

      let minY = lastWeight - 10;
      let maxY = lastWeight + 10;

      if (lastWeight == null) {
        minY = goals - 10;
        maxY = goals + 10;
      }

      this.changeWeightInfo.myWeightChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: '기록한 체중',
            data: dataset,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            spanGaps: true
          },
            {
              label: '목표 체중',
              data: goals,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            }]
        },
        options: {
          scales: {
            y: {
              min: minY,
              max: maxY,
            }
          }
        }
      });
    },
  },

  beforeUnmount() {
    // 페이지 이동 시에 showChart 값을 false로 설정하여 차트를 숨기도록 할 수 있습니다.
    this.showChart = false;
  },


};
</script>