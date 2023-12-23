<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../../assets/img/배경지운%20로고.png" alt="">
    </div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons" style="margin-top: 10px;">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h1 class="menu-title">일반 사용자 메뉴</h1>
    <div class="menu">
      <router-link class="button" to="/d_home">
        <span class="material-icons">home</span>
        <span class="text">식단등록</span>
      </router-link>
      <router-link class="button" to="/d_about">
        <span class="material-icons">home</span>
        <span class="text">식단 추천 받기</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">group</span>
        <span class="text">식단 분석</span>
      </router-link>
      <router-link class="button" to="/about">
        <span class="material-icons">email</span>
        <span class="text">트레이너 찾기</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link class="button" to="/">
        <span class="material-icons">settings</span>
        <span class="text"></span>
      </router-link>
    </div>
  </aside>
</template>
<script setup>
import {ref} from 'vue'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value

  localStorage.setItem("is_expanded", is_expanded.value.toString());
}
</script>
<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: #FFFFFF;
  color: #000000;

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-top: 1rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: #727070;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: #727070;
          transform: translateX(0.2rem);
        }
      }
    }
  }

  .menu-title, .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .menu-title {
    color: var(--gray);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: #727070;
        margin-right: 1rem;
        transition: 0.2s ease-out;
      }

      .text {
        color: #000000;
        transition: 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        background-color: #e3dbdb;

        .material-icons, text {
          color: #727070;
        }
      }

      .router-link-exact-active {
        border-right: 5px solid #000000;
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    .menu-title, .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>