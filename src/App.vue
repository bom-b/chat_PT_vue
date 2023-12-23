<template>
  <div id="app">
    <!-- 사용자 정의 헤더 컴포넌트를 동적으로 선택 -->
    <component :is="headerComponent"/>
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Default_Header from './components/layout/d_header.vue'
import PT_Header from './components/layout/pt_header.vue'
import None_Header from './components/layout/none_header.vue'
import {mapState} from 'vuex';

export default {
  name: 'App',
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
