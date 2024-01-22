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
        <div class="chart" v-if="hasData">
          <canvas ref="canvasChart1"></canvas>
        </div>
        <img v-else-if="!hasData" src="../../assets/img/nonochun.png" alt="No data">
      </div>
      <div class="comment-container" v-if="hasData">
        <h2 :class="commentClass" v-html="formattedComment"></h2>
      </div>
      <div class="comment-container2" v-else-if="!hasData">
        <h2>이 기간 데이터가 없습니다.</h2>
      </div>


      <div class="row" v-if="hasData">
        <div class="col-md-4">

          <div class="card">
            <span class="badge badge-gold">1등</span>
            <div class="food-image-wrapper">
              <img :src="`${this.$s3BaseURL}/food_main_images/${foodFirst.foodimg}`"
                class="card-img-top food-image" alt='1등이미지'>
            </div>
            <div class="card-body" style="text-align: center;">
              <h5 class="card-title foodname">{{ foodFirst.foodname }}</h5>
              <span class="weight">100g 기준</span>
              <ul class="list-unstyled">
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i> <span
                    class="card-text ctext"><span v-if="foodFirst.food_dan == 0">단백질 함량 : </span><span
                      v-else-if="foodFirst.food_tan == 0">탄수화물 함량 : </span><span v-else-if="foodFirst.food_gi == 0">지방 함량
                      :
                    </span> <span style="font-size: 1.1rem; font-weight: bold;">{{ (foodFirst.ratio * 100).toFixed(2) }}
                      g</span></span>
                </li>
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i><span>칼로리 : </span> {{
                  (foodFirst.foodcal * 100 / foodFirst.foodweight).toFixed(2) }}
                  kcal
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 두 번째 카드 -->
        <div class="col-md-4">
          <div class="card">
            <span class="badge badge-silver">2등</span>
            <div class="food-image-wrapper">
              <img :src="`${this.$s3BaseURL}/food_main_images/${foodSecond.foodimg}`"
                class="card-img-top food-image" alt='2등이미지'>
            </div>
            <div class="card-body" style="text-align: center;">
              <h5 class="card-title foodname">{{ foodSecond.foodname }}</h5>
              <span class="weight">100g 기준</span>
              <ul class="list-unstyled">
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i> <span
                    class="card-text ctext"><span v-if="foodSecond.food_dan == 0">단백질 함량 : </span><span
                      v-else-if="foodSecond.food_tan == 0">탄수화물 함량 : </span><span v-else-if="foodSecond.food_gi == 0">지방
                      함량 :
                    </span><span style="font-size: 1.1rem; font-weight: bold;"> {{ (foodSecond.ratio * 100).toFixed(2) }}
                      g</span></span>
                </li>
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i><span>칼로리 : </span> {{
                  (foodSecond.foodcal * 100 / foodSecond.foodweight).toFixed(2) }}
                  kcal
                </li>
              </ul>

            </div>
          </div>
        </div>

        <!-- 세 번째 카드 -->
        <div class="col-md-4">
          <div class="card">
            <span class="badge badge-bronze">3등</span>
            <div class="food-image-wrapper">
              <img :src="`${this.$s3BaseURL}/food_main_images/${foodThird.foodimg}`"
                class="card-img-top food-image" alt='3등이미지'>
            </div>
            <div class="card-body" style="text-align: center;">
              <h5 class="card-title foodname">{{ foodThird.foodname }}</h5>
              <span class="weight">100g 기준</span>
              <ul class="list-unstyled">
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i> <span
                    class="card-text ctext"><span v-if="foodThird.food_dan == 0">단백질 함량 : </span><span
                      v-else-if="foodThird.food_tan == 0">탄수화물 함량 : </span><span v-else-if="foodThird.food_gi == 0">지방 함량
                      :
                    </span> <span style="font-size: 1.1rem; font-weight: bold;">{{ (foodThird.ratio * 100).toFixed(2) }}
                      g</span></span>
                </li>
                <li class="my-list-item"><i class="fas fa-check-circle text-success"></i><span>칼로리 : </span> {{
                  (foodThird.foodcal * 100 / foodThird.foodweight).toFixed(2) }}
                  kcal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.comment-container {
  margin-top: 45px;
  margin-bottom: 45px;
  padding: 20px;
  background: #ffffff;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 차트에 그림자 효과 추가 */
  justify-content: center;
  align-items: center;
}

.comment-container2 {
  margin-top: 45px;
  padding: 20px;
  background: #ffffff;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 차트에 그림자 효과 추가 */
  justify-content: center;
  align-items: center;
}

