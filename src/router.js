import { createRouter, createWebHistory } from "vue-router";
import store from './store';
/*공통*/
import Login from "./views/common/login-page.vue";
import Home from "./views/common/main-home.vue";

/*일반회원 가입*/ 
import Sign_up from "@/views/common/sign_up.vue";
import Sign_up2 from "@/views/common/sign_up2.vue";
import Sign_up3 from "@/views/common/sign_up3.vue";
import Sign_up4 from "@/views/common/sign_up4.vue";
import D_A_joinsuccess from "@/views/common/d-joinsuccess.vue";

/*PT쌤 회원가입*/
import PT_Sign_Up from "@/views/pt/pt_sign_up.vue";
import PT_Sign_Up2 from "@/views/pt/pt_sign_up2.vue";
import PT_Sign_Up3 from "@/views/pt/pt_sign_up3.vue";
import PT_Sign_Finish from "@/views/pt/pt_sign_finish.vue";
/*일반사용자*/
import D_Home from "@/views/default/d-home-page.vue";
import D_Kakao from "@/views/default/d-kakao.vue";
import D_Upload from "@/views/default/d-upload.vue";
import D_overview from "@/views/default/d-overview.vue";
import D_Find_Trainer from "@/views/default/d-find-trainer.vue";
import D_A_Change from "@/views/default/d-a-change.vue";
import D_A_Balance from "@/views/default/d-a-balance.vue";
import D_A_Record from "@/views/default/d-a-record.vue";
import D_A_Recommand from "@/views/default/d-diet-recommand.vue"


/*PT사용자*/
import PT_Home from "./views/pt/pt-home-page.vue";
import pt_members from "./views/pt/pt-members.vue";
import pt_schedule from "./views/pt/pt-schedule.vue";
import pt_profile from "./views/pt/pt-profile.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Home, meta: { headerType: -1 } },

        // 일반 회원가입
        { path: "/sign_up", component: Sign_up, meta: { headerType: 100 } },
        { path: "/sign_up2", component: Sign_up2, meta: { headerType: 100 } },
        { path: "/sign_up3", component: Sign_up3, meta: { headerType: 100 } },
        { path: "/sign_up4", component: Sign_up4, meta: { headerType: 100 } },
        { path: "/joinsuccess", component: D_A_joinsuccess, meta: { headerType: 100} },

        // pt쌤 회원가입
        { path: "/pt_sign_up", component: PT_Sign_Up, meta: { headerType: 100 } },
        { path: "/pt_sign_up2", component: PT_Sign_Up2, meta: { headerType: 100 } },
        { path: "/pt_sign_up3", component: PT_Sign_Up3, meta: { headerType: 100 } },
        { path: "/pt_sign_finish", component: PT_Sign_Finish, meta: { headerType: 100 } },
        // 로그인
        { path: "/login", component: Login, meta: { headerType: 100 } },

        // 일반 사용자
        { path: "/d_home", component: D_Home, meta: { headerType: 1 } },
        { path: "/d_kakao", component: D_Kakao, meta: { headerType: 1 } },
        { path: "/d_upload", component: D_Upload, meta: { headerType: 1 } },
        { path: "/d_overview", component: D_overview, meta: { headerType: 1 } },
        { path: "/d_find_trainer", component: D_Find_Trainer, meta: { headerType: 1 } },
        { path: "/d_a_change", component: D_A_Change, meta: { headerType: 1 } },
        { path: "/d_a_balance", component: D_A_Balance, meta: { headerType: 1 } },
        { path: "/d_recommand", component: D_A_Recommand, meta: { headerType: 1 } },
        { path: "/d_a_record", component: D_A_Record, meta: { headerType: 1 } },


        //pt
        { path: "/pt_home", component: PT_Home, meta: { headerType: 2 } },
        { path: "/pt_members", component: pt_members, meta: { headerType: 2 } },
        { path: "/pt_schedule", component: pt_schedule, meta: { headerType: 2 } },
        { path: "/pt_profile", component: pt_profile, meta: { headerType: 2 } },
        { path: "/pt_profile", component: pt_profile, meta: { headerType: 2 } },
    ],
});
router.beforeEach((to, from, next) => {
    const headerType = to.meta.headerType || 1;
    store.commit('setHeaderType', headerType); // 스토어의 뮤테이션 호출
    next();
});

export default router;
