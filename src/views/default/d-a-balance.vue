<template>
  <main id="main" class="">
    <analyze_header />
    <div class="container">
      <div class="mt-4">
        <button type="button" class="btn badge_col">{{ formattedStartDate }} ~ {{ formattedEndDate }}</button>
        <button type="button" class="btn bold" @click="moveWeek(-1)">&lt;</button>
        <button type="button" class="btn bold" @click="moveWeek(1)">&gt;</button>
      </div>
      <div class="chart-container mt-5">
        <div class="chart">
          <canvas ref="canvasChart1"></canvas>
        </div>
        <div class="chart">
          <canvas ref="canvasChart2"></canvas>
        </div>
        <div class="chart">
          <canvas ref="canvasChart3"></canvas>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.btn-dark-gray {
  background-color: #343a40;
  /* 진한 회색 */
  color: white;
  /* 글씨 색상을 흰색으로 설정 */
  font-weight: bold;
  /* 글씨 굵게 */
}

.bold {
  font-weight: bold;
  /* 글씨를 굵게 */
  font-size: 1.2em;
  /* 폰트 크기를 조금 더 크게 */
  padding: 5px 10px;
  /* 버튼 내부 여백을 조절 */
  margin: 0 5px;
  /* 버튼 사이의 간격 */
}

.badge_col {
  background-color: #008136;
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
}

.chart-container {
  display: flex;
  justify-content: space-around;
}

.chart {
  width: 33%;
  /* 차트 컨테이너의 1/3 크기를 가지도록 설정 */
}
</style>