.food-image-wrapper {
  overflow: hidden;
  width: 90%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.food-image {
  width: 100%; /* 또는 width: auto; 를 사용해도 됩니다. */
  height: 100%; /* 이미지 높이를 컨테이너 높이에 맞춥니다. */
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너에 맞춰 자릅니다. */
  object-position: center; /* 이미지가 컨테이너 중앙에 위치하도록 합니다. */
}


.my-list-item {
  padding: 10px 0;
  /* 상하 패딩 추가 */
  font-size: 16px;
  /* 폰트 크기 조정 */
}

.my-list-item i {
  width: 25px;
  /* 아이콘의 너비를 고정 */
  margin-right: 5px;
  /* 아이콘과 텍스트 사이의 오른쪽 마진 추가 */
}

.foodname {
  font-size: 1.6em;
  font-weight: bold;
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

.weight {
  font-size: 0.8rem;
  margin-bottom: 45px;
}

.badge {
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-top: 5px;

}

.ctext {
  margin-top: 15px;
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 차트에 그림자 효과 추가 */
  justify-content: center;
  align-items: center;
  height: 650px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
  margin-bottom: 45px;
}

.chart {
  margin-top: 15px;
  width: 50%;
  /* 차트 컨테이너의 1/3 크기를 가지도록 설정 */
}

.badge-gold {
  background-color: #ffd700;
  /* 금색 */
}

.badge-silver {
  background-color: #c0c0c0;
  /* 은색 */
}

.badge-bronze {
  background-color: #cd7f32;
  /* 동색 */
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
      hasData: false,
      // 추천 음식 1,2,3
      foodFirst: [],
      foodSecond: [],
      foodThird: [],
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

        this.hasData = true;
        this.$nextTick(() => {
          this.createChart();
        });
        this.updateComment();

      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);

        this.hasData = false;

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

      const highlightStartTag = '<span style = "color: #dd2c00; font-size: 2.0rem">';
      const highlightEndTag = '</span>';
      if (this.weeklyAvg_tan > this.recommand_tan && this.weeklyAvg_dan > this.recommand_tan && this.weeklyAvg_gi > this.recommand_gi) {
        this.comment = "평소에 너무많은 영양소를 섭취하고 있어요, 먹는 양을 줄여보는 거는 어떠세요??"
        this.chooseone = 'foodcal'
      }
      else if (minRatio === danRatio) {
        this.comment = ` ${highlightStartTag}단백질${highlightEndTag} 섭취량이 상대적으로 적어요, ${highlightStartTag}단백질${highlightEndTag} 함량이 많은 음식을 추천해드릴게요`;
        this.chooseone = 'food_dan';
      } else if (minRatio === giRatio) {
        this.comment = `${highlightStartTag}지방${highlightEndTag} 섭취량이 상대적으로 적어요, ${highlightStartTag}지방${highlightEndTag} 함량이 많은 음식을 추천해드릴게요`;
        this.chooseone = 'food_gi';
      } else if (minRatio === tanRatio) {
        this.comment = `${highlightStartTag}탄수화물${highlightEndTag} 섭취량이 상대적으로 적어요, ${highlightStartTag}탄수화물${highlightEndTag} 함량이 많은 음식을 추천해드릴게요`;
        this.chooseone = 'food_tan';
      } else {
        this.comment = "영양소 균형이 잘 맞춰져 있어요, 좋은 식습관을 유지하세요!";
      }

      this.fetchfoddData()
    },
    // 2024/01/15 진행중 !!! top 3 영양소 부족한거 뽑아냄!!
    fetchfoddData() {
      this.$axios.get('/food_top3', {
        params: {
          chooseone: this.chooseone,
        }
      })
        .then((res) => {
          this.foodFirst = res.data[0];
          this.foodSecond = res.data[1];
          this.foodThird = res.data[2];
          console.log(res.data[1])
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
                  backgroundColor: 'rgba(35, 164, 26, 0.2)', // 데이터 세트의 배경 색상
                  borderColor: 'rgb(35, 164, 26)', // 경계선 색상
                  pointBackgroundColor: 'rgb(35, 164, 26)', // 데이터 포인트의 배경 색상
                  pointBorderColor: '#fff', // 데이터 포인트의 경계선 색상
                  pointHoverBackgroundColor: '#fff', // 호버 시 데이터 포인트의 배경 색상
                  pointHoverBorderColor: 'rgb(35, 164, 26)' // 호버 시 데이터 포인트의 경계선 색상
                },
                {
                  label: '평균 섭취 영양소',
                  data: [this.weeklyAvg_tan, this.weeklyAvg_dan, this.weeklyAvg_gi], // 이 값들은 두 번째 데이터 세트의 각 항목에 해당하는 값입니다.
                  fill: true,
                  backgroundColor: 'rgba(220, 91, 229, 0.2)', // 데이터 세트의 배경 색상
                  borderColor: 'rgb(220, 91, 229)', // 경계선 색상
                  pointBackgroundColor: 'rgb(220, 91, 229)', // 데이터 포인트의 배경 색상
                  pointBorderColor: '#fff', // 데이터 포인트의 경계선 색상
                  pointHoverBackgroundColor: '#fff', // 호버 시 데이터 포인트의 배경 색상
                  pointHoverBorderColor: 'rgb(220, 91, 229)' // 호버 시 데이터 포인트의 경계선 색상
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
    formattedComment() {
      // comment 내용에 highlight 클래스를 추가하여 스타일을 적용합니다.
      return this.comment;
    },
    commentClass() {
      if (this.comment.includes('${highlightStartTag}')) {
        return 'highlight';
      } else {
        return 'comment';
      }
    },

  },


  mounted() {
    this.fetchData();
  }
};
</script>
