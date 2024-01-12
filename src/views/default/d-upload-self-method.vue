<template>
  <main id="main" class="">
    <div class="" style="margin: 100px 0 100px 0; text-align: center; ">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
      <p class="" style=" white-space: nowrap">아침, 점심, 저녁, 간식으로 분류해서 업로드 해주세요.</p>
<!--      <router-link to="/default/d_upload_result" class="router-link">-->
        <button @click="submitImages">제출</button>
<!--      </router-link>-->
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
        <imgUpload :max-images="5" :uploaded-images="tabImages.아침" @image-uploaded="updateImages('아침', $event)"/>
      </div>
      <div v-if="selectedTab === '점심'">
        점심
        <imgUpload :max-images="5" :uploaded-images="tabImages.점심" @image-uploaded="updateImages('점심', $event)"/>
      </div>
      <div v-if="selectedTab === '저녁'">
        저녁
        <imgUpload :max-images="5" :uploaded-images="tabImages.저녁" @image-uploaded="updateImages('저녁', $event)"/>
      </div>
      <div v-if="selectedTab === '간식'">
        간식
        <imgUpload :max-images="5" :uploaded-images="tabImages.간식" @image-uploaded="updateImages('간식', $event)"/>
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
    },
    updateImages(tab, newImage) {
      this.tabImages[tab].push(newImage);
    },
    convertBase64ToFile(base64Data, filename) {
      const arr = base64Data[0].split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    submitImages() {
      const formData = new FormData();
      Object.keys(this.tabImages).forEach(tab => {
        this.tabImages[tab].forEach((base64Image, index) => {
          const file = this.convertBase64ToFile(base64Image, `image-${tab}-${index}.jpg`);
          formData.append(`${tab}[${index}]`, file);
        });
      });

      // FormData의 내용을 출력
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
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
  }
};
</script>

