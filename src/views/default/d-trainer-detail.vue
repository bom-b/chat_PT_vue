<script>
export default {
  data() {
    return {
      trainerInfo: {}, // 데이터 객체로 받기
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
        const response = await this.$axios.get(`/trainerList/${trainerId}`);
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
    <div v-if="Object.keys(trainerInfo).length" class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center">
      <p>{{ trainerInfo.location }}</p>
      <p>{{ trainerInfo.trainerintro }}</p>
      <img :src="getImagePath(trainerInfo.mainimage)" alt="Trainer Image" class="img-fluid rounded">
      <!-- 여기에 더 많은 trainerInfo 속성을 렌더링할 수 있습니다. -->
    </div>
  </main>
</template>
  

  
<style scoped>
/* 추가적인 스타일링이 필요하다면 여기에 작성 */
</style>
  