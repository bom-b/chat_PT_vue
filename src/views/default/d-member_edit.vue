<template>
  <main class="section1800"> 
  <div class="col-xs-8" style="margin-top: 150px;">


    <div class="row">
      <div
        class="col-md-1 "
        style="background-color: #ffffff; color: #fff"
      >
        <img
          src="@/assets/img/user_icon.png"
          style="margin: 10px; height: 30px"
          @click="showTemplate('Dmember_edit')"
        />
        <img
          src="@/assets/img/icon/Frame-1.png"
          @click="showTemplate('Dmember_edit')"
          style="margin: 10px"
        />
        <img src="@/assets/img/icon/Frame-2.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-3.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-4.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-5.png" style="margin: 10px" />
      </div>
      <div class="col-md-11">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</main>
</template>

<script>
import Dmember_edit from "@/views/default/d-member_edit2.vue"; //피티스케쥴로 링크

export default {
  components: {
    Dmember_edit, //피티스케쥴로 링크
  },
  data() {
    return {
      currentComponent: Dmember_edit, // 창 열때 기본페이지 : 피티스케쥴로 되어있음
    };
  },

  methods: {
    toggleWidget() {
      this.$emit("hide-widget");
    },
    showTemplate(componentName) {
      this.currentComponent = componentName;
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  #hero {
    margin: 10px;
    height: 350px;
    width: 6px;
    background-position: center; /* 배경 이미지를 가운데 정렬 */
    color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
    text-align: center;
  }

  .floating-widget {
    position: fixed;
    top: 100px;
    background-color: rgba(255, 255, 255);
    border: 1px solid #ccc;
    opacity: 1;
  }
}

@media (min-width: 769px) {
  #hero {
    margin: 10px;
    height: 350px;
    width: 6px;
    background-position: center; /* 배경 이미지를 가운데 정렬 */
    color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
    text-align: center;
  }

  .floating-widget {
    position: fixed;
    top: 100px;
    background-color: rgba(255, 255, 255);
    border: 1px solid #ccc;
    opacity: 1;
  }
  @media (min-width: 1200px) {
    .col-xs-8 {
      max-width: 1200px; /* 최대 너비 설정 */
      margin: 0 auto; /* 중앙 정렬 */
    }
  }
  .section1800 img {
    max-width: 100px; /* 이미지의 최대 너비 */
    max-height: 100px; /* 이미지의 최대 높이 */
    /* 기타 스타일 */
  }
}
</style>