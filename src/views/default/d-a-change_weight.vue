<template>
  <main id="main" class="">
    <analyze_header />
    <div class="container">
      <!-- 몸무게 제목 -->
      <div class="weight-title">
        <h2><span class="badge badge_col">몸무게</span><span style="justify-content: center;"><button class="btn"
              @click="tablechange"><span class="material-icons ">sync</span></button></span></h2>
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
            <canvas id="myChart"></canvas>
          </div>
          <img v-else-if="dataLoaded && !hasData" src="../../assets/img/nonochun.png" alt="No data">
          <p v-else>데이터 로딩 중...</p>
        </div>
        <!-- 사이드바 -->
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
      target: 0,
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
      this.dataLoaded = false;
      this.isClickable = false; // 클릭 비활성화
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 오늘 날짜만 비교하기 위해 시간을 제거합니다.

      this.$axios.get('/diet_weight_analysis', {
        params: {
          startPeriod: this.startOfWeek,
          endPeriod: this.endOfWeek
        }
      })
        .then((res) => {
          this.target = res.data.targetWeight.target_Weight;
          console.log(res.data.weightList)
          if (res.data.weightList.length === 0) {
            alert('선택한 기간에 대한 데이터가 없습니다.');
            this.dataLoaded = true;
            this.hasData = false;
            return;
          }

          const allDates = this.getAllDates(this.startOfWeek, this.endOfWeek); // 모든 날짜 가져오기
          let dailyWeight = [];

          allDates.forEach(date => {
            const currentDate = new Date(date);

            if (currentDate.setHours(0, 0, 0, 0) > today) {
              // 현재 날짜보다 미래인 경우 데이터를 찍지 않습니다.
              dailyWeight.push(null);
            } else {
              // 서버 데이터에서 해당 날짜에 대한 데이터를 찾습니다.
              const dataForDate = res.data.weightList.find(item => {
                const itemDate = item.dietLogDate.split(' ')[0]; // 'YYYY-MM-DD' 형식으로 변환
                return itemDate === date;
              });


              dailyWeight.push(dataForDate ? dataForDate.dietLogKg : this.target);
            }
          });
          console.log("dailyWeight",dailyWeight)
          this.hasData = dailyWeight.length > 0;
          
          this.setupChart(allDates, dailyWeight);
          this.dataLoaded = true;
    

          setTimeout(() => this.isClickable = true, 1500);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert('데이터 로딩 중 오류가 발생했습니다. 오류 로그를 확인하세요.');
          this.dataLoaded = true;
          this.hasData = false;
        });
    },


    // 위에 거대한 차트를 만드는 함수
    setupChart(allDates, dailyWeight) {
  // 차트를 그리기 위한 캔버스 컨텍스트를 가져옵니다.
  const ctx = document.getElementById('myChart').getContext('2d');
  if (!ctx) {
    console.error("차트 컨텍스트를 찾을 수 없습니다.");
    return;
  }

  // 이전에 생성된 차트가 있다면 제거합니다.
  if (this.chart) {
    this.chart.destroy();
  }

  // 목표 몸무게 데이터를 전체 날짜 배열 길이만큼 생성합니다.
  const constantData = Array(allDates.length).fill(this.target);

  // 차트를 생성합니다.
  this.chart = new Chart(ctx, {
    type: 'line', // 차트 타입
    data: {
      labels: allDates, // X축 라벨
      datasets: [{
        label: '등록 몸무게',
        data: dailyWeight, // 등록 몸무게 데이터
        borderColor: '#008136', // 선 색상
        borderWidth: 1,
        fill: false
      }, {
        label: '목표 몸무게',
        data: constantData, // 목표 몸무게 데이터
        borderColor: '#FF5733', // 선 색상
        borderWidth: 1,
        fill: false,
        pointRadius: 0 // 점 표시 안 함
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true // Y축을 0부터 시작
        }
      },
      plugins: {
        legend: {
          display: true, // 범례 표시
          position: 'top' // 범례 위치
        },
        tooltip: {
          enabled: true, // 툴팁 활성화
          mode: 'index',
          intersect: false
        }
      },
      elements: {
        line: {
          tension: 0.4 // 선의 곡률
        }
      },
      responsive: true, // 반응형 차트 설정
      maintainAspectRatio: false // 종횡비 유지 안 함
    }
  });
},


    tablechange() {
      this.$router.push('/default/d_a_change_calory');
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
  },



  mounted() {
    this.printWeeks(new Date(), 10); // 주 데이터 생성
    let today = new Date();
    let currentWeek = this.multiWeeks.find(week => {
      let start = new Date(week.startOfWeek);
      let end = new Date(week.endOfWeek);
      return start <= today && end >= today;
    });

    // 현재 주를 selectWeek에 설정
    this.selectWeek = currentWeek || this.multiWeeks[0];
    this.startOfWeek = this.selectWeek.startOfWeek;
    this.endOfWeek = this.selectWeek.endOfWeek;

    // 초기 데이터 가져오기

    this.fetchData(); // 초기 데이터 로딩
  }
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
  width: 250px;
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

