<template>
  <main style="margin-top: 125px">
    <div class="section1800">
      <div v-if="Object.keys(trainerInfo).length" class="card mx-auto card-container" style="width: 18rem">
        <!-- 카드 이미지 -->
        <img :src="`${this.$springBaseURL}/images/trainer/${trainerInfo.mainimage}`" class="card-img-top" alt="Trainer Image" />
        <!-- 카드 본문 -->
        <div class="card-body">
          <h5 class="card-title">{{ trainerInfo.memberVO.name }}</h5>
          <p class="card-text">{{ trainerInfo.trainerintro }}</p>
        </div>
        <!-- 신청 및 기능 -->
        <div class="card-body">
          <button class="card-btn" @click="applyPT">PT 신청 🏋️‍♀️</button>
        </div>
      </div>
      <div class="detail-description">
        <!-- 여기에 상세 설명 내용을 넣습니다. -->
        <h2>소개말</h2>
        <p>{{ trainerInfo.trainercomment }}</p>
        <h2>수상경력</h2>
        <ul>
          <li>{{ trainerInfo.awards1 }}</li>
          <li>{{ trainerInfo.awards2 }}</li>
          <li>{{ trainerInfo.awards3 }}</li>
          <li>{{ trainerInfo.awards4 }}</li>
          <li>{{ trainerInfo.awards5 }}</li>
        </ul>
        <h2>사진</h2>
        <img :src="`${this.$springBaseURL}/images/trainer/${trainerInfo.subimage1}`" alt="Profile Picture">
        <img :src="`${this.$springBaseURL}/images/trainer/${trainerInfo.subimage2}`" alt="Profile Picture">
        <h2>근무 위치</h2>
        <div ref="map" style="width:100%;height:400px;"></div>

        <!-- 더 많은 내용 추가 가능 -->

      </div>
    </div>
  </main>
</template>


<script>
export default {
  data() {
    return {
      trainerInfo: {}, // 데이터 객체로 받기
      trainerId: "",
    };
  },
  methods: {
    // 트레이너 디테일 가져오기
    async fetchTrainerDetail() {
      try {
        // id 바인딩
        this.trainerId = this.$route.params.id;
        console.log("여기입니다 여러분", this.trainerId);
        // 가져온 ID를 사용하여 상세 정보를 요청
        const response = await this.$axios.get(
          `/trainerList/${this.trainerId}`
        );
        this.trainerInfo = response.data;
        console.log("리스폰스", response);
        console.log(this.trainerInfo);
        if (this.trainerInfo && this.trainerInfo.region) {
          // 주소 정보가 로드되면 지도를 초기화합니다.
          this.loadKakaoMap();
        }
        
      } catch (e) {
        console.log("여기가 에러", e);
      }
    },
    // .card-btn 누를 시 | PT신청 메서드_이성한
    async applyPT() {
      try {
        // PT 신청 데이터 준비
        console.log(this.trainerId);
        const requestData = {
          userId: "", // token인증으로 대체
          trainerId: this.$route.params.id, // 트레이너 이름 넣기
          roomId: "",
          status: "wait",
        };

        // PT 신청 API 요청
        const response = await this.$axios.post("/matching", requestData);

        // 성공적인 요청 처리
        console.log("전송 성공:", response.data);
        this.$swal.fire({
          icon: "success",
          title: "PT상담이 신청되었습니다!",
          text: "연락을 기다려주시기 바랍니다.",
        });
      } catch (e) {
        this.$swal
          .fire({
            icon: "warning",
            title: "PT상담이 이미 신청 되어 있습니다!",
            text: "기존 PT상담을 취소 하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "기존 PT예약 삭제",
            cancelButtonText: "아니요, 유지하겠습니다.",
          })
          .then((result) => {
            if (result.value) {
              const requestData = {
                userId: "", // token인증으로 대체
                trainerId: this.$route.params.id, // 트레이너 이름 넣기
                roomId: "",
                status: "wait",
              };
              try {
                console.log("시도중");
                this.$axios.post("/matchCancle", requestData);
              } catch (e) {
                console.log("실패");
                console.log(e);
                this.$swal.fire({
                  icon: "warning",
                  title: "PT신청중에 있습니다!",
                  text: "PT선생님 변경은 기존 선생님과 상의 후 진행하시기 바랍니다.",

                });
              }
              const Toast = this.$swal.mixin({
                toast: true,
                position: "center-center",
                showConfirmButton: false,
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", this.$swal.stopTimer);
                  toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "이전 PT상담이 취소 되었습니다.",
                text: "다시 PT 예약해주시기 바랍니다.",
              });
            }
          });

        console.error("전송 실패:", e);
      }
    },
    loadKakaoMap() {
      // 카카오 맵 스크립트가 이미 로드되었는지 확인
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement('script');
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=70d88945f74f6081525a7affb6e243ec&libraries=services';
        document.head.appendChild(script);
        
      }
    },
    initMap() {
      const mapContainer = this.$refs.map;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);

      const geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.trainerInfo.region, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">근무위치</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    }
  },
  mounted() {
    this.fetchTrainerDetail();
    this.$nextTick(() => {
      this.loadKakaoMap();
    });

  },
};
</script>



<style scoped>
.section1800 {
  margin-top: 80px;
}

.card {
  transition: transform 0.6s;
  /* 애니메이션 지속 시간 설정 */
  transform-origin: center;
  /* 회전의 중심점을 카드 중앙으로 설정 */
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
  color: #007bff;
  /* 강렬한 색상으로 제목 강조 */
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
  background-color: #28a745;
  /* 진한 녹색 배경 */
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
}

.card-btn:hover {
  cursor: pointer;
  background-color: #218838;
  /* 호버시 색상 변경 */
  transform: translateY(-2px);
  /*호버시 약간 위로 이동 */
}

/* 아이콘 애니메이션 */
.card-btn:after {
  content: "";
  display: inline-block;
  margin-left: 5px;
  transition: transform 0.3s;
}

.card-btn:hover:after {
  transform: rotate(20deg);
  /* 호버시 아이콘 회전 */
}

/* 특별한 호버 효과는 제거 */
/* .card:hover {
    transform: scale(1.03);
} */

/* @keyframes spin은 현재 사용하지 않으므로 제거 */
</style>


  