<template>
  <main id="main" class="main">
    <div class="container" style="text-align: center; ">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
      <div class="d-flex justify-content-center">
        <ul class="pagination pagination-lg">
          <li class="page-item" v-for="tab in ['아침', '점심', '저녁', '간식']" :key="tab">
            <a class="page-link" :class="{ 'selected-tab': selectedTab === tab }" href="#" @click.prevent="selectTab(tab)">
              {{ tab }}
            </a>
          </li>
        </ul>
      </div>

      <div v-if="selectedTab === '아침'">
        <imgUpload :max-images="5" :uploaded-images="tabImages.아침"
                   @image-removed="removeImage('아침', $event)"
                   @image-uploaded="updateImages('아침', $event)"/>
      </div>
      <div v-if="selectedTab === '점심'">
        <imgUpload :max-images="5" :uploaded-images="tabImages.점심"
                   @image-removed="removeImage('점심', $event)"
                   @image-uploaded="updateImages('점심', $event)"/>
      </div>
      <div v-if="selectedTab === '저녁'">
        <imgUpload :max-images="5" :uploaded-images="tabImages.저녁"
                   @image-removed="removeImage('저녁', $event)"
                   @image-uploaded="updateImages('저녁', $event)"/>
      </div>
      <div v-if="selectedTab === '간식'">
        <imgUpload :max-images="5" :uploaded-images="tabImages.간식"
                   @image-removed="removeImage('간식', $event)"
                   @image-uploaded="updateImages('간식', $event)"/>
      </div>

      <button class="btn btn-primary" @click="submitImages">제출</button>
    </div>

  </main>
</template>


<script>
import ImgUpload from "@/components/util/img-upload.vue";

export default {
  components: {
    ImgUpload
  },
  data() {
    return {
      selectedTab: null, // 선택된 탭
      tabImages: {
        아침: [],
        점심: [],
        저녁: [],
        간식: [],
      }
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
      console.log(this.tabImages)
    },
    updateImages(tab, newImages) {
      console.log("newImage 실행 " )
      this.tabImages[tab].push(...newImages);
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
      console.log("formData : " + formData)
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
    removeImage(tab, { index }) {
      this.tabImages[tab].splice(index, 1);
    },
  }
};
</script>

<style scoped>
.selected-tab {
  font-weight: bold;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
}
.main{
  background-color: white;
}
h3 {
  color: #2a9d8f;
  margin-bottom: 20px;
}

p {
  color: #264653;
}

.btn-primary {
  background-color: #2a9d8f;
  border-color: #2a9d8f;
}

.btn-primary:hover {
  background-color: #264653;
  border-color: #264653;
}

.pagination-lg .page-link {
  background-color: #e9f0f5;
  color: #2a9d8f;
}


imgUpload {
  border: 2px dashed #2a9d8f;
  padding: 20px;
  margin-top: 20px;
  background-color: white;
}

.d-flex {
  margin-top: 20px;
}

ul.pagination {
  padding: 0;
}

.page-item {
  transition: color 0.3s, background-color 0.3s;
}

.page-link {
  background-color: #e9f0f5;
  color: #2a9d8f;
  transition: color 0.3s, background-color 0.3s, transform 0.3s;
  border: none; /* 기본 테두리 제거 */
}

.page-link:hover {
  transform: scale(1.05); /* 마우스 오버시 확대 효과 */
  background-color: #e9f0f5;
  color: #2a9d8f;
}
.page-link:focus {
  outline: none; /* 클릭시 테두리 제거 */
  box-shadow: none;
}
</style>
