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
    },
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
        <div class="location">
          <select class="form-select" v-model="selectRegion">
            <option value="-" disabled selected>지역을 선택하세요</option>
            <option v-for="region in regionList" :key="region">{{ region }}</option>
          </select>
          <hr class="my-4" style="border-width: 3px; border-color: #085c57;">
        </div>
        <div class="flex" style="text-align: right">
          <input placeholder="이름으로 검색" id="search" class="border border-gray rounded py-2" type="text" />
          <button class="" style="margin-left: 10px;">검색</button>
        </div>
      </div>
    </section>

    <!-- 이달의 베스트 트레이너 -->
    <section>
      <div class="container">
        <h4 class="text-xl mb-5" style="text-align: left;">이달의 베스트 트레이너</h4>
        <div id="loopslider" class="slider-wrap">
          <ul class="row">
            <li v-for="trainer in bestTrainerList" :key="trainer.id" class="">
              <div class="card">
                <a :href="`/default/d_trainer_detail/${trainer.memberVO.id}`">
                  <img class="card-img-top" :src="getImagePath(trainer.mainimage)" alt=""
                    style="object-fit: cover; aspect-ratio: 1/1; width: 100%;">
                  <div class="card-body">
                    <p class="card-title mb-0">{{ trainer.region }}</p>
                    <p class="card-text">{{ trainer.memberVO.name }}</p>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        </div>
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

        <div class="regiontrainerclass">
          <div v-for="trainer in regionTrainerList" :key="trainer.id" class="col-lg-3 col-md-6 col-sm-6 mb-4">
            <!-- 트레이너 디테일 링크 -->
            <a :href="`/default/d_trainer_detail/${trainer.memberVO.id}`" class="card h-100">
              <img :src="getImagePath(trainer.mainimage)" alt="" class="card-img-top"
                style="object-fit: cover; aspect-ratio: 1/1; width: 100%;">
              <div class="card-body">
                <p class="mb-0">{{ trainer.region }}</p>
                <p class="card-text">{{ trainer.memberVO.name }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@keyframes conveyorMove {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% * 5));
  }
}

/** */


@keyframes scroller {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-4560px, 0);
  }
}

@-webkit-keyframes scroller {
  0% {
    -webkit-transform: translate(0, 0);
  }

  100% {
    -webkit-transform: translate(-4560px, 0);
  }
}

@-moz-keyframes scroller {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-4560px, 0);
  }
}

@-ms-keyframes scroller {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-4560px, 0);
  }
}

@-o-keyframes scroller {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-4560px, 0);
  }
}

#loopslider {
  margin: 0 auto;
  width: 100%;
  height: 170px;
  text-align: left;
  position: relative;
  overflow: hidden;
}

#loopslider:after {
  content: "";
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: url('http://i64.tinypic.com/2qdmzwz.jpg') top center; */
  background-size: 800px auto;
}

#loopslider ul {
  height: 170px;
  float: left;
  display: inline;
  z-index: 2;
  width: 6840px;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: scroller;
  animation-duration: 110s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

#loopslider ul:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  /* background: url('http://i65.tinypic.com/2hn9zdu.jpg'); */
  background-position: 0px 0;
  background-size: 20px;
}

#loopslider ul li {
  position: relative;
  width: 190px;
  height: 150px;
  text-align: center;
  float: left;
  display: inline;
  overflow: hidden;
}

#loopslider ul li img {
  width: 150px;
  height: 150px;
}

#loopslider ul:after {
  content: ".";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}

#loopslider ul {
  display: inline-block;
  overflow: hidden;
}
</style>

