<template>
  <div class="main-container">
    <main>
      <div class="loading_div" v-if="isLoading">
        <div class="spinner-border" style="color: green;">
        </div>
        <span>추천 정보를 분석 중입니다.</span>
      </div>
      <div v-else>
        <div class="row "
          style="margin-top: 50px; text-align: center; display: flex; width: 1600px; align-items: center;">
          <div style="margin-bottom: 50px;">
            <div style=" margin-bottom: 20px;">
              <span class="material-icons pine_Green_text">bar_chart</span>
              <span id="" class="pine_Green_text TheJamsil400" style="white-space: nowrap; font-size: 3.0rem;">나만의 맞춤 음식
                추천</span>
            </div>
            <p class="TheJamsil400" style="white-space: nowrap; font-size: 2.0rem; margin-bottom: 30px;">추천 음식 리스트</p>
            <p style="font-size: 1.75rem;">회원님의 선호 음식을 <img src="../../assets/img/배경지운 로고.png" alt=""
                style="width: 50px" /><span class="TheJamsil400"
                style="font-size: 2.0rem; color: coral; font-weight: bold;"> "AI"</span> 가 분석해 추천해 드려요</p>
            <div id="app" style="margin-top: 45px;">
              <div class="header section1400">
                <span class="title">마지막으로 등록한 음식</span>
                <div class="profile-image-wrapper">
                  <img :src="`${this.$s3BaseURL}/food_main_images/${lastfoodimage}`" alt="프로필 이미지" class="lastfood-image">
                </div>
                <div class="subtitle"><span style="font-size: 1.7rem;">{{ lastfood }}</span></div>
              </div>
            </div>
            <!-- 상품 목록을 감싸는 컨테이너 -->
            <div class="product-container" v-if="recommand_status == 0">
              <!-- 상품을 나타내는 div, 실제 데이터를 연결하기 위한 v-for 디렉티브는 제거 -->
              <button type="button" class="btn bold" @click="changeFood()">&lt;</button>
              <div class="product-item" v-for="item in recommand_fooddata.slice(0, 5)" :key="item.FOODNUM"
                @click="divclick(item.FOODNUM, item.FOODCAL, item.FOOD_TAN, item.FOOD_DAN, item.FOOD_GI)">
                <!-- 이미지를 넣을 자리 -->
                <div class="food-image-wrapper">
                  <img :src="`${this.$s3BaseURL}/food_main_images/${item.FOODIMG}`" alt="프로필 이미지"
                    class="profile-image food-image">
                </div>
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
              <button type="button" class="btn bold" @click="changeFood()">&gt;</button>
            </div>
            <div class="product-container" v-else-if="recommand_status == 1">
              <!-- 상품을 나타내는 div, 실제 데이터를 연결하기 위한 v-for 디렉티브는 제거 -->
              <button type="button" class="btn bold" @click="changeFood()">&lt;</button>
              <div class="product-item" v-for="item in recommand_fooddata.slice(5, 10)" :key="item.FOODNUM"
                @click="divclick(item.FOODNUM, item.FOODCAL, item.FOOD_TAN, item.FOOD_DAN, item.FOOD_GI)">
                <!-- 이미지를 넣을 자리 -->
                <div class="food-image-wrapper">
                  <img :src="`${this.$s3BaseURL}/food_main_images/${item.FOODIMG}`" alt="프로필 이미지"
                    class="profile-image food-image">
                </div>
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
              <button type="button" class="btn bold" @click="changeFood()">&gt;</button>
            </div>

          </div>
          <div class="col-lg-6 col-sm-6 chart" style="height: 600px; text-align: center;">
            <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 칼로리</p>
            <canvas ref="myPieChart" width="400" height="400"></canvas>
            <p class="TheJamsil400">칼로리 : {{ currentCal }}<span v-if="FOODCAL != 0">(+{{ FOODCAL }})</span> / {{
              recommandCal
            }} (kcal)</p>
          </div>

          <div class="col-lg-6 col-sm-6 chart" style="height: 600px; text-align: center;">
            <p class="TheJamsil400" style="white-space: nowrap; font-size: 1.3rem; margin-bottom: 30px;">오늘의 영양소</p>
            <canvas ref="myBarChart" width="400" height="400"></canvas>
            <p class="TheJamsil400">탄수화물 : {{ currenttan }}<span v-if="FOODTAN != 0">(+{{ FOODTAN }})</span> / {{
              recommand_tan }} (g)</p>
            <p class="TheJamsil400">단백질 : {{ currentdan }}<span v-if="FOODDAN != 0">(+{{ FOODDAN }})</span>/ {{
              recommand_dan
            }} (g)</p>
            <p class="TheJamsil400">지방 : {{ currentgi }}<span v-if="FOODGI != 0">(+{{ FOODGI }})</span> / {{ recommand_gi
            }}
              (g)</p>
          </div>
        </div>
        <div class="row" style="margin-top: 250px; text-align: center; display: flex;">

          <div>
            <span class="material-icons pine_Green_text" style="font-size: 3.0rem;">bar_chart</span>
            <span id="" class="pine_Green_text TheJamsil400" style="white-space: nowrap; font-size: 3.0rem;">{{ tablename
            }}</span>

            <div style="margin-bottom: 50px;">
              <p style="font-size: 2.0rem;">{{ tablecoment }}</p>
              <span style="justify-content: center;" v-if="tablestate"><button class="btn" @click="tablechange"
                  style="font-size: 1.7rem;"><span class="material-icons ">sync</span>{{ buttonpurpose }}</button></span>
              <div style="display: flex; justify-content: flex-end; align-items: center;">
                <button class="btn" @click="openPanel">
                  <span class="material-icons" style="font-size: 1.5rem;">search</span> 다른 기준으로 검색
                </button>
              </div>


              <div class="table-container">
                <table class="table table-responsive" style="width: 100%; margin-top: 25px;">
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
                  <tbody v-if="tablestate">
                    <tr v-for="item in paginatedData" :key="item.idx">
                      <td>{{ maskName(item[0]) }}</td>
                      <td><img :src="`${this.$s3BaseURL}/food_main_images/${item[3]}`" alt="프로필 이미지" class="profile-image"
                          style="width: 150px; height: 115px;"></td>
                      <td>{{ item[7] }}</td>
                      <td>{{ item[2].toFixed(2) }} kcal</td>
                      <td>{{ item[4].toFixed(2) }} g</td>
                      <td>{{ item[5].toFixed(2) }} g</td>
                      <td>{{ item[6].toFixed(2) }} g</td>
                      <td>{{ item[9] }}</td>
                      <td>{{ formattedDate(item[8]) }}</td>
                    </tr>
                  </tbody>
                  <tbody v-else-if="!tablestate">
                    <tr v-for="item in paginatedData2" :key="item.idx">
                      <td>{{ maskName(item.nickname) }}</td>
                      <td><img :src="`${this.$s3BaseURL}/food_main_images/${item.foodimg}`" alt="프로필 이미지" class="profile-image"
                          style="width: 150px; height: 115px;"></td>
                      <td>{{ item.foodname }}</td>
                      <td>{{ item.foodcal.toFixed(2) }} kcal</td>
                      <td>{{ item.food_tan.toFixed(2) }} g</td>
                      <td>{{ item.food_dan.toFixed(2) }} g</td>
                      <td>{{ item.food_gi.toFixed(2) }} g</td>
                      <td>{{ item.category }}</td>
                      <td>{{ formattedDate(item.uploaddate) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-12" v-if="tablestate">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: currentPage === page }">
                      <button class="page-link" @click="changePage(page)">{{ page }}</button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-12" v-else-if="!tablestate">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: currentPage === page }">
                      <button class="page-link" @click="changePage(page)">{{ page }}</button>
                    </li>
                  </ul>
                </nav>
              </div>
              <!--         사이드 패널           -->
              <div v-if="isPanelOpen" class="side-panel" style="margin-top: 300px;" ref="sidePanel">
                <h2 class="mt-3 mb-3 text-center">검색 옵션 설정</h2>
                <select class="form-select" v-model="selectedCategory" style="text-align: center;"
                  @change="resetSubCategory">
                  <option value="">대분류를 선택하세요</option>
                  <option v-for="(subCategories, category) in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
                <div v-if="selectedCategory">
                  <select class="form-select" v-model="selectedSubCategory" style="text-align: center;">
                    <option value="">중분류를 선택하세요</option>
                    <option v-for="subCategory in categories[selectedCategory]" :key="subCategory" :value="subCategory">
                      {{ subCategory }}
                    </option>
                  </select>
                </div>

                <button @click="search" class="btn btn-success mt-3" style="margin-right: 10px;"
                  v-if="selectedCategory">검색</button>

                <button @click="closePanel" class="btn btn-secondary mt-3">닫기</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
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
      lastfoodimage : '',
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

      recommand_status: 0,
      isPanelOpen: false,
      isLoading: true,
      // true면 첫번째 로딩 됬을 때 테이블
      tablestate: true,

      categories: {
        '먹은 시간별 보기': ['아침', '점심', '저녁', '간식'],
        '연령대 별 보기': ['10대', '20대', '30대', '40대', '50대', '60대', '70대'],
        '식단 목적별 보기': ['다이어트', '체중유지', '벌크업']
        // 추가 대분류 및 중분류
      },
      selectedCategory: '', // 선택된 대분류
      selectedSubCategory: '', // 선택된 중분류

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
    this.fetchDataAndCreateCharts();
  }
  },
  methods: {
    async fetchDataAndCreateCharts() {
      try {
        const res = await this.$axios.get('/food_recommand');

        const { recommand_cal, now_cal, recomand_nutrition, now_nutrition, lastfood,
          recomandfood, userage, age_food_info, purpose_food_info, userpurpose, lastfoodimage} = res.data;
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
        this.lastfoodimage =lastfoodimage

        console.log('전체데이터 : ',res.data)
        // 유저 나이 정보
        this.userage = userage

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
        console.log(this.age_food_info)
        // 목적 별 최근 올린 음식 25개
        this.purpose_food_info = purpose_food_info

        // 테이블 전환 초기 설정(연령대 별이 디폴트 값)
        this.tableinfo = age_food_info
        
        this.tablename = this.ageDecade + "대가 최근에 올린 음식"
        this.tablecoment = '회원님과 비슷한 연령대의 다른 회원들이 등록한 음식을 보여드려요'
        this.status = 0
        this.buttonpurpose = '식단 목적이 비슷한 사람 보기'
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
      catch (error) {
        // console.error("Error fetching data: ", err);
        // alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.');
        this.isLoading = false;
      }
    },
    openPanel() {
      this.isPanelOpen = true;
    },
    closePanel() {
      this.isPanelOpen = false;
    },
    resetSubCategory() {
      // 대분류가 변경될 때 중분류를 0으로 초기화
      this.selectedSubCategory = '';
    },
    search() {
      console.log('선택된 대분류:', this.selectedCategory);
      console.log('선택된 중분류:', this.selectedSubCategory);
      this.$axios.get('/searchOption', {
        params: {
          selectedCategory: this.selectedCategory,
          selectedSubCategory: this.selectedSubCategory
        }
      })
        .then((res) => {
          console.log(res.data)
          this.tablestate = false
          this.tableinfo = res.data
          if (this.selectedCategory == '연령대 별 보기') {
            if (this.selectedSubCategory == '10대') {
              this.ageDecade = 10;
            } else if (this.selectedSubCategory == '20대') {
              this.ageDecade = 20;
            }
            else if (this.selectedSubCategory == '30대') {
              this.ageDecade = 30;
            }
            else if (this.selectedSubCategory == '40대') {
              this.ageDecade = 40;
            }
            else if (this.selectedSubCategory == '50대') {
              this.ageDecade = 50;
            }
            else if (this.selectedSubCategory == '60대') {
              this.ageDecade = 60;
            }
            else if (this.selectedSubCategory == '70대') {
              this.ageDecade = 70;
            }
            this.tablename = this.ageDecade + "대가 최근에 올린 음식"
            this.tablecoment = ''
          } else if (this.selectedCategory == '먹은 시간별 보기') {
            if (this.selectedSubCategory == '아침') {
              this.tablename = "회원들이 아침에 올린 음식"
            } else if (this.selectedSubCategory == '점심') {
              this.tablename = "회원들이 점심에 올린 음식"
            } else if (this.selectedSubCategory == '저녁') {
              this.tablename = "회원들이 저녁에 올린 음식"
            } else if (this.selectedSubCategory == '간식') {
              this.tablename = "회원들이 간식에 올린 음식"
            }
            this.tablecoment = ''
          } else if (this.selectedCategory == "식단 목적별 보기") {
            if (this.selectedSubCategory == '다이어트') {
              this.userpurpose = "다이어트가"
            } else if (this.selectedSubCategory == '체중유지') {
              this.userpurpose = "체중유지가"
            } else if (this.selectedSubCategory == '벌크업') {
              this.userpurpose = "벌크업이"
            }
            this.tablename = this.userpurpose + " 목적인 사람들이 올린 음식"
            this.tablecoment = ''
          }


          this.closePanel()
          this.selectedCategory = ''
          this.selectedSubCategory = ''
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert('데이터 로딩 중 오류가 발생했습니다. 오류 로그를 확인하세요.');
        })
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
        this.tablecoment = '식단 목적이 회원님과 비슷한 사람들이 올린 음식을 보여드려요'
        this.status = 1
        this.buttonpurpose = '연령대가 비슷한 사람 보기'
        this.currentPage = 1
      } else if (this.status == 1) {
        this.tableinfo = this.age_food_info
        this.tablename = this.ageDecade + "대가 최근에 올린 음식"
        this.tablecoment = '회원님과 비슷한 연령대의 다른 회원들이 등록한 음식을 보여드려요'
        this.status = 0
        this.buttonpurpose = '식단 목적이 비슷한 사람 보기'
        this.currentPage = 1
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
    },
    changeFood() {
      if (this.recommand_status == 0) {
        this.recommand_status = 1
      } else {
        this.recommand_status = 0
      }
    }

  },
  computed: {
    pageCount() {
      return Math.ceil(this.tableinfo.length / this.pageSize);
    },
    paginatedData() {
      if (!Array.isArray(this.tableinfo)) {
        return []; // tableinfo가 배열이 아니면 빈 배열 반환
      }
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableinfo.slice(start, end);
    },
    paginatedData2() {
      if (!Array.isArray(this.tableinfo)) {
        return []; // tableinfo가 배열이 아니면 빈 배열 반환
      }
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableinfo.slice(start, end);
    },

  },
  beforeUnmount() {
    // 페이지 이동 시에 showChart 값을 false로 설정하여 차트를 숨깁니다.
    this.showChart = false;
  },
};
</script>

