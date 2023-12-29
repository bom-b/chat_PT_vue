<template>
    <div v-if="widgetVisible" class="floating-widget">
      <h2>My page</h2>
      <p>○○○ 님의 데이터입니다.</p>
      <div></div>
    </div>
  </template>
  
<script>
export default {
  props: {
    widgetVisible: Boolean,
  },
};
</script>

<style lang="scss" scoped>


/* 필요한 스타일 */
.floating-widget {
  width: 900px;
  opacity: 1 !important;
}
</style>