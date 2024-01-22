<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="section1600" style="padding: 50px;">
      <h1 class="TheJamsil400 mb-5"><img src="../../assets/img/icon/top-rated.png"
          style="width: 50px; height: 50px;" />이달의 <span class="pine_Green_text" style="font-weight: bold;">베스트
          트레이너</span></h1>
      <Carousel :autoplay="4000" :itemsToShow="3.95" :wrapAround="true" :transition="500">
        <Slide v-for="slide in bestTrainerList" :key="slide">
          <div class="carousel__item">
            <a :href="`/default/d_trainer_detail/${slide.memberVO.id}`">
              <div class="card" style="width:100%;">
                <img :src="`${this.$s3BaseURL}/trainer/profile_img/${slide.mainimage}`" style="width: 100%;" />

                <div class="container">
                  <h4><b>{{ slide.memberVO.name }}</b></h4>
                  <p>{{ slide.region }}</p>
                </div>

              </div>
            </a>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
      <div style="margin-top: 70px;">
        <h1 class="TheJamsil400 mb-5"><img src="../../assets/img/icon/icon-map.png"
            style="width: 50px; height: 50px;" />지역별 트레이너 목록</h1>
        <div class="select-container">
          <h4 class="text-xl mb-4" style="text-align: left;"><strong class="pine_Green_text">{{ selectedOption
          }}</strong>에서 근무하시는 트레이너 분들이에요.</h4>

          <select v-model="selectedOption" @change="filterResults">
            <option :value="myRegion">내 지역 트레이너</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <hr class="mb-3" style="border-width: 3px; border-color: #085c57;">
      </div>
      <div>
        <ul class="profile-cards">
          <li v-for="(trainer, idx) in myRegionTrainer" :key="idx" class="card2">

            <div class="image-container">
              <img :src="`${this.$s3BaseURL}/trainer/profile_img/${trainer.mainimage}`" alt="Profile Picture">
            </div>
            <div class="info">
              <div class="card-title">
                <span class="title-content">{{ trainer.memberVO.name }} || <span style="font-size: 1.1rem;">{{
                  trainer.region }} ({{ trainer.gym }})</span></span>
              </div>
              <table class="mt-4 trainer-info-table">
                <tr>
                  <td class="pine_Green_text" style="font-size: 1.25rem; font-weight: bold;">간단 자기 소개 : </td>
                  <td>{{ trainer.trainerintro }}</td>
                </tr>
                <tr>
                  <td class="pine_Green_text" style="font-size: 1.25rem; font-weight: bold;">상담 가능 시간 : </td>
                  <td>{{ trainer.starttime }} ~ {{ trainer.endtime }} </td>
                </tr>
              </table>
            </div>
            <div class="button-container">
              <button class="detail-button" @click="gotodetail(trainer.memberVO.id)">상세보기</button>
            </div>
          </li>
        </ul>
      </div>


    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({

  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  data() {
    return {
      // 베스트 트레이너 section
      bestTrainerList: {},
      myRegion: '',
      myRegionTrainer: {},
      selectedOption: '', // 선택된 옵션을 저장합니다.
      options: [ // 셀렉트 박스의 옵션 목록입니다.
        { text: '강남구', value: '강남구' },
        { text: '강동구', value: '강동구' },
        { text: '강북구', value: '강북구' },
        { text: '강서구', value: '강서구' },
        { text: '관악구', value: '관악구' },
        { text: '광진구', value: '광진구' },
        { text: '구로구', value: '구로구' },
        { text: '금천구', value: '금천구' },
        { text: '노원구', value: '노원구' },
        { text: '도봉구', value: '도봉구' },
        { text: '동대문구', value: '동대문구' },
        { text: '마포구', value: '마포구' },
        { text: '서대문구', value: '서대문구' },
        { text: '서초구', value: '서초구' },
        { text: '성동구', value: '성동구' },
        { text: '성북구', value: '성북구' },
        { text: '송파구', value: '송파구' },
        { text: '양천구', value: '양천구' },
        { text: '영등포구', value: '영등포구' },
        { text: '용산구', value: '용산구' },
        { text: '은평구', value: '은평구' },
        { text: '종로구', value: '종로구' },
        { text: '중구', value: '중구' },
        { text: '중랑구', value: '중랑구' }

      ],
    }
  },
  methods: {
    async fetchBestTrainers() {
      try {
        const response = await this.$axios.get('/BestTrainerListMonth');
        this.bestTrainerList = response.data;

      } catch (e) {
        console.log('여기가 에러', e)
      }
    },
    async fetchMyRegion() {
      try {
        const response = await this.$axios.get('/getMyRegion');


        // 주소 문자열을 공백으로 분할하여 배열로 만듭니다.
        const parts = response.data.split(" ");

        // 배열을 순회하면서 '구' 또는 '시'를 찾습니다.

        for (const part of parts) {
          if (part.includes("구")) {
            this.myRegion = part;
            break; // 첫 번째 '구' 또는 '시'를 찾으면 종료합니다.
          }
        }

        this.fetchMyRegionTrainer();
      } catch (e) {
        console.log('여기가 에러', e)
      }
    },
    async fetchMyRegionTrainer() {
      try {
        const response = await this.$axios.get('/regionTrainer', {
          params: {
            region: this.myRegion,
          }
        })
        this.myRegionTrainer = response.data
        console.log(this.myRegionTrainer)
        this.selectedOption = this.myRegion
      } catch (e) {
        console.log('여기가 에러', e)
      }
    },
    gotodetail(trainerId) {
      this.$router.push({ path: `/default/d_trainer_detail/${trainerId}` });
    },
    async filterResults() {
      try {
        const response = await this.$axios.get('/regionTrainer', {
          params: {
            region: this.selectedOption,
          }
        })
        this.myRegionTrainer = response.data
        console.log(this.myRegionTrainer)
      } catch (e) {
        console.log('여기가 에러', e)
      }
    }
  },
  mounted() {
    this.fetchBestTrainers();
    this.fetchMyRegion();

  },

})