<style lang="scss" scoped>
.loading_div {
  margin-top: 300px;
  font-size: 40px;
}

.side-panel {
  position: absolute;
  top: 1925px;
  right: 150px;
  width: 300px;
  height: 250px;
  margin-top: -20px;
  margin-right: 300px;
  border: 2px solid #ddd;
  /* 테두리 색상 및 두께 지정 */
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: -5px -5px 5px -5px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.table-container {
  position: relative;
}

.food-image-wrapper {
  overflow: hidden;
  width: 250px;
  /* 이미지의 너비를 고정합니다 */
  height: 160px;
  /* 이미지의 높이를 고정합니다 */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* 자동 마진을 통해 중앙 정렬합니다 */
}

.food-image {
  width: auto;
  /* 이미지 원본 비율을 유지합니다 */
  height: 100%;
  /* 컨테이너 높이에 맞춰 늘어납니다 */
  object-fit: cover;
  /* 이미지가 컨테이너를 넘치지 않게 조정합니다 */
  object-position: center;
  /* 이미지 중앙이 컨테이너 중앙에 오도록 합니다 */
}

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

.table-responsive {
  overflow-x: auto;
}

@media (max-width: 768px) {

  .table td,
  .table th {
    padding: .75rem;
    /* 여기서 셀의 패딩을 조절할 수 있습니다 */
    font-size: .875rem;
    /* 폰트 크기를 줄여 더 많은 정보를 표시할 수 있습니다 */
  }
}


.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

}

main {
  max-width: 1800px;
  background-color: #ffffff;
}

table.table td {
  text-align: center;
  vertical-align: middle;
}

.profile-image-wrapper {
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  /* 프로필 이미지 크기 조정 */
  height: 150px;
  /* 테두리 색상은 이미지에 맞게 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: auto;
}

.lastfood-image {
  width: 100%;
  height: 100%;
}

.subtitle {
  font-size: 1rem;
  color: #555;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

}

/* 개별 상품 아이템 스타일 */
.product-item {
  border: 2.5px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;

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


.col-lg-6 {
  padding: 0 100px;
}

#chun-icon {
  margin-bottom: 10px;
  text-align: right;
}

.bold {
  font-weight: bold;
  font-size: 1.2em;

}

@media (max-width: 768px) {
  .side-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    /* 전체 화면으로 표시 */
  }
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


}</style>

