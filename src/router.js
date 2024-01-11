import {createRouter, createWebHistory, RouterView } from "vue-router";
import store from './store';

/*공통*/
import Login from "./views/common/login-page.vue";
import Home from "./views/common/main-home.vue";
import noAuth from "./views/common/noAuth-page.vue";

/*일반사용자 라우터*/
import defaultRoutes from "@/routes/defaultUserRoutes";

/*트레이너사용자 라우터*/
import trainerRoutes from "@/routes/trainerUserRoutes";

/*관리자 라우터*/
import adminRoutes from "@/routes/adminUserRoutes";

/*회원가입 라우터*/
import signUpRoutes from "@/routes/signupRoutes";

const routes = [
    // 로그인 안했을 때의 메인페이지
    {path: "/", component: Home, meta: {headerType: "no-header"}},

    // 로그인
    {path: "/login", component: Login, meta: {headerType: "non_member"}},

    // 권한 없음
    {path: "/noAuth", component: noAuth, meta: {headerType: "non_member"}},

    // 회원 가입
    {
        path: "/signUp",
        component: RouterView,
        children: signUpRoutes,
        meta : { headerType: "non_member" },
    },

    // 일반 사용자
    {
        path: "/default",
        component: RouterView,
        children: defaultRoutes,
        meta : { headerType: "default" },
    },

    // 트레이너 사용자
    {
        path: "/trainer",
        component: RouterView,
        children: trainerRoutes,
        meta : { headerType: "trainer" },
    },

    // 관리자 사용자
    {
        path: "/admin",
        component: RouterView,
        children: adminRoutes,
        meta : { headerType: null },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const headerType = to.meta.headerType || "non_member";
    store.commit('setHeaderType', headerType); // 스토어의 뮤테이션 호출

    // 메인페이지 주소를 호출했을때 로그인이 되어 있다면 각자 메인페이지로 리다이렉트
    if (to.path === '/') {
        const role = window.localStorage.getItem('role');
        if (role === 'NORMAL') {
            next('/default/d_home');
            return;
        }
        if (role === 'TRAINER') {
            next('/trainer/pt_home');
            return;
        }
        if (role === 'ADMIN') {
            next('/admin/a_userList');
            return;
        }
    }

    // 'NORMAL' 권한이 필요한 라우트에 대한 접근 제어
    if (to.path.startsWith('/default')) {
        const role = window.localStorage.getItem('role');
        if (role !== 'NORMAL') {
            next('/noAuth'); // 리다이렉트
            return;
        }
    }

    // 'TRAINER' 권한이 필요한 라우트에 대한 접근 제어
    if (to.path.startsWith('/trainer')) {
        const role = window.localStorage.getItem('role');
        if (role !== 'TRAINER') {
            next('/noAuth'); // 리다이렉트
            return;
        }
    }

    // 'ADMIN' 권한이 필요한 라우트에 대한 접근 제어
    if (to.path.startsWith('/admin')) {
        const role = window.localStorage.getItem('role');
        if (role !== 'ADMIN') {
            next('/noAuth'); // 리다이렉트
            return;
        }
    }
    next();
});

export default router;
