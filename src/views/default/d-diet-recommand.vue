<template>
  <div class="scroll-container">
    <!--  섹션1  -->
    <div class="scroll-area section1400"
      style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="row" style="margin-top: 50px; text-align: center; display: flex;" data-aos="fade-in"
        data-aos-duration="1000" data-aos-delay="200">

        <div style="margin-bottom: 50px;" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
          <span class="material-icons pine_Green_text">bar_chart</span>
          <span id="" class="pine_Green_text TheJamsil400" style="white-space: nowrap; font-size: 1.7rem;">나만의 맞춤 음식
            추천</span>
        </div>
        <div style="margin-bottom: 50px;">
          <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">추천 음식 리스트</p>
          <p>회원님의 선호 음식을 AI가 분석해 추천해 드려요</p>
          <div id="app">
            <div class="header section1400">
              <span class="title">마지막으로 등록한 음식</span>
              <div class="profile-image-wrapper">
                <img src="../../assets/img/don.jpeg" alt="프로필 이미지" class="profile-image">
              </div>
              <div class="subtitle">{{ lastfood }}</div>
            </div>
          </div>
          <!-- 상품 목록을 감싸는 컨테이너 -->
          <div class="product-container">
            <!-- 상품을 나타내는 div, 실제 데이터를 연결하기 위한 v-for 디렉티브는 제거 -->
            <div class="product-item" v-for="item in recommand_fooddata" :key="item.FOODNUM"
              @click="divclick(item.FOODNUM, item.FOODCAL, item.FOOD_TAN, item.FOOD_DAN, item.FOOD_GI)">
              <!-- 이미지를 넣을 자리 -->
              <img src="../../assets/img/don.jpeg" alt="프로필 이미지" class="profile-image">
              <!-- 음식 설명을 넣을 자리 -->
              <div class="product-details">
                <h3>{{ item.FOODNAME }}</h3>
                <p>칼로리 : {{ item.FOODCAL }}kcal</p>
                <p>기준 : {{ item.FOODWEIGHT }}(g)</p>
                <p>탄수화물 : {{ item.FOOD_TAN }}(g)</p>
                <p>단백질 : {{ item.FOOD_DAN }}(g)</p>
                <p>지방 : {{ item.FOOD_GI }}(g)</p>
              </div>
            </div>
          </div>

        </div>
        <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;" data-aos="fade-in"
          data-aos-duration="1000" data-aos-delay="200">
          <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 칼로리</p>
          <canvas ref="myPieChart" width="400" height="400"></canvas>
          <p class="TheJamsil400">칼로리 : {{ currentCal }}<span v-if="FOODCAL != 0">(+{{ FOODCAL }})</span> / {{
            recommandCal
          }} (kcal)</p>
        </div>

        <div class="col-lg-6 col-sm-6" style="height: 600px; text-align: center;" data-aos="fade-in"
          data-aos-duration="1000" data-aos-delay="300">
          <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 영양소</p>
          <canvas ref="myBarChart" width="400" height="400"></canvas>
          <p class="TheJamsil400">탄수화물 : {{ currenttan }}<span v-if="FOODTAN != 0">(+{{ FOODTAN }})</span> / {{
            recommand_tan }} (g)</p>
          <p class="TheJamsil400">단백질 : {{ currentdan }}<span v-if="FOODDAN != 0">(+{{ FOODDAN }})</span>/ {{
            recommand_dan
          }} (g)</p>
          <p class="TheJamsil400">지방 : {{ currentgi }}<span v-if="FOODGI != 0">(+{{ FOODGI }})</span> / {{ recommand_gi }}
            (g)</p>
        </div>
      </div>
    </div>
    <!--  섹션2  -->
    <div class="scroll-area section1400"
      style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
      <div class="row" style="margin-top: 50px; text-align: center; display: flex;">

        <div data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
          <span class="material-icons pine_Green_text">bar_chart</span>
          <span id="" class="pine_Green_text TheJamsil400" style="white-space: nowrap; font-size: 1.7rem;">{{ tablename
          }}</span>

          <div style="margin-bottom: 50px;">
            <p>{{ tablecoment }}</p>
            <span style="justify-content: center;"><button class="btn" @click="tablechange"><span
                  class="material-icons ">sync</span>{{ buttonpurpose }}</button></span>
            <div>
              <table class="table" style="width: 100%;">
                <thead>
                  <tr>
                    <th>등록 회원</th>
                    <th>음식 이미지</th>
                    <th>음식명</th>
                    <th>칼로리</th>
                    <th>탄수화물</th>
                    <th>단백질</th>
                    <th>지방</th>
                    <th>카테고리</th>
                    <th>등록 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in paginatedData" :key="item.idx">
                    <td>{{ maskName(item[0]) }}</td>
                    <td><img src="../../assets/img/don.jpeg" alt="프로필 이미지" class="profile-image"></td>
                    <td>{{ item[7] }}</td>
                    <td>{{ item[2].toFixed(2) }} kcal</td>
                    <td>{{ item[4].toFixed(2) }} g</td>
                    <td>{{ item[5].toFixed(2) }} g</td>
                    <td>{{ item[6].toFixed(2) }} g</td>
                    <td>{{ item[9] }}</td>
                    <td>{{ formattedDate(item[8]) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                  <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="changePage(page)">{{ page }}</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default {
  data() {
    return {
      // 기본적인 칼로리 및 영양성분 데이터들
      recommandCal: 0,
      recommand_tan: 0,
      recommand_dan: 0,
      recommand_gi: 0,

      now_cal: 0,
      now_tan: 0,
      now_dan: 0,
      now_gi: 0,

      currentCal: 0,
      currenttan: 0,
      currentdan: 0,
      currentgi: 0,

      lastfood: '',
      recommand_fooddata: [],

      FOODCAL: 0,
      FOODTAN: 0,
      FOODDAN: 0,
      FOODGI: 0,

      userage: 0,
      ageDecade: 0,
      userpurpose: '',

      age_food_info: [],
      purpose_food_info: [],

      // 페이징 처리 부분
      currentPage: 1,
      pageSize: 5, // 한 페이지에 표시할 아이템의 수

      // 테이블 변환 부분
      status: 0,
      tablename: '',
      tablecoment: '',
      tableinfo: [],
      buttonpurpose: '',


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

    };
  },
  mounted() {
    this.fetchDataAndCreateCharts();
  },

  methods: {
    fetchDataAndCreateCharts() {
      this.$axios.get('/food_recommand')
        .then((res) => {
          console.log(res)
          const { recommand_cal, now_cal, recomand_nutrition, now_nutrition, lastfood, 
            recomandfood, userage, age_food_info, purpose_food_info, userpurpose } = res.data;
          // 추천 데이터 등록         
          this.recommandCal = recommand_cal.toFixed(2);
          this.recommand_tan = recomand_nutrition[0].toFixed(2);
          this.recommand_dan = recomand_nutrition[1].toFixed(2);
          this.recommand_gi = recomand_nutrition[2].toFixed(2);

          //현제 데이터 베이스에 지정된 데이터 값 초기화
          this.now_cal = now_cal;
          this.now_tan = now_nutrition[0];
          this.now_dan = now_nutrition[1];
          this.now_gi = now_nutrition[2];
          
          // 차트에 보여질 값 초기화
          this.currentCal = now_cal.toFixed(2);
          this.currenttan = now_nutrition[0].toFixed(2);
          this.currentdan = now_nutrition[1].toFixed(2);
          this.currentgi = now_nutrition[2].toFixed(2);

          // 마지막에 먹은 음식
          this.lastfood = lastfood

          // 유저 나이 정보
          this.userage = userage
          console.log(this.userage)

          // 추천음식 목록
          this.recommand_fooddata = recomandfood

          // 연령대 구하기
          this.getageGroup(this.userage)
          if (userpurpose == 0) {
            this.userpurpose = "다이어트가"
          } else if (userpurpose == 1) {
            this.userpurpose = "체중유지가"
          } else if (userpurpose == 2) {
            this.userpurpose = "벌크업이"
          }




          // 연령대 별 최근 올린 음식 25개
          this.age_food_info = age_food_info
          // 목적 별 최근 올린 음식 25개
          this.purpose_food_info = purpose_food_info

          // 테이블 전환 초기 설정(연령대 별이 디폴트 값)
          this.tableinfo = age_food_info
          this.tablename = this.ageDecade + "대가 최근에 올린 음식"
          this.tablecoment = '회원님과 비슷한 연령대의 다른 회원들이 등록한 음식을 보여드려요'
          this.status = 0
          this.buttonpurpose = '목적이 비슷한 사람 보기'

          // 영양소 차트 데이터 업데이트
          this.updateNutritionChartData();
          // 칼로리 차트 데이터 업데이트
          this.updateCalChartData();
          // 차트 생성
          this.createCharts();


        })
        .catch(() => {
          // console.error("Error fetching data: ", err);
          // alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
        });
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
    getageGroup(age) {
      if (typeof age !== 'number' || age < 0) {
        return 'Invalid age';
      }

      const age_Decade = Math.floor(age / 10) * 10;
      this.ageDecade = age_Decade

    },
    updateNutritionChartData() {
      // API 응답에서 데이터를 받아와야 합니다.
      this.nutrientData.datasets[0].data = [this.currenttan, this.currentdan, this.currentgi]; // 실제 섭취한 영양소
      this.nutrientData.datasets[1].data = [this.recommand_tan, this.recommand_dan, this.recommand_gi]; // 권장 영양소
    },

    createCharts() {
      // 데이터가 준비된 후에 차트를 생성합니다.
      if (this.myChart) this.myChart.destroy(); // 기존 차트가 있다면 파괴
      if (this.myNutrientChart) this.myNutrientChart.destroy(); // 기존 영양소 차트가 있다면 파괴
      this.createCalChart();
      this.createNutrientChart();
    },
    createCalChart() {
      const ctxCal = this.$refs.myPieChart.getContext('2d');
      this.myChart = new Chart(ctxCal, {
        type: 'pie',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },

    createNutrientChart() {
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
    },

    divclick(FOODNUM, FOODCAL, FOOD_TAN, FOOD_DAN, FOOD_GI) {
      // 값 초기화
      this.currentCal = this.now_cal
      this.currenttan = this.now_tan
      this.currentdan = this.now_dan
      this.currentgi = this.now_gi

      this.FOODCAL = FOODCAL.toFixed(2)
      this.FOODTAN = FOOD_TAN.toFixed(2)
      this.FOODDAN = FOOD_DAN.toFixed(2)
      this.FOODGI = FOOD_GI.toFixed(2)


      // 임시 값 계산
      let newCal = parseFloat(this.currentCal) + parseFloat(FOODCAL);
      let newTan = parseFloat(this.currenttan) + parseFloat(FOOD_TAN);
      let newDan = parseFloat(this.currentdan) + parseFloat(FOOD_DAN);
      let newGi = parseFloat(this.currentgi) + parseFloat(FOOD_GI);

      // 소수점 둘째 자리까지 반올림
      this.currentCal = newCal.toFixed(2);
      this.currenttan = newTan.toFixed(2);
      this.currentdan = newDan.toFixed(2);
      this.currentgi = newGi.toFixed(2);



      // 차트 데이터 업데이트
      this.updateCalChartData();
      this.updateNutritionChartData();

      // 차트 다시 생성
      this.createCharts();

    },
    tablechange() {
      if (this.status == 0) {
        this.tableinfo = this.purpose_food_info
        this.tablename = this.userpurpose + " 목적인 사람들이 올린 음식"
        this.tablecoment = '목적이 회원님과 비슷한 사람들이 올린 음식을 보여드려요'
        this.status = 1
        this.buttonpurpose = '연령대가 비슷한 사람 보기'
      } else if (this.status == 1) {
        this.tableinfo = this.age_food_info
        this.tablename = this.ageDecade + "대가 최근에 올린 음식"
        this.tablecoment = '회원님과 비슷한 연령대의 다른 회원들이 등록한 음식을 보여드려요'
        this.status = 0
        this.buttonpurpose = '목적이 비슷한 사람 보기'
      }

    },
    changePage(page) {
      this.currentPage = page;
    },
    maskName(name) {
      // 이름이 비어있거나 한 글자인 경우 그대로 반환
      if (!name || name.length <= 1) {
        return name;
      }
      // 이름의 마지막 글자를 마스킹
      return name.substring(0, name.length - 1) + '*';
    },
    formattedDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
      const day = d.getDate().toString().padStart(2, '0');
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const seconds = d.getSeconds().toString().padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

  },
  computed: {
    pageCount() {
      return Math.ceil(this.tableinfo.length / this.pageSize);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableinfo.slice(start, end);
    },

  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
}

.profile-image-wrapper {
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  /* 프로필 이미지 크기 조정 */
  height: 100px;
  border: 2px solid blue;
  /* 테두리 색상은 이미지에 맞게 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: auto;
}

.subtitle {
  font-size: 1rem;
  color: #555;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 16px;
}

/* 개별 상품 아이템 스타일 */
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.product-details {
  padding: 8px;
}

::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
}

/* 부모 스크롤 스냅 컨테이너 */
.scroll-container {
  width: 100%;
  height: 100vh;
  overflow: auto;
  scroll-snap-type: y mandatory;
}

/* 자식 스크롤 스냅 영역 */
.scroll-area {
  width: 100%;
  height: 160vh;
  scroll-snap-align: center;
}

.col-lg-6 {
  padding: 0 100px;
}

#chun-icon {
  margin-bottom: 10px;
  text-align: right;
}


@media (max-width: 768px) {
  div {
    overflow: hidden;
  }

  .col-lg-6 {
    padding: 0px;
  }

  .active {
    font-weight: bold;
  }

  .pagination {
    display: flex;
    justify-content: center;
    padding: 1em;
  }

  .pagination button {
    border: 1px solid #ccc;
    background-color: white;
    padding: 0.5em 1em;
    margin: 0 0.3em;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .pagination button:hover {
    background-color: #eee;
  }

  .pagination .active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  .container {
    text-align: center;
  }

  .items-list {
    list-style: none;
    padding: 0;
  }

  .item {
    margin-bottom: 10px;
  }

  .pagination-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination {
    list-style: none;
    padding: 0;
    display: flex;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #ddd;
    color: #333;
  }

  .pagination li.active a,
  .pagination li a:hover {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
}
</style>

