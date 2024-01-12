<script>
export default {
  data() {
    return {
      // db에 있는 지역을 리스트를 받음
      regionList: [],
      // 선택된 지역
      selectRegion: null,
      // 베스트 트레이너 section
      bestTrainers: {},
      // 지역 트레이너 section
      regionTrainerList: {}
    };
  },
  watch: {
    selectRegion: {
      immediate: true, // 페이지 로딩 시에도 호출
      handler: function (newValue, oldValue) {
        // selectRegion이 변경될 때마다 호출되는 로직
        if (oldValue !== newValue) {
          console.log("뉴벨", newValue)
          console.log("오벨", oldValue)
          this.fetchRegionTrainer();
        }
      }
    }
  },
  methods: {
    // 파일명 인코딩용 스크립트
    getImagePath(fileName) {
      const basePath = 'http://localhost/springpt/images/trainer/';
      const encodedFileName = encodeURIComponent(fileName);

      return `${basePath}${encodedFileName}`;
    },
    // 이달의 베스트 트레이너 가져오기
    async fetchBestTrainers() {
      try {
        const response = await this.$axios.get('/BestTrainerListMonth');
        console.log('베스트 트레이너', response)
        this.bestTrainerList = response.data;
      } catch (e) {
        console.log('여기가 에러', e)
      }
    },
    // 지역 목록 가져오기
    async fetchRegions() {
      try {
        const response = await this.$axios.get('/regions');
        console.log("지역 가져오기", response)
        this.regionList = response.data;
      } catch (e) {
        console.error('지역 목록 가져오기 에러', e);
      }
    },
    // 지역 선택 후, 트레이너 데이터 가져오기
    async fetchRegionTrainer() {
      console.log("여기다", this.selectRegion)
      try {

        const response = await this.$axios.get(`/regionTrainer/${this.selectRegion}`);
        console.log("지역트레이너", response)
        this.regionTrainerList = response.data;
      } catch (e) {
        console.error('지역 트레이너 가져오기 에러', e);
      }
    },
  },
  mounted() {
    // 컴포넌트가 마운트된 후 베스트 트레이너 데이터를 불러옴
    this.fetchBestTrainers();
    this.fetchRegions();
  }
}


</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <main>
    <!--  지역설정  -->
    <section>
      <div class="section1800" style="padding: 4vw;">
        <div class="text-center">
          <select class="form-select" v-model="selectRegion">
            <option value="-" disabled selected>지역을 선택하세요</option>
            <option v-for="region in regionList" :key="region">{{ region }}</option>
          </select>
          <hr class="my-4" style="border-width: 3px; border-color: #085c57;">
        </div>
        <div class="flex" style="text-align: right">
          <input placeholder="이름으로 검색" id="search" class="border border-gray rounded py-2" type="text" />
          <button id='runaway-btn'>Click Me &#129315;</button>
        </div>
      </div>
    </section>
    <section>
      <div>

      </div>
    </section>

    <!-- 이달의 베스트 트레이너 -->
    <section class="section1800">
      <div class="container">
        <h4 class="text-xl mb-5" style="text-align: left;"><strong>이달의 베스트 트레이너</strong></h4>
        <ul class="row move1">
          <li v-for="trainer in bestTrainerList" :key="trainer.id" class="col-md-2 mb-4">
            <!-- 부모 div에 Flexbox 스타일 적용 -->
            <a :href="`/default/d_trainer_detail/${trainer.memberVO.id}`">
              <div class="card">
                <img class="card-img-top" :src="getImagePath(trainer.mainimage)" alt=""
                  style="object-fit: cover; aspect-ratio: 1/1; width: 100%;">
                <div class="card-body">
                  <p class="mb-0">{{ trainer.region }}</p>
                  <p class="card-text">{{ trainer.memberVO.name }}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- 지역 & 트레이너 -->
    <section>
      <div class="section1800" style="padding: 5vw;">
        <div class="section-header">
          <h4 class="text-xl mb-2" style="text-align: left;"><strong>{{ this.selectRegion }}</strong>에서</h4>
          <h4 class="text-xl mb-4" style="text-align: left;">근무하시는 트레이너 분들이에요.</h4>
          <hr class="mb-3" style="border-width: 3px; border-color: #085c57;">
        </div>

        <ul class="row move2">
          <li v-for="trainer in regionTrainerList" :key="trainer.id" class="col-md-2 mb-4">
            <!-- 부모 div에 Flexbox 스타일 적용 -->
            <a :href="`/default/d_trainer_detail/${trainer.memberVO.id}`">
              <div class="card">
                <img class="card-img-top" :src="getImagePath(trainer.mainimage)" alt=""
                  style="object-fit: cover; aspect-ratio: 1/1; width: 100%;">
                <div class="card-body">
                  <p class="mb-0">{{ trainer.region }}</p>
                  <p class="card-text">{{ trainer.memberVO.name }}</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
/**도망가는 버튼 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  user-select: none;
}

body {
  background-color: rgb(31, 31, 31);
}

button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 4rem;
  width: 10rem;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 5px black;
  background-color: white;
}

/** */
li::marker {
  content: "♬";
}

.card {
  max-width: 150px;
  max-height: 220px;
}

.move1 {
  animation-duration: 10s;
  animation-name: slidein;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.move2 {
  animation-duration: 10s;
  animation-name: slidein2;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 200%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

@keyframes slidein2 {
  from {
    margin-left: 0%;
    width: 100%;
  }

  to {
    margin-left: 100%;
    width: 200%;
  }
}

img {
  max-width: 150px;
  max-height: 200px;
}
</style>

