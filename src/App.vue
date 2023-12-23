<template>
  <div id="app">
    <Defalut_Header/>
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Defalut_Header from './components/layout/d_header.vue'

export default {
  name: 'App',
  components: {
    Defalut_Header,
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
