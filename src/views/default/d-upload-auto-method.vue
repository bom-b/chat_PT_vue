

<template>
  <main id="main" class="">
    <div class="" style="margin: 100px 0 100px 0; text-align: center;">
      <h3 id="plz-up" class="" style=" white-space: nowrap">오늘의 식단을 업로드 해주세요!</h3>
      <p class="" style=" white-space: nowrap">한 번에 업로드 해주세요.</p>
      <router-link to="/d_upload_result" class="router-link">
        <button>제출</button>
      </router-link>
    </div>
    <div>
      <imgUpload :max-images="20" />
    </div>
  </main>
</template>

<style scoped>

</style>
<script setup>
import imgUpload from "@/components/util/img-upload.vue";
</script>