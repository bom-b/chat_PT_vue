import { createRouter, createWebHistory } from "vue-router";
import store from './store';
/*공통*/
import Login from "./views/common/login-page.vue";
import Test_Login from "./views/common/test-login-page.vue";
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
import D_Upload_Main from "@/views/default/d-upload-main.vue";
import D_Upload_Self from "@/views/default/d-upload-self-method.vue";
import D_Upload_Auto from "@/views/default/d-upload-auto-method.vue";
import D_Upload_Result from "@/views/default/d-upload-result.vue";
import D_overview from "@/views/default/d-overview.vue";
import D_Find_Trainer from "@/views/default/d-find-trainer.vue";
import D_A_Change from "@/views/default/d-a-change.vue";
import D_A_Balance from "@/views/default/d-a-balance.vue";
import D_A_Record from "@/views/default/d-a-record.vue";
import D_A_Recommand from "@/views/default/d-diet-recommand.vue"
import tt from "@/views/default/d-show-trainer-info.vue"

/*PT사용자*/
import PT_Home from "./views/pt/pt-home-page.vue";
import pt_members from "./views/pt/pt-members.vue";
import pt_schedule from "./views/pt/pt-schedule.vue";
import pt_profile from "./views/pt/pt-profile.vue";
import pt_coupon from "./views/pt/pt-coupon.vue";
import pt_review from "./views/pt/pt-review.vue";
import pt_chat from "./views/pt/pt-chat.vue";
import pt_chatroom from "./views/pt/pt-chatroom.vue";
// Admin
import a_userList from "./views/admin/a-userList.vue";
import a_checkFood from "./views/admin/a-checkFood.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // 메인
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
        

        {path: "/sign_up", component:Sign_up, meta: {headerType: 999} },
        {path: "/sign_up2", component:Sign_up2, meta: {headerType: 999}},
        {path: "/sign_up3", component:Sign_up3, meta: {headerType: 999}},
        {path: "/sign_up4", component:Sign_up4, meta: {headerType: 999}},

        // 로그인
        {path: "/login", component: Login, meta: {headerType: 100}},
        {path: "/test_login", component: Test_Login, meta: {headerType: 100}}, // 효준 로그인 테스트

        // 일반 사용자
        {path: "/d_home", component: D_Home, meta: {headerType: 1}},
        {path: "/d_kakao", component: D_Kakao, meta: {headerType: 1}},
        {path: "/d_upload", component: D_Upload, meta: {headerType: 1}},
        {path: "/d_upload_main", component: D_Upload_Main, meta: {headerType: 1}},
        {path: "/d_upload_self", component: D_Upload_Self, meta: {headerType: 1}},
        {path: "/d_upload_auto", component: D_Upload_Auto, meta: {headerType: 1}},
        {path: "/d_upload_result", component: D_Upload_Result, meta: {headerType: 1}},
        {path: "/d_overview", component: D_overview, meta: {headerType: 1}},
        {path: "/d_find_trainer", component: D_Find_Trainer, meta: {headerType: 1}},
        {path: "/d_a_change", component: D_A_Change, meta: {headerType: 1}},
        {path: "/d_a_balance", component: D_A_Balance, meta: {headerType: 1}},
        {path: "/d_recommand", component: D_A_Recommand, meta: {headerType: 1}},
        {path: "/d_a_record", component: D_A_Record, meta: {headerType: 1}},
        {path: "/d_show_trainer_info", component: tt, meta: {headerType: 1}},
        
        //pt
        { path: "/pt_home", component: PT_Home, meta: { headerType: 2 } },
        { path: "/pt_members", component: pt_members, meta: { headerType: 2 } },
        { path: "/pt_schedule", component: pt_schedule, meta: { headerType: 2 } },
        { path: "/pt_profile", component: pt_profile, meta: { headerType: 2 } },
        { path: "/pt_profile", component: pt_profile, meta: { headerType: 2 } },
        {path: "/pt_coupon", component: pt_coupon, meta: {headerType: 2}},
        {path: "/pt_review", component: pt_review, meta: {headerType: 2}},
        {path: "/pt_chat", component: pt_chat, meta: {headerType: 2}},
        {path: "/pt_chatroom", component: pt_chatroom, meta: {headerType: 2}},

        // Admin
        {path: "/a_userList", component: a_userList, meta: {headerType: null}},
        {path: "/a_checkFood", component: a_checkFood, meta: {headerType: null}},

    ],
});
router.beforeEach((to, from, next) => {
    const headerType = to.meta.headerType || 1;
    store.commit('setHeaderType', headerType); // 스토어의 뮤테이션 호출
    next();
});

export default router;
