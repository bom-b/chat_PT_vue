<template>
  <main id="main" class="">
    <div class="" style="margin: 100px 0 100px 0; text-align: center; ">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
      <p class="" style=" white-space: nowrap">아침, 점심, 저녁, 간식으로 분류해서 업로드 해주세요.</p>
        <button class="btn btn-primary" @click="submitImages">제출</button>
      <div class="d-flex justify-content-center">
        <ul class="pagination pagination-lg">
          <li class="page-item"><a class="page-link" href="#" @click.prevent="selectTab('아침')">아침</a></li>
          <li class="page-item"><a class="page-link" href="#" @click.prevent="selectTab('점심')">점심</a></li>
          <li class="page-item"><a class="page-link" href="#" @click.prevent="selectTab('저녁')">저녁</a></li>
          <li class="page-item"><a class="page-link" href="#" @click.prevent="selectTab('간식')">간식</a></li>
        </ul>
      </div>

      <div v-if="selectedTab === '아침'">
        아침
        <imgUpload :max-images="5" :uploaded-images="tabImages.아침"
                   @image-removed="removeImage('아침', $event)"
                   @image-uploaded="updateImages('아침', $event)"/>
      </div>
      <div v-if="selectedTab === '점심'">
        점심
        <imgUpload :max-images="5" :uploaded-images="tabImages.점심"
                   @image-removed="removeImage('점심', $event)"
                   @image-uploaded="updateImages('점심', $event)"/>
      </div>
      <div v-if="selectedTab === '저녁'">
        저녁
        <imgUpload :max-images="5" :uploaded-images="tabImages.저녁"
                   @image-removed="removeImage('저녁', $event)"
                   @image-uploaded="updateImages('저녁', $event)"/>
      </div>
      <div v-if="selectedTab === '간식'">
        간식
        <imgUpload :max-images="5" :uploaded-images="tabImages.간식"
                   @image-removed="removeImage('간식', $event)"
                   @image-uploaded="updateImages('간식', $event)"/>
      </div>
    </div>

  </main>
</template>

<style scoped>

</style>
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

