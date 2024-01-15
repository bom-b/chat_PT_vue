<style>
@media (max-width: 768px) {
  #hero {
    margin-left: 10px;
    height: 350px;
    width: 6px;
    background-position: center; /* 배경 이미지를 가운데 정렬 */
    color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
    text-align: left;
  }

  .floating-widget {
    position: fixed;
    top: 100px;
    padding: 10px;
    background-color: rgba(255, 255, 255);
    border: 1px solid #ccc;
    opacity: 1;
  }
}
</style>

<template>
  <div class="col-xs-8" @click="toggleWidget" style="padding: 2px">
    <!-- <div class="col-xs-8" @click="toggleWidget" style="width: 960px; height: 607px; padding: 2px;" > -->
    <!-- <div @click="toggleWidget" style="{ width: widgetWidth, height: widgetHeight }"> -->
    <h2>마이페이지</h2>
    <p>Click to hide me!</p>

    <div class="row">
      <div class="col-md-1" style="background-color: #ffffff; color: #fff">
        <img
          src="@/assets/img/user_icon.png"
          style="margin: 10px; height: 30px"
          @click="showTemplate('ptSchedule')"
        />
        <img
          src="@/assets/img/icon/Frame-1.png"
          @click="showTemplate('ptSchedule')"
          style="margin: 10px"
        />
        <img src="@/assets/img/icon/Frame-2.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-3.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-4.png" style="margin: 10px" />
        <img src="@/assets/img/icon/Frame-5.png" style="margin: 10px" />
      </div>
      <div class="col-md-11">
        target
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import PtSchedule from "@/views/default/d-find-trainer.vue"; //피티스케쥴로 링크

export default {
  components: {
    PtSchedule, //피티스케쥴로 링크
  },
  data() {
    return {
      currentComponent: null, // 창 열때 기본페이지 : 피티스케쥴로 되어있음
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