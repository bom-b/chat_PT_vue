

<template>
  <main id="main" class="">
    <div class="" style="margin: 100px 0 100px 0; text-align: center;">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 한 번에 업로드 해주세요</h3>
      <p class="" style=" white-space: nowrap">
                              찍은 시간을 확인해서 자동으로 분류할 수 있어요<br>
      (아침 : 04:00~10:30, 점심 : 10:30~15:00, 저녁 : 17:00~21:00) <br>
        나머지 시간은 간식시간이에요!</p>
      <div class="date-picker">
        <input type="date" v-model="selectedDate">
      </div>
      <button data-bs-toggle="modal" data-bs-target="#myModal"
              class="btn btn-primary" @click="submitClassification">분류</button>
      <p>(시간 정보가 없으면 간식으로 분류)</p>
    </div>
    <div>
      <imgUpload :max-images="20" @image-uploaded="printImages($event)"/>
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
            <div v-for="(images, category) in tabImages" :key="category">
              <h5>{{ category }}</h5>
              <div class="d-flex flex-wrap">
                <div v-for="(image, index) in images" :key="index" class="m-2">
                  <img :src="image" alt="Uploaded Preview" class="img-thumbnail" style="width: 100px; height: 100px;">
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

  </main>
</template>


<script>
import ImgUpload from "@/components/util/img-upload.vue";
import EXIF from 'exif-js';
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
    };
  },
  created() {
    // 컴포넌트가 생성될 때 오늘 날짜로 초기화
    this.selectedDate = new Date().toISOString().substring(0, 10);
  },
  methods: {
    updateImages(tab, newImages) {
      console.log("이미지가 tabImages로 들어 옴 " )
      this.tabImages[tab].push(...newImages);
    },
    printImages(newImages){
      newImages.forEach(async base64Image => {
        const category = await this.extractExifData(base64Image);
        this.tabImages[category].push(base64Image);
      });
    },
    submitClassification(){
      // 모달 표시
      this.isModalVisible = true;
    },
    submitImages() {
      const formData = new FormData();
      // tabImages 객체에 있는 각 탭별로 이미지 데이터를 순회
      Object.keys(this.tabImages).forEach(tab => {
        // 해당 탭에 있는 모든 이미지에 대해 순회
        this.tabImages[tab].forEach((base64Image, index) => {
          // 각 이미지를 formData에 추가
          // 키는 '탭이름[인덱스]' 형식이며, 값은 Base64 인코딩된 이미지 데이터
          formData.append(`${tab}[${index}]`, base64Image);
        });
      });
// 선택된 날짜를 formData에 추가
      if (this.selectedDate) {
        formData.append('date', this.selectedDate);
      }
      this.$axios.post('/food_up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log("서버 응답:", response);
            // 서버 응답 후 라우팅
            this.$router.push('/default/d_upload_result');
          })
          .catch(error => {
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
          let label;
          try {
            const photoTakenDate = EXIF.getAllTags(blob)["DateTimeOriginal"];
            if (!photoTakenDate) {
              label = '간식'; // EXIF 데이터가 없는 경우 '간식'으로 분류
              resolve(label);
              return;
            }

            // "2020:11:10 12:12:45" 형식의 문자열에서 시간과 분을 추출
            const timePart = photoTakenDate.split(' ')[1];
            const [hours, minutes] = timePart.split(':').map(Number);
            const totalMinutes = hours * 60 + minutes; // 총 분으로 변환

            // 시간대에 따라 라벨을 할당
            // 아침 : 04:00~10:30, 점심 : 10:30~15:00, 저녁 : 17:00~21:00, 나머지 시간은 간식
            if (totalMinutes >= 240 && totalMinutes < 630) {
              label = '아침';
            } else if (totalMinutes >= 630 && totalMinutes < 900) {
              label = '점심';
            } else if (totalMinutes >= 1020 && totalMinutes < 1260) {
              label = '저녁';
            } else {
              label = '간식'; // 기타 시간대는 '간식'으로 분류
            }

            resolve(label);
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
.date-picker {
  margin-bottom: 20px;
}

.date-picker input[type="date"] {
  padding: 10px;
  border: 1px solid #2a9d8f;
  border-radius: 5px;
}
</style>