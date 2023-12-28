<template>
  <!-- 사용자 정의 헤더 컴포넌트를 동적으로 선택 -->
  <component :is="headerComponent"/>
  <div class="app">
    <router-view/>       
  </div>
  <Footer/>
</template>
<script setup>
</script>
<script>
import {mapState} from "vuex";
import None_Header from "@/components/header/none-header.vue";
import PT_Header from "@/components/header/pt-header.vue";
import Default_Header from "@/components/header/d-header.vue";
import Footer from '@/components/footer/footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  computed: {
    ...mapState(['headerType']),
    headerComponent() {
      return this.headerType === 100 ? None_Header :
          this.headerType === 1 ? Default_Header :
              this.headerType === 2 ? PT_Header : null;
    },
  },
};
</script>

