<template>
  <main id="main" class="main">
    <div class="loading_div" v-if="isLoading">
      <div class="spinner-border" style="color: green;">
      </div>
      <span>음식 이미지를 분석 중입니다.</span>
    </div>
    <div v-else>
    <div class="row">
      <div class="col-3"></div>
      <div class="container col-6" style="margin: 100px 0 100px 0; text-align: center;">
        <h3 id="plz-up" class="" style=" white-space: nowrap">
          <span style="color: #2a9d8f;">식단을 한 번에 업로드 해주세요 </span>
          <i
              class="fas fa-info-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="찍은 시간을 확인해서 자동으로 분류할 수 있어요
      (아침 : 04:00~10:30, 점심 : 10:30~15:00, 저녁 : 17:00~21:00)
        나머지 시간은 간식시간이에요!"
              ref="info"
          ></i>
        </h3>
        <!-- 날짜 선택기와 분류 버튼을 포함하는 컨테이너 -->
        <div class="main-container">
          <!-- 날짜 선택기와 분류 버튼을 포함하는 컨테이너 -->
          <div class="date-and-classify-container">
            <div class="date-picker">
              <input class="datedate" type="date" v-model="selectedDate">
            </div>
            <button data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn-primary" @click="submitClassification">분류</button>
          </div>
        </div>
        <!-- imgUpload 영역 -->
        <div class="imgUploadDiv">
          <imgUpload :max-images="20" @image-uploaded="printImages($event)"/>
        </div>


        <div class="col-3"></div>
      </div>

    </div>
    <!-- 부트스트랩 모달 -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">

          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">분류된 이미지</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <div v-for="(images, category) in tabImages" :key="category" class="category-container"
                 @drop="drop($event, category)" @dragover.prevent>
              <h5>{{ category }}</h5>
              <div class="d-flex flex-wrap">
                <div v-for="(image, index) in images" :key="index" class="m-2" draggable="true"
                     @dragstart="dragStart($event, image, category)">
                  <img :src="image.src" alt="Uploaded Preview" class="img-thumbnail" style="width: 100px; height: 100px;">
                  <p>{{ image.time || '시간 데이터 없음' }}</p>
                </div>
              </div>
            </div>
          </div>



          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">닫기</button>
            <button class="btn btn-primary" data-bs-dismiss="modal" @click="submitImages">제출</button>
          </div>

        </div>
      </div>
    </div>
    </div>
  </main>
</template>


<script>
import ImgUpload from "@/components/util/img-upload.vue";
import EXIF from 'exif-js';
import { Tooltip } from 'bootstrap'

