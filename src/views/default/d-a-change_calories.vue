<template>
  <main id="main" class="">
    <analyze_header />
    <div class="container">
      <!-- 몸무게 제목 -->
      <div class="weight-title">
        <h2><span class="badge badge_col">칼로리</span><span style="justify-content: center;"><button class="btn"
              @click="tablechange"><span class="material-icons ">sync</span>{{ buttonpurpose }}</button></span></h2>
      </div>
      <div class="main_div">
        <!-- 사이드바 -->
        <div class="sidebar">
          <!-- 사이드바 내용 -->
          <p class="TheJamsil400" style="font-size: 30px; margin-top: 20px;">기간 설정</p>
          <p style="margin-top: -20px;font-size: 10px;">10주 전까지 알려드려요</p>
          <div class="periods">
            <div class="period" v-for="(item, idx) in multiWeeks" :key="idx"
              :class="{ 'selected-week': selectWeek.startOfWeek === item.startOfWeek }"
              @click="isClickable ? selectWeekMethod(item) : null">
              <p>{{ item.startOfWeek }} ~ {{ item.endOfWeek }}</p>
            </div>
          </div>
        </div>

        <!-- 메인 컨텐츠 -->
        <div class="main">
          <div v-if="dataLoaded && hasData" class="chart">
            <canvas ref="myChart"></canvas>
          </div>
          <img v-else-if="dataLoaded && !hasData" src="../../assets/img/nonochun.png" alt="No data">
          <p v-else>데이터 로딩 중...</p>
        </div>
        <!-- 사이드바 -->
      </div>
      <!-- 칼로리 변화표 컨텐츠 -->

      <div class="comment-container" v-if="hasData">
        <h2 class="TheJamsil400" v-html="comment"></h2>
      </div>


      <div class="trend_container">
        <!-- 칼로리 변화표 내용 -->
        <p style="font-size: 25px; margin-top: 15px;">전일 대비 칼로리 변화표 </p>
        <p style="font-size: 15px; margin-bottom: 10px;">({{ formatDate(new Date()) }} 기준)</p>
        <!-- 오늘 등록한 음식이 있을 경우-->
        <table class="table rounded">
          <thead class="TheJamsil400">
            <tr>
              <th>끼니</th>
              <th>오늘 먹은 음식</th>
              <th>칼로리</th>
              <th>전일 대비</th>
              <th>증감률</th>
            </tr>
          </thead>
          <tbody class="TheJamsil400" v-for="(item, idx) in last_differ" :key="idx">
            <tr>
              <td>{{ item.category }}</td>
              <td style="width: 350px;">{{ item.food_names ? item.food_names : '-' }}</td>
              <td>{{ item.total_calories_today ? item.total_calories_today.toFixed(2) + 'kcal' : '-' }} </td>
              <td :class="{
                positive: item.calorie_difference > 0 && item.food_names,
                negative: item.calorie_difference < 0 && item.food_names
              }">
                <i v-if="item.calorie_difference > 0 && item.food_names" class="arrow-up">▲</i>
                <i v-else-if="item.calorie_difference < 0 && item.food_names" class="arrow-down">▼</i>
                {{ item.food_names ? (item.calorie_difference ? item.calorie_difference.toFixed(2) + ' kcal' : '-') :
                  '-'
                }}
              </td>
              <td>
                <canvas ref="updownChartCanvas" :data-idx="idx" class="smallchart"></canvas>
                <p :class="{
                  positive: item.calorie_difference > 0 && item.food_names,
                  negative: item.calorie_difference < 0 && item.food_names
                }" v-if="item.calorie_difference > 0 && item.food_names">
                  <i v-if="item.calorie_difference > 0 && item.food_names" class="arrow-up">▲</i>
                  <i v-else-if="item.calorie_difference < 0 && item.food_names" class="arrow-down">▼</i>
                  {{ ((item.todayCalories / item.yesterdayCalories) * 100).toFixed(2) }}%

                </p>
                <p :class="{
                  positive: item.calorie_difference > 0 && item.food_names,
                  negative: item.calorie_difference < 0 && item.food_names
                }" v-if="item.calorie_difference < 0 && item.food_names">
                  <i v-if="item.calorie_difference > 0 && item.food_names" class="arrow-up">▲</i>
                  <i v-else-if="item.calorie_difference < 0 && item.food_names" class="arrow-down">▼</i>
                  {{ (-(100 - (item.todayCalories / item.yesterdayCalories) * 100)).toFixed(2) }}%

                </p>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </main>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import analyze_header from '@/components/header/d-analyze.vue';
