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
import PT_Header from "@/components/header/pt-header.vue";
import Default_Header from "@/components/header/d-header.vue";
import Footer from "@/components/footer/footer.vue";
import Login_Header from "@/components/header/login-header.vue"
import main_header from '@/components/header/main-header.vue';
import foodNames from '@/food_names.json';
// import None_Header from "@/components/header/none-header.vue";
/* main.css or App.vue */
export default {
  name: 'App',
  provide() {
    return {
      foods: this.foods
    };
  },
  components: {
    Footer,
  },
  watch: {
    $route() {
      // $route가 변경될때마다 실행되는 로직
      this.checkToken();
    }
  },
  data() {
    return {
      // 가져온 JSON 데이터를 컴포넌트의 데이터 속성에 할당
      foods: foodNames
    };
  },
  methods: {

    checkToken() {
      this.$axios.get('/checkToken')
          // 토큰이 유효한 경우 토큰을 통해 사용자의 권한을 받아옴
          .then((response) => {
            if (response.data) {
              window.localStorage.setItem('role', response.data);
            } else {
              window.localStorage.clear();
            }
          })
          // 토큰이 유효하지 않을경우 403 에러가 발생하며 에러 발생시 사용자정보 클리어시킴
          .catch(() => {
                window.localStorage.removeItem('jwtToken');
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('nickname');
                window.localStorage.removeItem('name');
              }
          );
    }
  },
  computed: {
    ...mapState(['headerType']),
    headerComponent() {
      // 일반회원
      if (this.headerType === "default") {
        return Default_Header;
        // PT
      } else if (this.headerType === "trainer") {
        return PT_Header;
        // 비회원
      } else if (this.headerType === "non_member") {
        return Login_Header;
        // 헤더 없음
      } else if (this.headerType === "no-header") {
        return main_header;
      }

      // 값을 반환하지 않는 경우에 대한 기본 처리
      return null; // 또는 다른 기본값을 반환할 수 있음
    },
  },
};
</script>