<script>
import { Chart, } from 'chart.js';
import analyze_header from '@/components/header/d-analyze.vue';
export default {
  components: {
    analyze_header,
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      // 권장 탄, 단, 지
      recommand_tan: 0,
      recommand_dan: 0,
      recommand_gi: 0,

      // 일주일 평균 탄, 단, 지
      weeklyAvg_tan: 0,
      weeklyAvg_dan: 0,
      weeklyAvg_gi: 0,

      // 탄, 단, 지 차트 정보
      chart_tan: [],
      chart_dan: [],
      chart_gi: [],
      charts: [],
    };
  },
  created() {
    this.setWeekRange();
  },
  methods: {
    setWeekRange() {
      let currentDate = new Date();
      let dayOfWeek = currentDate.getDay(); // 현재 날짜의 요일을 얻음 (일요일 = 0, 월요일 = 1, ..., 토요일 = 6)

      // 일요일까지 거슬러 올라감
      currentDate.setDate(currentDate.getDate() - dayOfWeek);

      this.startDate = new Date(currentDate); // 주의 시작 (일요일)
      this.endDate = new Date(currentDate);
      this.endDate.setDate(this.endDate.getDate() + 6); // 주의 끝 (토요일)
    },


    getCurrentWeekEndDate() {
      let currentDate = new Date();
      let dayOfWeek = currentDate.getDay();
      currentDate.setDate(currentDate.getDate() + (6 - dayOfWeek)); // 현재 주의 토요일로 설정
      return currentDate;
    },

    moveWeek(weeks) {
      let newStartDate = new Date(this.startDate.getTime());
      let newEndDate = new Date(this.endDate.getTime());

      newStartDate.setDate(newStartDate.getDate() + weeks * 7);
      newEndDate.setDate(newEndDate.getDate() + weeks * 7);

      let currentWeekEndDate = this.getCurrentWeekEndDate();

      // 새로운 종료 날짜가 현재 주의 종료 날짜를 초과하지 않도록 함
      if (newEndDate > currentWeekEndDate) {
        return;
      }

      this.startDate = newStartDate;
      this.endDate = newEndDate;
    },
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      // 한 자리 수 월과 일 앞에 0을 붙임
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return year + '-' + month + '-' + day;
    },


    fetchData() {
      this.$axios.get('/getRecommandTandangi', {
        params: {
          startPeriod: this.formatDate(this.startDate),
          endPeriod: this.formatDate(this.endDate)
        }
      })
        .then((res) => {
          // 권장 탄단지 불러오기
          this.recommand_tan = res.data.recommandTandnagi.p_recommand_tan
          this.recommand_dan = res.data.recommandTandnagi.p_recommand_dan
          this.recommand_gi = res.data.recommandTandnagi.p_recommand_gi

          this.weeklyAvg_tan = res.data.avgTanDanGi.weeklyAvg_tan
          this.weeklyAvg_dan = res.data.avgTanDanGi.weeklyAvg_dan
          this.weeklyAvg_gi = res.data.avgTanDanGi.weeklyAvg_gi

          this.chart_tan = {

            labels: ['일주일 평균 탄수 화물'],

            datasets: [
              {
                data: [this.weeklyAvg_tan, this.recommand_tan - this.weeklyAvg_tan],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', '#FFFFFF'],
                borderColor: 'rgba(75, 192, 192, 0.5)', // 파란색 계열 테두리
                borderWidth: 1,
              },


            ],
            options: {
              // ... 다른 옵션 설정
              plugins: {
                afterDraw: function (chart) {
                  var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx,
                    type = chart.config.type;

                  if (type === 'doughnut') {
                    var doughnutCenter = {
                      x: (width - chart.chartArea.left) / 2 + chart.chartArea.left,
                      y: (height - chart.chartArea.top) / 2 + chart.chartArea.top
                    };

                    var fontSize = Math.min(height, width) / 10; // 가운데 텍스트의 폰트 크기를 조절합니다.
                    ctx.save();
                    ctx.font = fontSize + 'px sans-serif';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#FF0000';

                    // 중앙에 들어갈 텍스트 설정
                    var text = '중앙 텍스트',
                      textX = doughnutCenter.x,
                      textY = doughnutCenter.y;

                    ctx.fillText(text, textX, textY);
                    ctx.restore();
                  }
                }
              }
            },
          }
            this.chart_dan = {

              labels: ['일주일 평균 단백질'],

              datasets: [
                {
                  data: [this.weeklyAvg_dan, this.recommand_dan - this.weeklyAvg_dan],
                  backgroundColor: ['rgba(75, 192, 192, 0.5)', '#FFFFFF'],
                  borderColor: 'rgba(75, 192, 192, 0.5)', // 파란색 계열 테두리
                  borderWidth: 1,
                },
              ],
            },
            this.chart_gi = {

              labels: ['일주일 평균 지방'],

              datasets: [
                {
                  data: [this.weeklyAvg_gi, this.recommand_gi - this.weeklyAvg_gi],
                  backgroundColor: ['rgba(75, 192, 192, 0.5)', '#FFFFFF'],
                  borderColor: 'rgba(75, 192, 192, 0.5)', // 파란색 계열 테두리
                  borderWidth: 1,
                },
              ],
            },
            this.createChart('canvasChart1', this.chart_tan);
            this.createChart('canvasChart2', this.chart_dan);
            this.createChart('canvasChart3', this.chart_gi);
            console.log('이제시작', this.weeklyAvg_tan);
          }).catch(error => {
            // Handle errors here
            console.error('Error fetching data:', error);
          });
    },

    // 차트 그리기
    createChart(ref, chartData) {
      const canvas = this.$refs[ref];
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const chart
          = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: chartData.labels,
              datasets: chartData.datasets
            },
            options: chartData.options || {}
          });
        // Store the chart instance for later use
        this.charts.push(chart);
      } else {
        console.error('Canvas element not found');
      }
    },
    beforeDestroy() {
      this.charts.forEach(chart => {
        chart.destroy();
      });
    },
    

  },
  computed: {
    formattedStartDate() {
      return this.formatDate(this.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
  },

  mounted() {
    this.fetchData();
  }
};
</script>