</script>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  height: 700px;
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  height: 700px;
  /* 캐러셀 높이와 동일하게 조절 */
  padding: 10px;
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.carousel__item {
  min-height: 200px;
  width: 95%;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-style: flat;
  /* 3D 변환 비활성화 */
  perspective: none;
  /* perspective 효과 비활성화 */
}

.carousel__item:hover {
  transform: scale(1.03);
  /* 마우스 호버 시 1.1배 확대 */
  opacity: 1;
  /* 마우스 호버 시 투명도 1로 변경 */
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  color: black;
  background: white;
  box-sizing: content-box;
  border: 2px solid white;
}

.profile-cards {
  list-style: none;
  padding: 0;
}

.card2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 요소들 사이에 공간을 균등하게 분배 */
  border-bottom: 1px solid #ccc;
  padding: 10px;
}


.card2 .info {
  margin-left: 50px;
  text-align: left;
}

.card2 .image-container {
  width: 200px;
  /* 이미지 컨테이너의 너비를 지정합니다. */
  height: 250px;
  /* 이미지 컨테이너의 높이를 지정합니다. */
  overflow: hidden;
  /* 이미지가 넘칠 경우 잘라냅니다. */
  object-position: center;
}

.card2 img {
  width: auto;
  /* 이미지 원본 비율을 유지합니다. */
  height: 100%;
  /* 컨테이너의 높이에 맞게 조절됩니다. */
}

.card2 .info .card-title {
  font-size: 1.5em;
  color: #000;
  font-weight: bold;
  text-align: left;
  margin-top: auto;
  position: relative;
  /* Allows absolute positioning of the pseudo-element */
}

.card2 .info .card-title .title-content {
  display: inline-block;
  /* This makes the container only as wide as its content */
  position: relative;
  /* Needed for the positioning of the pseudo-element */
}

.card2 td {
  padding-top: 15px;
  /* 상단 여백을 15px로 설정합니다. */
  padding-bottom: 15px;
  /* 하단 여백을 15px로 설정합니다. */
}

.card2 .info .card-title .title-content::after {
  content: '';
  display: block;
  width: 100%;
  /* This will now make the line as wide as the content of .title-content */
  height: 5px;
  background: green;
  position: absolute;
  left: 0;
  bottom: -10px;
  /* Adjust this value as needed to position the underline */
}

.select-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-container select {
  margin-left: auto;
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  margin-left: auto;
  cursor: pointer;
  outline: none;
  /* 기본 포커스 테두리 제거 */
}

/* 옵션에 마우스 호버 시의 스타일 */
.select-container select:hover {
  border-color: #888;
}

/* 셀렉트 박스 활성화(포커스) 시의 스타일 */
.select-container select:focus {
  border-color: #085c57;
}

/* 비활성화된 셀렉트 박스의 스타일 */
.select-container select:disabled {
  background-color: #f5f5f5;
  opacity: 0.6;
  cursor: not-allowed;
}

.trainer-info-table {
  width: 100%;
}

.trainer-info-table td {
  position: relative;
  /* 상대 위치 설정 */
}

.button-container {
  position: relative;
  margin-left: auto;
  text-align: right;
  /* 텍스트 오른쪽 정렬 */
  vertical-align: middle;
  /* 수직 중앙 정렬 */
}

a {
  text-decoration: none;
  /* 밑줄 제거 */
  color: inherit;
  /* 부모 요소의 색상을 상속받음 */
}

a:hover,
a:visited,
a:active {
  color: inherit;
  /* 호버, 방문한 링크, 활성 상태에서도 색상 변경 없음 */
}

.detail-button {
  padding: 10px 20px;
  /* 버튼의 패딩을 조정합니다. */
  background-color: green;
  /* 버튼의 배경 색상을 설정합니다. */
  color: white;
  /* 버튼의 글자 색상을 흰색으로 설정합니다. */
  border: none;
  /* 테두리를 제거합니다. */
  border-radius: 15px;
  /* 버튼의 모서리를 둥글게 합니다. */
  cursor: pointer;
  /* 마우스 커서를 포인터로 설정합니다. */
}

.detail-button:hover {
  background-color: #067a6e;
  /* 마우스 호버 시 버튼의 배경 색상을 변경합니다. */
}
</style>