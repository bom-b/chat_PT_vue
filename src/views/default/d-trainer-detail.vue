<template>
  <main style="margin-top: 125px">
    <div class="section1800">
      <div
        v-if="Object.keys(trainerInfo).length"
        class="card mx-auto"
        style="width: 18rem"
      >
        <!-- 카드 이미지 -->
        <img
          :src="getImagePath(trainerInfo.mainimage)"
          class="card-img-top"
          alt="Trainer Image"
        />
        <!-- 카드 본문 -->
        <div class="card-body">
          <h5 class="card-title">{{ trainerInfo.memberVO.name }}</h5>
          <p class="card-text">{{ trainerInfo.trainerintro }}</p>
        </div>
        <!-- 신청 및 기능 -->
        <div class="card-body">
          <btn href="#" class="card-btn">상세보기 혹은 다른 기능</btn>
          <button class="card-btn" @click="applyPT">PT 신청 🏋️‍♀️</button>
        </div>
        <!-- 카드 리스트 -->
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ trainerInfo.location }}</li>
          <!-- 상에 대한 정보를 표시하고 싶다면 이렇게 할 수 있습니다. -->
          <li class="list-group-item">{{ trainerInfo.awards1 }}</li>
          <li class="list-group-item">{{ trainerInfo.awards2 }}</li>
          <!-- 기타 수상 내역도 추가할 수 있습니다. -->
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      trainerInfo: {}, // 데이터 객체로 받기
      trainerId:"",
    };
  },
  methods: {
    // 파일명 인코딩용 스크립트
    getImagePath(fileName) {
      const basePath = "http://localhost/springpt/images/trainer/";
      const encodedFileName = encodeURIComponent(fileName);
      return `${basePath}${encodedFileName}`;
    },
    // 트레이너 디테일 가져오기
    async fetchTrainerDetail() {
      try {
        // id 바인딩
        this.trainerId = this.$route.params.id;
        console.log("여기입니다 여러분", this.trainerId);
        // 가져온 ID를 사용하여 상세 정보를 요청
        const response = await this.$axios.get(`/trainerList/${this.trainerId}`);
        this.trainerInfo = response.data;
        console.log("리스폰스", response);
        console.log(this.trainerInfo);
      } catch (e) {
        console.log("여기가 에러", e);
      }
    },
    // .card-btn 누를 시 | PT신청 메서드_이성한
    async applyPT() {
      try {
        // PT 신청 데이터 준비
        console.log(this.trainerId)
        const requestData = {
          userId: "사용자ID", // 예시 데이터, 실제 값으로 변경 필요
          trainerId: this.trainerId, // 트레이너 이름 넣기
          
        };

        // PT 신청 API 요청
        const response = await this.$axios.post("/matching", requestData);

        // 성공적인 요청 처리
        console.log("전송 성공:", response.data);
        Swal.mixin({
          toast : true,
          timer:2000,
          
        })
      } catch (e) {
        console.error("전송 실패:", e);
      }
    },
  
  },
  mounted() {
    this.fetchTrainerDetail();
  },
};
</script>



<style scoped>
.section1800 {
  margin-top: 80px;
}
.card {
  transition: transform 0.6s; /* 애니메이션 지속 시간 설정 */
  transform-origin: center; /* 회전의 중심점을 카드 중앙으로 설정 */
}

.card:hover {
  /* animation: spin 0.6s infinite linear; 무한 회전 애니메이션 적용 */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 기본 스타일 설정 */
.section1800 {
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 18rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card-img-top {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 15px;
}

.card-title {
  color: #007bff; /* 강렬한 색상으로 제목 강조 */
  font-weight: bold;
}

.card-text {
  color: #343a40;
}

.list-group-item {
  font-size: 0.9rem;
}

/* 버튼 스타일 */
.card-btn {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 25px;
  background-color: #28a745; /* 진한 녹색 배경 */
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.card-btn:hover {
  cursor: pointer;
  background-color: #218838; /* 호버시 색상 변경 */
  transform: translateY(-2px); /*호버시 약간 위로 이동 */
}

/* 아이콘 애니메이션 */
.card-btn:after {
  content: "";
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s;
}

.card-btn:hover:after {
  transform: rotate(20deg); /* 호버시 아이콘 회전 */
}

/* 특별한 호버 효과는 제거 */
/* .card:hover {
    transform: scale(1.03);
} */

/* @keyframes spin은 현재 사용하지 않으므로 제거 */
</style>


  