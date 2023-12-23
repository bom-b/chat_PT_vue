<template>
  <div id="app">
    <!-- 사용자 정의 헤더 컴포넌트를 동적으로 선택 -->
    <component :is="headerComponent" />
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Default_Header from './components/layout/d_header.vue'
import PT_Header from './components/layout/pt_header.vue'

export default {
  name: 'App',
  components: {
    Default_Header: Default_Header,
    PT_Header,
  },
  data() {
    return {
      // 기본적으로는 Default_Header를 사용
      headerComponent: Default_Header,
    };
  },
  methods: {
    // 페이지에 따라 헤더 변경 메서드
    changeHeader(headerType) {
      if (headerType === 1) {
        this.headerComponent = Default_Header;
      } else if (headerType === 2) {
        this.headerComponent = PT_Header;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
