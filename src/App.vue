<template>
  <!-- 사용자 정의 헤더 컴포넌트를 동적으로 선택 -->
  <component :is="headerComponent"/>
  <div class="app">
    <!-- 일단 일반회원 페이지는 사이드바로 디자인 -->
    <component :is="sidebarComponent"/>
    <router-view/>
  </div>
</template>
<script setup>
</script>
<script>
import {mapState} from "vuex";
import None_Header from "@/components/header/none-header.vue";
import PT_Header from "@/components/header/pt-header.vue";
import Default_Sidebar from "@/components/sidebar/d-sidebar.vue";

export default {
  name: 'App',
  computed: {
    ...mapState(['headerType']),
    headerComponent() {
      return this.headerType === 100 ? None_Header :
          this.headerType === 1 ? None_Header :
              this.headerType === 2 ? PT_Header : null;
    },
    sidebarComponent() {
      return this.headerType === 100 ? None_Header :
          this.headerType === 1 ? Default_Sidebar :
              this.headerType === 2 ? None_Header : null;
    },
  },
};
</script>
<style lang="scss">
.background {
  background-color: #F2F4F7;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 0rem;

    @media (max-width: 768px) {
      padding-left: 4rem;
    }
  }
}

:root {
  --sidebar-width: 400px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--grey);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
</style>
