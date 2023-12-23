import { createRouter, createWebHistory } from "vue-router";
import app from './App.vue';
import Login from "./views/common/login-page.vue";
import D_Home from "@/views/default/d_home-page.vue";
import D_About from "@/views/default/d_about-page.vue";
import PT_Home from "./views/pt/pt-home-page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Login , meta: { headerType: 1 } },
    { path: "/d_home", component: D_Home, meta: { headerType: 1 } },
    { path: "/d_about", component: D_About, meta: { headerType: 1 } },
    { path: "/pt_home", component: PT_Home, meta: { headerType: 2 } },
  ],
});

router.beforeEach((to, from, next) => {
  const headerType = to.meta.headerType || 1;
  store.commit('setHeaderType', headerType); // 스토어의 뮤테이션 호출
  next();
});

export default router;