export default {
  components: {
    ImgUpload
  },
  data() {
    return {
      Images: [],
      isModalVisible: false, // 모달 표시 여부
      tabImages: {
        아침: [],
        점심: [],
        저녁: [],
        간식: [],
      },
      selectedDate: null, // 추가된 날짜 데이터
      isLoading: false,
    };
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  },
  created() {
    // 컴포넌트가 생성될 때 오늘 날짜로 초기화
    this.selectedDate = new Date().toISOString().substring(0, 10);
  },
  methods: {
    dragStart(event, image, category) {
      event.dataTransfer.setData('image-info', JSON.stringify({ image, category }));
    },

    drop(event, newCategory) {
      event.preventDefault();
      const data = JSON.parse(event.dataTransfer.getData('image-info'));
      const { image, category } = data;

      // 기존 카테고리에서 이미지 제거
      this.tabImages[category] = this.tabImages[category].filter(img => img.src !== image.src);

      // 새 카테고리에 이미지 추가
      if (!this.tabImages[newCategory]) {
        this.tabImages[newCategory] = [];
      }
      this.tabImages[newCategory].push(image);
    },
    printImages(newImages){
      newImages.forEach(async base64Image => {
        const { category, time } = await this.extractExifData(base64Image);
        if (!this.tabImages[category]) {
          this.tabImages[category] = []; // 배열 초기화
        }
        this.tabImages[category].push({ src: base64Image, time });
      });
    },
    submitClassification(){
      // 모달 표시
      this.isModalVisible = true;
    },
    submitImages() {
      if(Object.values(this.tabImages).every(images => images.length === 0)){
        this.$swal.fire("음식 사진을 올려주세요!","","warning");
        return;
      }
      this.isLoading = true;
      const formData = new FormData();
      // tabImages 객체에 있는 각 탭별로 이미지 데이터를 순회
      Object.keys(this.tabImages).forEach(tab => {
        // 해당 탭에 있는 모든 이미지에 대해 순회
        this.tabImages[tab].forEach((image, index) => {
          // 각 이미지를 formData에 추가
          // 키는 '탭이름[인덱스]' 형식이며, 값은 Base64 인코딩된 이미지 데이터
          formData.append(`${tab}[${index}]`, image.src);
        });
      });
      // 선택된 날짜를 formData에 추가
      if (this.selectedDate) {
        formData.append('date', this.selectedDate);
      }
      console.log(formData.entries());
      this.$axios.post('/food_up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log("서버 응답:", response);
            // 서버 응답 후 라우팅
            this.isLoading = false;
            this.$router.push('/default/d_upload_result');
          })
          .catch(error => {
            this.isLoading = false;
            this.$swal("분석 실패!");
            console.error("에러 발생:", error);
          });
    },
    // 사진 찍은 날짜 및 시간 추출
    async extractExifData(base64Image) {
      // Base64 인코딩된 데이터를 Blob 객체로 변환
      const blob = await fetch(base64Image).then(res => res.blob());

      return new Promise((resolve, reject) => {
        // Blob 객체를 사용하여 EXIF 데이터 추출
        EXIF.getData(blob, () => {
          let category = '간식';

          try {
            const photoTakenDate = EXIF.getAllTags(blob)["DateTimeOriginal"];
            let time = '시간 데이터 없음'; // 기본값 설정
            if (photoTakenDate) {
              // "2020:11:10 12:12:45" 형식의 문자열에서 시간과 분을 추출
              const timePart = photoTakenDate.split(' ')[1];
              const [hours, minutes] = timePart.split(':').map(Number);
              const totalMinutes = hours * 60 + minutes; // 총 분으로 변환

              time = `${hours}시${minutes}분`;

              // 시간대에 따라 라벨을 할당
              // 아침 : 04:00~10:30, 점심 : 10:30~15:00, 저녁 : 17:00~21:00, 나머지 시간은 간식
              if (totalMinutes >= 240 && totalMinutes < 630) {
                category = '아침';
              } else if (totalMinutes >= 630 && totalMinutes < 900) {
                category = '점심';
              } else if (totalMinutes >= 1020 && totalMinutes < 1260) {
                category = '저녁';
              } else {
                category = '간식'; // 기타 시간대는 '간식'으로 분류
              }
            }
            resolve({ category, time});
          } catch (error) {
            reject("EXIF 데이터 처리 중 오류 발생");
          }
        });
      });
    },
  },
}

</script>

<style scoped>
.loading_div {
  margin-top: 300px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.category-container {
  width: 100%; /* 너비 고정 */
  min-height: 150px; /* 최소 높이 설정 */
  margin-bottom: 20px; /* 하단 마진 */
  border: 1px solid #ccc; /* 테두리 */
  padding: 10px; /* 내부 여백 */
  background-color: #f8f9fa; /* 배경 색상 */
}


.container {
  display: flex; /* Flex 컨테이너로 설정 */
  flex-direction: column; /* 자식 요소들을 세로 방향으로 정렬 */
  align-items: center; /* 가로 축에서 중앙 정렬 */
  justify-content: center; /* 세로 축에서 중앙 정렬 */
  width: 100%; /* 컨테이너의 너비를 화면 너비에 맞춤 */
  max-width: 130vh; /* 최대 너비 설정 */
  margin: auto; /* 자동 마진을 사용하여 수평 중앙 정렬 */
  height: auto; /* 높이 자동으로 설정 */
}

.imgUploadDiv {
}

.btn-primary {
  background-color: #45a049;
  border: none; /* 테두리 제거 */
  color: white; /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  border-radius: 5px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

.btn-primary:hover {
  background-color: #45a049;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 호버 시 그림자 증가 */
  transform: translateY(-2px); /* 위로 약간 이동 */
}

.main-container {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center; /* 세로축에서 중앙 정렬 */
  width: 100%; /* 전체 너비 사용 */
}

.date-and-classify-container {
  display: flex; /* Flex 컨테이너로 설정 */
  align-items: center; /* 자식 요소를 세로축 중앙에 배치 */
}

.date-picker input[type="date"] {
  border: 1px solid #2a9d8f;
  border-radius: 5px;
  margin-right: 10px; /* 오른쪽 여백 추가 */
}
.datedate{
  padding: 10px;
  margin-top: 20px;
}

.main {
  background-color: white;
}
.date-picker {
  margin-bottom: 20px;
}
</style>