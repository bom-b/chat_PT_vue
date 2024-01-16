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
      </div>
      <div class="comment-container">
        <h2 :class="commentClass">{{ comment }}</h2>
      </div>

    </div>
  </main>
</template>

<style scoped>
.comment-container {
  padding: 20px;
  text-align: center;
}

.comment-tan {
  color: #ffa726; /* 탄수화물에 대한 코멘트 색상 */
}

.comment-dan {
  color: #66bb6a; /* 단백질에 대한 코멘트 색상 */
}

.comment-gi {
  color: #42a5f5; /* 지방에 대한 코멘트 색상 */
}

.comment-balanced {
  color: #9e9e9e; /* 균형 잡힌 코멘트 색상 */
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
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
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  margin-top: 15px;
  width: 50%;
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
      comment: '',
      chooseone: '',
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

      if (newEndDate > currentWeekEndDate) {
        return;
      }

      this.startDate = newStartDate;
      this.endDate = newEndDate;

      this.fetchData(); // 데이터를 가져온 후에 조건을 검사합니다

      if (this.weeklyAvg_tan === null || this.weeklyAvg_dan === null || this.weeklyAvg_gi === null) {
        this.$swal('', '해당 기간의 정보가 없습니다', 'warning');
        return;
      }
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


    async fetchData() {
      try {
        const res = await this.$axios.get('/getRecommandTandangi', {
          params: {
            startPeriod: this.formatDate(this.startDate),
            endPeriod: this.formatDate(this.endDate)
          }
        });

        // 서버 응답을 검사하여 데이터가 존재하는지 확인합니다.
        if (!res.data || !res.data.avgTanDanGi) {
          throw new Error("데이터가 없습니다.");
        }

        this.recommand_tan = res.data.recommandTandnagi.p_recommand_tan;
        this.recommand_dan = res.data.recommandTandnagi.p_recommand_dan;
        this.recommand_gi = res.data.recommandTandnagi.p_recommand_gi;

        this.weeklyAvg_tan = res.data.avgTanDanGi.weeklyAvg_tan;
        this.weeklyAvg_dan = res.data.avgTanDanGi.weeklyAvg_dan;
        this.weeklyAvg_gi = res.data.avgTanDanGi.weeklyAvg_gi;

        this.createChart();

        this.updateComment();
        // 이제 안전하게 weeklyAvg_tan, weeklyAvg_dan, weeklyAvg_gi에 접근할 수 있습니다.
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
        this.$swal('', '이 기간에 데이터가 없습니다.', 'warning');
      }

    },
    updateComment() {
      if (this.comment) {
        this.comment = ''
      }
      const tanRatio = this.weeklyAvg_tan / this.recommand_tan;
      const danRatio = this.weeklyAvg_dan / this.recommand_dan;
      const giRatio = this.weeklyAvg_gi / this.recommand_gi;

      // 가장 낮은 비율을 가진 영양소를 찾습니다.
      const minRatio = Math.min(tanRatio, danRatio, giRatio);
      if (this.weeklyAvg_tan > this.recommand_tan && this.weeklyAvg_dan > this.recommand_tan && this.weeklyAvg_gi > this.recommand_gi) {
        this.comment = "평소에 너무많은 영양소를 섭취하고 있어요, 먹는 양을 줄여보는 거는 어떠세요??"
        this.chooseone = 'foodcal'
      }
      else if (minRatio === danRatio) {
        this.comment = "단백질 섭취량이 상대적으로 적어요, 단백질 함량이 많은 음식을 추천해 줄게요";
        this.chooseone = 'food_dan';
      } else if (minRatio === giRatio) {
        this.comment = "지방 섭취량이 상대적으로 적어요, 지방 함량이 많은 음식을 추천해 줄게요";
        this.chooseone = 'food_gi';
      } else if (minRatio === tanRatio) {
        this.comment = "탄수화물 섭취량이 상대적으로 적어요, 탄수화물 함량이 많은 음식을 추천해 줄게요";
        this.chooseone = 'food_tan'
      } else {
        this.comment = "영양소 균형이 잘 맞춰져 있어요, 좋은 식습관을 유지하세요!";
      }
      this.fetchfoddData()
    },
    // 2024/01/15 진행중 !!! top 3 영양소 부족한거 뽑아냄!!
    fetchfoddData(){
      this.$axios.get('/food_top3', {
        params: {
          chooseone: this.chooseone,
        }
      })
        .then((res) => {
          console.log(this.chooseone)
          console.log(res.data)

        })

        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert('데이터 로딩 중 오류가 발생했습니다. 오류 로그를 확인하세요.');

        })
    },
    // 차트 그리기
    createChart() {
      const canvas = this.$refs['canvasChart1'];
      if (this.chart) {
        this.chart.destroy();
      }
      if (canvas) {
        const ctx = canvas.getContext('2d');
        this.chart
          = new Chart(ctx, {
            type: 'radar',
            data: {
              labels: ['탄수화물', '단백질', '지방'],
              datasets: [
                {
                  label: '권장 영양소',
                  data: [this.recommand_tan, this.recommand_dan, this.recommand_gi], // 이 값들은 첫 번째 데이터 세트의 각 항목에 해당하는 값입니다.
                  fill: true,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)', // 데이터 세트의 배경 색상
                  borderColor: 'rgb(255, 99, 132)', // 경계선 색상
                  pointBackgroundColor: 'rgb(255, 99, 132)', // 데이터 포인트의 배경 색상
                  pointBorderColor: '#fff', // 데이터 포인트의 경계선 색상
                  pointHoverBackgroundColor: '#fff', // 호버 시 데이터 포인트의 배경 색상
                  pointHoverBorderColor: 'rgb(255, 99, 132)' // 호버 시 데이터 포인트의 경계선 색상
                },
                {
                  label: '평균 섭취 영양소',
                  data: [this.weeklyAvg_tan, this.weeklyAvg_dan, this.weeklyAvg_gi], // 이 값들은 두 번째 데이터 세트의 각 항목에 해당하는 값입니다.
                  fill: true,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)', // 데이터 세트의 배경 색상
                  borderColor: 'rgb(54, 162, 235)', // 경계선 색상
                  pointBackgroundColor: 'rgb(54, 162, 235)', // 데이터 포인트의 배경 색상
                  pointBorderColor: '#fff', // 데이터 포인트의 경계선 색상
                  pointHoverBackgroundColor: '#fff', // 호버 시 데이터 포인트의 배경 색상
                  pointHoverBorderColor: 'rgb(54, 162, 235)' // 호버 시 데이터 포인트의 경계선 색상
                }
              ]
            },
            options: {
              scales: {
                r: {
                  pointLabels: {
                    font: {
                      size: 30 // Adjust the font size here
                    },
                  }
                }
              },
            },
            plugins: {
              tooltip: {
                titleFont: {
                  size: 30 // Adjust the font size for tooltip titles
                },
                bodyFont: {
                  size: 30 // Adjust the font size for tooltip body text
                }
              }
            },
          });
      } else {
        console.error('Canvas element not found');
      }
    },


  },
  computed: {
    formattedStartDate() {
      return this.formatDate(this.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
    commentClass() {
    if (this.comment.includes("탄수화물")) {
      return 'comment-tan';
    } else if (this.comment.includes("단백질")) {
      return 'comment-dan';
    } else if (this.comment.includes("지방")) {
      return 'comment-gi';
    } else {
      return 'comment-balanced';
    }
  },
  },

  mounted() {
    this.fetchData();
  }
};
</script>
