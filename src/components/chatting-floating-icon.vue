<template>
  <transition name="slide-fade">
    <div v-if="isFloatingBox" class="floatting-box">
      <component :is="currentComponent" @change-component="handleComponentChange" />
    </div>
  </transition>
  <div class="icon" :class="{active : isFloatingBox, inactive : !isFloatingBox}" @click="doFloating">
    <img @click="showTemplate('ptSchedule')" v-if="!isFloatingBox" class="icon-img" src="../../public/배경지운%20로고.png" style="" alt="">
    <img @click="showTemplate('ptSchedule')" v-if="isFloatingBox" class="icon-img" src="../../public/assets/img/graphic/x.png" style="width: 30px; opacity: 0.5;" alt="">
  </div>
</template>
<style scoped>
.icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 40%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.6s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon.inactive:hover {
  width: 90px;
  height: 90px;
  .icon-img {
    width: 70px;
    transition: all 0.6s ease-in-out;
  }
}

.icon-img {
  width: 40px;
  transition: all 0.6s ease-in-out;
}

.icon.active {
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #eaeaea;
  transition: all 0.6s ease-in-out;
}

.floatting-box {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 390px;
  height: 690px;
  background-color: #f5f5f5;
  border-radius: 30px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter {
  transform: translate3d(0, -20px, 0);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translate3d(0, 20px, 0);
  opacity: 0;
}
</style>

<script>
import PtSchedule from "@/views/pt/pt-chatroom.vue"; //피티스케쥴로 링크
import NextComponent from "@/views/pt/pt-chat.vue"; //피티스케쥴로 링크


export default {
  name: 'ChattingFloatingIcon',
  data() {
    return {
      isFloatingBox: false,
      currentComponent: PtSchedule, // 창 열때 기본페이지 : 피티스케쥴로 되어있음
    }
  },
  methods: {
    doFloating() {
      this.isFloatingBox = !this.isFloatingBox;
    },
    toggleWidget() {
      this.$emit("hide-widget");
    },
    showTemplate(componentName) {
      this.currentComponent = componentName;
    },
    handleComponentChange(componentName) {
      if (componentName === "NextComponentName") {
        this.currentComponent = NextComponent;
      }
    },
  },
  components: {
    PtSchedule, 
    NextComponent,
},
  props: {},
  setup() {
  },
}
</script>