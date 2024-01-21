<template>
  <transition name="slide-fade" >
    <div v-if="isFloatingBox" class="floatting-box" style="border: 30px;">
      <component :is="currentComponent" @change-component="handleComponentChange" />
    </div>
  </transition>
  <div class="icon" :class="{active : isFloatingBox, inactive : !isFloatingBox}" @click="doFloating">
    <img @click="showTemplate('chatroom')" v-if="!isFloatingBox" class="icon-img" src="../../public/배경지운%20로고.png" style="" alt="">
    <img @click="showTemplate('chatroom')" v-if="isFloatingBox" class="icon-img" src="../../public/assets/img/graphic/x.png" style="width: 30px; opacity: 0.5;" alt="">
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
  display: flex; /* flexbox 사용 */
  position: fixed;
  bottom: 90px;
  right: 20px;
  height: 100%; /* 전체 높이 */
  width: 100%; /* 전체 너비 */
  max-width: 390px;
  max-height: 690px;
  background-color: #00000000;
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

@media (max-width: 768px) {
  .icon {
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
  }

  .icon.inactive:hover {
    width: 70px;
    height: 70px;
  }

  .icon-img {
    width: 30px;
  }

  .floatting-box {
    bottom: 80px; /* 모바일 환경에서 위치 조정 */
    right: 10px; /* 모바일 환경에서 위치 조정 */
    width: 90%; /* 화면 너비에 맞게 조정 */
    max-width: 360px; /* 최대 너비 설정 */
    max-height: 600px; /* 최대 높이 설정 */
  }
}
</style>


<script>
import chatroom from "@/views/pt/pt-chatroom.vue"; //채팅룸
import NextComponent from "@/views/pt/pt-chat.vue"; //피티스케쥴로 링크


export default {
  name: 'ChattingFloatingIcon',
  data() {
    return {
      isFloatingBox: false,
      currentComponent: chatroom, // 창 열때 기본페이지 : 피티스케쥴로 되어있음
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
    chatroom, 
    NextComponent,
},
  props: {},
  setup() {
  },
}
</script>