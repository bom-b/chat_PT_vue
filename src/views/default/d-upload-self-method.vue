

<template>
  <main id="main" class="">
    <div class="" style="margin: 100px 0 100px 0; text-align: center; ">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
      <p class="" style=" white-space: nowrap">아침, 점심, 저녁, 간식으로 분류해서 업로드 해주세요.</p>
      <router-link to="/d_upload_result" class="router-link">
        <button>제출</button>
      </router-link>
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
    }
  },
};
</script>

