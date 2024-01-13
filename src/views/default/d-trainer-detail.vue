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
  <div class="section1800">
    <div v-if="Object.keys(trainerInfo).length" class="card mx-auto" style="width: 18rem;">
      <!-- 카드 이미지 -->
      <img :src="getImagePath(trainerInfo.mainimage)" class="card-img-top" alt="Trainer Image">
      <!-- 카드 본문 -->
      <div class="card-body">
        <h5 class="card-title">{{ trainerInfo.memberVO.email }}</h5>
        <p class="card-text">{{ trainerInfo.trainerintro }}</p>
      </div>
      <!-- 카드 리스트 -->
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ trainerInfo.location }}</li>
        <!-- 상에 대한 정보를 표시하고 싶다면 이렇게 할 수 있습니다. -->
        <li class="list-group-item">{{ trainerInfo.awards1 }}</li>
        <li class="list-group-item">{{ trainerInfo.awards2 }}</li>
        <!-- 기타 수상 내역도 추가할 수 있습니다. -->
      </ul>
      <!-- 카드 하단 -->
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.section1800{
  margin-top: 80px;
}
.card {
  transition: transform 0.6s; /* 애니메이션 지속 시간 설정 */
  transform-origin: center; /* 회전의 중심점을 카드 중앙으로 설정 */
}

.card:hover {
  animation: spin 0.6s infinite linear; /* 무한 회전 애니메이션 적용 */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


  