Chart.register(...registerables);
export default {
  data() {
    return {
      chart: null,
      // 주의 일요일 날짜를 구하는 곳
      startOfWeeks: [],
      // 주의 토요일 날짜를 구하는 곳
      endOfWeeks: [],
      // 두개 합친 곳
      multiWeeks: [],
      // 현재 선택된 기간 
      selectWeek: '',
      // 선택된 주의 시작 날짜
      startOfWeek: '',
      // 선택된 주의 끝 날짜
      endOfWeek: '',
      //권장 칼로리 양
      recommandCal: 0,
      dataLoaded: true,
      hasData: false,
      isClickable: true,
      last_differ: [],
      dietList: [],
      comment: '',
      charts: [],
      averageCal: 0,

      showChart: true, // 차트를 보여줄지 여부를 조정하는 데이터 속성
    }
  },
  components: {
    analyze_header,
  },
  methods: {
    printWeeks(startDate, numWeeks) {
      let currentDate = new Date(startDate);

      for (let i = 0; i < numWeeks; i++) {
        let startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        // 날짜를 YYYY-MM-DD 형식으로 포매팅
        let formattedStart = this.formatDate(startOfWeek);
        let formattedEnd = this.formatDate(endOfWeek);

        // 포매팅된 결과를 컴포넌트의 데이터 속성에 저장
        this.startOfWeeks.push(formattedStart);
        this.endOfWeeks.push(formattedEnd);
        this.multiWeeks.push({ startOfWeek: formattedStart, endOfWeek: formattedEnd });

        currentDate.setDate(currentDate.getDate() - 7);
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
    selectWeekMethod(item) {
      if (!this.dataLoaded) {
        alert("차트 로딩 중입니다. 잠시만 기다려 주세요 ");
        return;
      }
      if (this.selectWeek.startOfWeek !== item.startOfWeek) {
        this.isClickable = false;  // 클릭을 잠시 막음
        setTimeout(() => this.isClickable = true, 1500);  // 3초 후에 다시 클릭 가능하도록 설정

        this.selectWeek = item; // 새로 선택된 주를 업데이트
        this.startOfWeek = item.startOfWeek;
        this.endOfWeek = item.endOfWeek;
        this.fetchData(); // 새로운 데이터를 가져옴
      }
    },

    fetchData() {
      this.dataLoded = false;
      this.isClickable = false; // 클릭 비활성화
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘 날짜만 비교하기 위해 시간을 제거합니다.

      this.$axios.get('/diet_cal_analysis', {
        params: {
          startPeriod: this.startOfWeek,
          endPeriod: this.endOfWeek
        }
      })
        .then((res) => {
          if (!this.showChart) {
            return;
          }
          this.recommandCal = res.data.recommandCal
          this.dietList = res.data.dietList
          // 차트를 생성할 때 showChart 값이 false이면 생성하지 않도록 합니다.

          if (res.data.dietList.length === 0) {
            // 데이터 길이가 0이면 알림을 띄우고 함수를 종료합니다.
            this.$swal('', '선택한 기간에 대한 데이터가 없습니다.', 'warning');
            this.dataLoaded = true;
            this.hasData = false;
            return;
          }
          const allDates = this.getAllDates(this.startOfWeek, this.endOfWeek); // 모든 날짜 가져오기
          let dailyTotals = [];

          allDates.forEach(date => {
            const currentDate = new Date(date);

            if (currentDate.setHours(0, 0, 0, 0) > today) {
              // 현재 날짜보다 미래인 경우 데이터를 찍지 않습니다.
              dailyTotals.push(null);
            } else {
              // 서버 데이터에서 해당 날짜에 대한 데이터를 찾습니다.
              const dataForDate = res.data.dietList.find(item => {
                const itemDate = item.uploadDate.split(' ')[0]; // 'YYYY-MM-DD' 형식으로 변환
                return itemDate === date;
              });

              // 해당 날짜의 데이터가 있으면 해당 값을, 없으면 0을 사용합니다.
              dailyTotals.push(dataForDate ? dataForDate.dailyTotal : 0);
            }
          });
          this.checkAndLoadData();

          console.log(this.dietList)
          this.hasData = res.data.dietList.length > 0;
          this.$nextTick(() => {
            this.setupChart(allDates, dailyTotals);
            this.dataLoaded = true; // 데이터 로드 완료
            this.last_differ.forEach((item, idx) => {
              item.yesterdayCalories = item.total_calories_yesterday;
              item.todayCalories = item.total_calories_today;
              if (item.food_names) {
                this.updownChart(item, idx);
              }
            })
          });
          this.dataLoaded = true; // 데이터 로딩 완료
          setTimeout(() => {
            this.isClickable = true; // 지정된 시간 후 클릭 활성화
          }, 1500); // 1.5초 동안 클릭 비활성화
          this.last_differ = res.data.last_differ
          this.getComment();

        })

        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert('데이터 로딩 중 오류가 발생했습니다. 오류 로그를 확인하세요.');
          this.dataLoaded = true; // 데이터 로드 실패
          this.dietList = [];
          this.hasData = false;
        })

        .finally(() => {
          this.dataLoaded = true; // 데이터 로딩 완료
          setTimeout(() => {
            this.isClickable = true; // 지정된 시간 후 클릭 활성화
          }, 1500); // 1.5초 동안 클릭 비활성화



        });
    },


    // 위에 거대한 차트를 만드는 함수
    setupChart(allDates, dailyTotals) {
      if (!this.dataLoaded) return;
      const canvas = this.$refs.myChart;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (this.chart) {
        this.chart.destroy();
      }

      // recommandCal 값에 기반한 상수 그래프 데이터
      const constantData = Array(allDates.length).fill(this.recommandCal);

      let datasets = [];

      // 현재 날짜와 startOfWeek가 같고, dietList의 길이가 0일 때
      if (this.dietList.length === 0 && this.formatDate(new Date()) === this.startOfWeek) {
        // 오직 recommandCal 데이터만 차트에 추가
        datasets.push({
          label: '권장 칼로리',
          data: constantData,
          borderColor: '#FF5733',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,
        });
      } else {
        // 일반적인 경우에는 일일 총 칼로리와 권장 칼로리 모두 표시
        datasets = [
          {
            label: '일일 총 칼로리',
            data: dailyTotals,
            borderColor: '#008136',
            borderWidth: 1,
            fill: false,
          },
          {
            label: '권장 칼로리',
            data: constantData,
            borderColor: '#FF5733',
            borderWidth: 1,
            fill: false,
            pointRadius: 0,
          },
        ];
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: allDates,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false,
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },

    updownChart(item, idx) {
      const yesterdayCalories = item.yesterdayCalories;
      const todayCalories = item.todayCalories;

      if (yesterdayCalories != 0 && todayCalories != 0) {
        const canvasElements = this.$refs.updownChartCanvas;
        const canvas = canvasElements[idx];
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          if (this.charts[idx]) {
            this.charts[idx].destroy();
          }

          const rate = yesterdayCalories > todayCalories ?
            -(100 - ((todayCalories / yesterdayCalories) * 100)) :
            (todayCalories / yesterdayCalories) * 100;
          const data = {
            labels: [''],
            datasets: [
              {
                label: rate > 0 ? ['증가율'] : ['감소율'],
                data: [rate],
                backgroundColor: rate > 0 ? ['rgba(255, 99, 132, 0.2)'] : ['rgba(54, 162, 235, 0.2)'],
                borderColor: rate > 0 ? ['rgba(255, 99, 132, 1)'] : ['rgba(54, 162, 235, 1)'],
                borderWidth: 1,
                barThickness: 20, // Set the thickness of the bar
              },
            ],
          };

          this.charts[idx] = new Chart(ctx, {
            type: 'bar', // 'horizontalBar' 대신 'bar' 사용
            data: data,
            options: {
              indexAxis: 'y', // 이 설정을 추가하여 수평 막대 차트로 만듦
              scales: {
                x: { // X 축 설정 (수평 막대 차트에서는 값 축)
                  beginAtZero: true,
                  min: -300,
                  max: 300
                },
                y: { // Y 축 설정 (수평 막대 차트에서는 카테고리 축)
                  // Y축 설정 추가
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              },
            },
          });

        }
      }
    },

    tablechange() {
      this.$router.push('/default/d_a_change_weight');
    },


    getAllDates(startDate, endDate) {
      let dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= new Date(endDate)) {
        dates.push(this.formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    },

    checkAndLoadData() {
      if (this.dietList.length === 0) {
        // 이번 주 데이터가 없으면 지난 주 데이터 로딩
        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        this.selectWeek = this.multiWeeks.find(week => week.startOfWeek === this.formatDate(lastWeek));
        this.startOfWeek = this.selectWeek.startOfWeek;
        this.endOfWeek = this.selectWeek.endOfWeek;
        this.fetchData();
      }
    },
    getComment() {
      let weekly_total = 0.0;
      this.dietList.forEach((item) => {
        weekly_total += item.dailyTotal
      })
      console.log(weekly_total)

      this.averageCal = weekly_total / this.dietList.length
      console.log(this.averageCal)

      if (this.averageCal >= this.recommandCal * 1.1) {
        this.comment = '<img src = "../assets/img/graphic/경고.png" style ="width: 40px;height:40px;"> 일주일 평균 칼로리 섭취량이 <span style ="color : red;font-weight:bold">높습니다.</span> 식사량을 <span style="color:blue; font-weight:bold">줄이세요</span>'
      } else if (this.averageCal <= this.recommandCal * 0.9) {
        this.comment = '<img src = "../assets/img/graphic/경고.png" style ="width: 40px;height:40px;"> 일주일 평균 칼로리 섭취량이 <span style="color:blue;font-weight:bold">적습니다.</span> 식사량을 <span style ="color : red;font-weight:bold">늘리세요</span>'
      } else {
        this.comment = '👍일주일 평균 식사량이 적합합니다. 이 상태를 유지하세요👍'
      }

    }

  },





  mounted() {
    this.printWeeks(new Date(), 10);
    let today = new Date();
    let currentWeek = this.multiWeeks.find(week => {
      let start = new Date(week.startOfWeek);
      let end = new Date(week.endOfWeek);
      return start <= today && end >= today;
    });
    this.selectWeek = currentWeek || this.multiWeeks[0];
    this.startOfWeek = this.selectWeek.startOfWeek;
    this.endOfWeek = this.selectWeek.endOfWeek;
    if (this.showChart) {
      this.fetchData();
    }
  },
  beforeUnmount() {
    // 페이지 이동 시에 showChart 값을 false로 설정하여 차트를 숨깁니다.
    this.showChart = false;
  },
};
</script>


<style scoped>
/* 전체 컨테이너 스타일링 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.comment-container {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 20px;
  background: #ffffff;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 차트에 그림자 효과 추가 */
  justify-content: center;
  align-items: center;
}

.badge_col {
  background-color: #008136;
}

.main_div {
  width: 100%;
  display: flex;
  height: 550px;

}

/* 몸무게 제목 스타일링 */
.weight-title {
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}

/* 사이드바 스타일링 */
.sidebar {
  width: 20%;
  border: 2px solid #008136;
  /* 테두리 적용: 두께, 스타일, 색상 */
  color: #000000;
  text-align: center;
  border-radius: 10px;
  /* 모서리 둥글게 */
}

.period {
  margin-top: 20px;
  margin-bottom: 20px;

}

/* 메인 컨텐츠 스타일링 */
.main {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-left: 20px;
}

.main img {
  width: 100%;
  /* 컨테이너의 너비에 맞게 설정 */
  height: 100%;
  /* 컨테이너의 높이에 맞게 설정 */
  object-fit: contain;
  /* 이미지의 원래 비율을 유지하면서 컨테이너에 맞게 조정 */
  object-position: center;
  /* 이미지를 중앙에 위치시킴 */
}



/* 칼로리 변화표 스타일링 */
.trend_container {
  width: 100%;
  /* Adjusted to full width */
  background-color: #008136;
  color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  border-radius: 10px;
  height: auto;
}

.selected-week {
  border-radius: 10px;
  border: 2px solid #008136;
  margin: 10px;
  /* 예시 색상, 원하는 색상으로 변경하세요 */
}

.chart {
  background-color: #ffffff;
  /* 배경색을 흰색으로 변경 */
  color: #000000;
  /* 글자 색상을 검정색으로 변경 */
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 차트에 그림자 효과 추가 */
  height: 550px;
  /* 차트의 높이를 내용물에 맞춤 */
}

.table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 10px;
  /* 테두리를 둥글게 만듭니다. */
  vertical-align: middle;
  height: 80%;
  justify-content: center;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.positive {
  color: red;
}

.negative {
  color: blue;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #ddd;
}

.smallchart {
  width: 180px;
  /* 차트 너비 조절 */
  height: 50px;
  /* 차트 높이 조절 */
  display: block;
  /* 차트를 블록 요소로 설정 */
  margin: 0 auto;
  /* 가운데 정렬 */
}
</style>

