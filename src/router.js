import {createRouter, createWebHistory, RouterView } from "vue-router";
import store from './store';

/*공통*/
import Home from "./views/common/main-home.vue";

/*에러*/
import noAuth from "./views/common/errorPages/noAuth-page.vue";
import noValidity from "./views/common/errorPages/noValidity-page.vue";
import pageNotFound from "./views/common/errorPages/pageNotFound-page.vue";

/*비회원 라우터*/
import nonMemberServiceRoutes from "@/routes/nonMemberServiceRoutes";

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

    // 권한 없음
    {path: "/error/noAuth", component: noAuth, meta: {headerType: "non_member"}},

    // 유효하지 않은 접근
    {path: "/error/noValidity", component: noValidity, meta: {headerType: "non_member"}},

    // 존재하지 않는 페이지
    {path: "/error/pageNotFound", component: pageNotFound, meta: {headerType: "non_member"}},

    // 비회원 서비스
    {
        path: "/service",
        component: RouterView,
        children: nonMemberServiceRoutes,
        meta : { headerType: "non_member" },
    },

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
        meta : { headerType: "admin" },
    },

    // 존재하지 않는 페이지
    {path: "/:pathMatch(.*)*", redirect: '/error/pageNotFound'},
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
            next('/error/noAuth'); // 리다이렉트
            return;
        }
    }

    // 'TRAINER' 권한이 필요한 라우트에 대한 접근 제어
    if (to.path.startsWith('/trainer')) {
        const role = window.localStorage.getItem('role');
        if (role !== 'TRAINER') {
            next('/error/noAuth'); // 리다이렉트
            return;
        }
    }

    // 'ADMIN' 권한이 필요한 라우트에 대한 접근 제어
    if (to.path.startsWith('/admin')) {
        const role = window.localStorage.getItem('role');
        if (role !== 'ADMIN') {
            next('/error/noAuth'); // 리다이렉트
            return;
        }
    }

    // 로그인한 회원의 유효하지 않은 접근 제어
    if (to.path.startsWith('/service') || to.path.startsWith('/signUp')) {
        const role = window.localStorage.getItem('role');
        if (role) {
            next('/error/noValidity'); // 리다이렉트
            return;
        }
    }

    next();
});

export default router;
