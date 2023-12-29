<template>
  <!-- 사용자 정의 헤더 컴포넌트를 동적으로 선택 -->
  <component :is="headerComponent" />
  <div class="app">
    <router-view />
  </div>
  <Footer/>
</template>
<script setup>
</script>
<script>
import { mapState } from "vuex";
import PT_Header from "@/components/header/pt-header.vue";
import Default_Header from "@/components/header/d-header.vue";
import Footer from "@/components/footer/footer.vue";
import Login_Header from "@/components/header/login-header.vue"
import None_Header from "@/components/header/none-header.vue";

export default {
  name: 'App',
  components: {
    Footer,
  },
  computed: {
    ...mapState(['headerType']),
    headerComponent() {
      // 일반회원
      if (this.headerType === 1) {
        return Default_Header;
        // PT
      } else if (this.headerType === 2) {
        return PT_Header;
        // none헤더
      } else if (this.headerType === 100) {
        return None_Header;
        // 비회원
      } else {
        return Login_Header;
      }
    },
  },
};
</script>

