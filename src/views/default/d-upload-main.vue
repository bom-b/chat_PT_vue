<script setup>

</script>

<template>
  <main id="main" class="">
    <div>등록 방법을 선택해주세요</div>
    <div>
      <router-link to="/default/d_upload_self" class="router-link">
        <a style="font-weight: bold"
        >방법 1 : 직접 등록하기</a>
      </router-link>
    </div>
    <div>
      <router-link to="/default/d_upload_auto" class="router-link">
        <a style="font-weight: bold"
        >방법 2 : 자동으로 등록하기</a>
      </router-link>
    </div>
    <div>
      <router-link to="/default/d_upload_result" class="router-link">
        <a style="font-weight: bold"
        >오늘의 식단 결과 보기</a>
      </router-link>
    </div>
  </main>
</template>
<style scoped>
</style>