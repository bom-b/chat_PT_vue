<script>
import axios from 'axios';
export default {
  data() {
    return {
      trainerInfo: [],
    };
  },
  methods: {
    // 파일명 인코딩용 스크립트
    getImagePath(fileName) {
      const basePath = 'http://localhost/springpt/images/trainer/';
      const encodedFileName = encodeURIComponent(fileName);
      return `${basePath}${encodedFileName}`;
    },
    // 트레이너 디테일 가져오기
    async fetchTrainerDetail() {
      try {
        // id 바인딩
        const trainerId = this.$route.params.id;
        console.log("여기입니다 여러분", trainerId)
        // 가져온 ID를 사용하여 상세 정보를 요청
        const response = await axios.get(`http://localhost/springpt/trainerList/${trainerId}`);
        this.trainerInfo = response.data;
        console.log('리스폰스', response);
        console.log(this.trainerInfo);
      } catch (e) {
        console.log('여기가 에러', e);
      }
    },
  },
  mounted() {
    this.fetchTrainerDetail();
  },
};
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <img :src="getImagePath(trainer.mainimage)" alt="Trainer Image" class="img-fluid rounded">
        </div>
        <div v-for="trainer in trainerInfo" :key="trainer.id"
          class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center" style="max-width: 220px;">
          <img :src="getImagePath(trainer.mainimage)" alt="" class="best-profile rounded-circle mb-2"
            style="text-align: center;">
          <p class="">{{ trainer.address }}</p>
          <p class="">{{ trainer.memberVO.name }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
  

  
<style scoped>
/* 추가적인 스타일링이 필요하다면 여기에 작성 */
</style>
  