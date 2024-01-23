<template>
  <main class="trainer-profile" :class="{ 'large-screen': isLargeScreen }">
    <!-- 트레이너 정보 섹션 -->
    <section class="trainer-info">
      <div class="profile-image">
        <img
          :src="`${this.$s3BaseURL}/trainer/profile_img/${trainerInfo.mainimage}`"
          alt="Trainer Image"
        />
      </div>
      <div class="info-content">
        <h3>
          <b>{{ trainerInfo.memberVO.name }}</b> 트레이너
        </h3>
        <p>{{ trainerInfo.trainerintro }}</p>
        <button class="apply-btn" @click="applyPT">PT 신청 🏋️‍♀️</button>
      </div>
    </section>
    <!-- 소개말 섹션 -->
    <section class="detail-description">
      <h2>소개말</h2>
      <p>{{ trainerInfo.trainercomment }}</p>
    </section>

    <!-- 상세 설명 섹션 -->
    <section class="detail-description">
      
      <h2>수상경력</h2>
     <div class="awards-grid">
        <div class="award-card" v-if="trainerInfo.awards1">
          <i class="award-icon"></i>
          <span>{{ trainerInfo.awards1 }}</span>
        </div>
        <div class="award-card" v-if="trainerInfo.awards2">
          <i class="award-icon"></i>
          <span>{{ trainerInfo.awards2 }}</span>
        </div>
        <div class="award-card" v-if="trainerInfo.awards3">
          <i class="award-icon"></i>
          <span>{{ trainerInfo.awards3 }}</span>
        </div>
        <div class="award-card" v-if="trainerInfo.awards4">
          <i class="award-icon"></i>
          <span>{{ trainerInfo.awards4 }}</span>
        </div>
        <div class="award-card" v-if="trainerInfo.awards5">
          <i class="award-icon"></i>
          <span>{{ trainerInfo.awards5 }}</span>
        </div>
        <!-- 이하 동일한 구조로 awards3, awards4, awards5에 대해서도 적용 -->
      </div>
    </section>

    <!-- 사진 갤러리 -->
     <!-- 경로 : 
        ${this.$springBaseURL}/images/trainer/${slide.mainimage}
        ${this.$springBaseURL}/trainer/awards_img/${slide.mainimage}
       -->
    <section class="gallery">
      <img
        :src="`${this.$s3BaseURL}/trainer/profile_img/${trainerInfo.subimage1}`"
        alt="Profile Picture"
      />
      <img
        :src="`${this.$s3BaseURL}/images/trainer/awards_img/${trainerInfo.subimage1}`"
        alt="Profile Picture"
      />
      <img
        :src="`${this.$s3BaseURL}/trainer/profile_img/${trainerInfo.subimage2}`"
        alt="Profile Picture"
      />
    </section>

    <!-- 지도 섹션 -->
    <section class="map-container" style="z-index: 0">
      <h2>헬스장 위치 : {{ trainerInfo.region }}</h2>
      <div ref="map" class="map"></div>
    </section>
  </main>
</template>


<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const isAnimated = ref(false);

    onMounted(() => {
      isAnimated.value = true;
    });

    return {
      isAnimated,
    };
  },
  data() {
    return {
      trainerInfo: {
        memberVO: {},
      }, // 데이터 객체로 받기
      trainerId: "",
    };
  },
  computed: {
    isLargeScreen() {
      return window.innerWidth >= 1200; // 1200px을 기준으로 큰 화면 여부 판단
    },
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
      console.log("kakao!");
      console.log(this.trainerInfo.memberVO);
      if (window.kakao && window.kakao.maps) {
        this.initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(this.initMap);
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=70d88945f74f6081525a7affb6e243ec&libraries=services";
        document.head.appendChild(script);
      }
    },
    initMap() {
      const mapContainer = this.$refs.map;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
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
            position: coords,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.trainerInfo.gym}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
          map.setZoomable(true); // 지도의 마우스 휠, 모바일 터치를 이용한 확대, 축소 기능을 막는다.
          map.setLevel(3); // 지도 객체 함수 호출을 통한 확대, 축소는 동작한다.
          var zoomControl = new kakao.maps.ZoomControl(); // 아래와 같이 옵션을 입력하지 않아도 된다
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT); // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
        }
      });
    },
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
.trainer-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.trainer-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profile-image img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.info-content h1 {
  font-size: 2rem;
  color: #007bff;
}

.apply-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apply-btn:hover {
  background-color: #218838;
}

.detail-description,
.gallery,
.map-container {
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  margin: auto;
}

.gallery img {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.map {
  width: 100%;
  height: 400px;
}

/* 대형 화면에서의 레이아웃 변경 */
@media (min-width: 1200px) {
  .trainer-profile {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .trainer-info,
  .detail-description,
  .gallery,
  .map-container {
    width: 48%; /* 화면의 절반 크기로 조정 */
    margin: 1%; /* 간격 조정 */
  }
  .awards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }

  .award-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .award-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .award-icon {
    display: block;
    margin: 0 auto 10px;
    /* 아이콘 스타일링을 위한 CSS 코드 추가 */
  }
}
</style>