<script>
export default {
  data() {
    return {
      // 지역 구
      location: '',
      // db에 있는 지역을 리스트를 받음
      regions: [],
      // 선택된 지역
      selectRegion: '',
      // 베스트 트레이너 section
      bestTrainers: [],
      // 지역 트레이너 section
      locationTrainers: []
    };
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
        this.bestTrainers = response.data;
        console.log(' 리스폰스', response)
        console.log(this.bestTrainers)
      } catch (e) {
        console.log('여기가 에러', e)
      }
    },
    // 지역 목록을 가져오는 메서드
    async fetchRegions() {
      try {
        const response = await this.$axios.get('/regions');
        this.regions = response.data;
      } catch (e) {
        console.error('지역 목록 가져오기 에러', e);
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
          <select class="form-select" v-model="region" @change="fetchBestTrainers">
            <option value="-" disabled selected>지역을 선택하세요</option>
            <option v-for="region in regions" :key="region">{{ region }}</option>
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
    <section style="background: #FFFFFF">
      <div class="container py-4">
        <h4 class="text-xl mb-5" style="text-align: left;">이달의 베스트 트레이너</h4>
        <div class="row">
          <!-- 베스트 트레이너 리스트 렌더링 -->
          <div v-for="trainer in bestTrainers" :key="trainer.id" class="col-lg-3 col-md-6 col-sm-6 mb-4">
            <!--트레이너 디테일 링크-->
            <a :href="`/default/d_trainer_detail/${trainer.memberVO.id}`" class="card h-100">
              <img :src="getImagePath(trainer.mainimage)" alt="" class="card-img-top rounded-circle mb-2"
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


    <!--근무하시는 트레이너 분들이에요.-->
    <div v-for="trainer in bestTrainers" :key="trainer.id">
      <section id="section3">
        <div class="section1800" style="padding: 4vw;">
          <h4 class="text-xl mb-2" style="text-align: left;"><strong>{{ trainer.region }}</strong>에서</h4>
          <h4 class="text-xl mb-4" style="text-align: left;">근무하시는 트레이너 분들이에요.</h4>
          <hr class="mb-3" style="border-width: 3px; border-color: #085c57;">
          <p class="pine_Green_text mb-5" style="text-align: right;">▼ 인기순</p>
          <div class="mt-4" style="text-align: left;">
            <table class="table transparent-table">
              <thead>
                <tr style="border-bottom: none;">
                  <th class="col-1"></th>
                  <th class="col-11"></th>
                </tr>
              </thead>
              <tbody style="text-align: left;">
                <tr>
                  <th style="padding: 30px 10px;">
                    <img src="../../assets/img/trainer3.jpg" alt="" class="list-profile rounded-circle" style="">
                  </th>
                  <td class="pt-description">
                    <p class="TheJamsil400 mb-3">양승진 트레이너</p>
                    <p class="">최선을 다해서 PT 해드리겠습니다.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
img {
  width: 150px;
  height: 210px;
}

#search {
  max-width: 200px;
}

.list-profile {
  width: 120px;
}

.best-profile {
  width: 150px;
}

.transparent-table {
  background-color: #f8f9f8;
  border: none;
}

.transparent-table th,
.transparent-table td {
  border: none;
}

.transparent-table tr {
  border-bottom: 1px solid #ddd;
  /* 원하는 색상 및 두께로 조절 가능 */
}

.pt-description {
  padding: 30px 10px;
  padding-left: 50px;
}

#section3 {
  margin-top: 100px;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  .best-trainer-icon-container {
    text-align: center;
    margin: auto;
  }

  .best-trainer-icon {
    width: 170px;
    margin-bottom: 30px;
  }

  .best-profile {
    width: 100px;
  }

  #search {
    max-width: 150px;
    margin-bottom: 30px;
  }

  .pt-description {
    padding: 30px 0px;
    padding-left: 20px;
  }

  #section3 {
    margin-top: 50px;
  }
}

.region {
  margin-bottom: 1rem;
}
</style>

