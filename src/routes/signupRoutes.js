import Sign_up_main from "@/views/signup/sign_up_main.vue";
import kakao_sign_up_main from "@/views/signup/kakao_sign_up_main.vue";

// import Sign_up from "@/views/signup/d_signup/sign_up1.vue";
// import Sign_up2 from "@/views/signup/d_signup/sign_up2.vue";
// import Sign_up3 from "@/views/signup/d_signup/sign_up3.vue";
// import Sign_up4 from "@/views/signup/d_signup/sign_up4.vue";


import Sign_up_master from "@/views/signup/d_signup/sign_up_master.vue";

import PT_Sign_Up from "@/views/signup/pt_signup/pt_sign_up.vue";
import PT_Sign_Up2 from "@/views/signup/pt_signup/pt_sign_up2.vue";
import PT_Sign_Up3 from "@/views/signup/pt_signup/pt_sign_up3.vue";
import PT_Sign_up_master from "@/views/signup/pt_signup/pt_sign_up_master.vue";

const adminRoutes = [
    ////회원가입 메인
    {path: "/signUp/sign_up_main", component: Sign_up_main},

    //// 카카오 회원가입 메인
    {path: "/signUp/kakao_sign_up_main", component: kakao_sign_up_main},

    // 일반 회원가입
    {path: "/signUp/sign_up", component:Sign_up_master},
    {path: "/signUp/sign_up1", component: Sign_up},
    {path: "/signUp/sign_up2", component: Sign_up2},
    {path: "/signUp/sign_up3", component: Sign_up3},
    {path: "/signUp/sign_up4", component: Sign_up4},

    // pt쌤 회원가입
    {path: "/signUp/pt_sign_up", component: PT_Sign_up_master},
    {path: "/signUp/pt_sign_up1", component: PT_Sign_Up},
    {path: "/signUp/pt_sign_up2", component: PT_Sign_Up2},
    {path: "/signUp/pt_sign_up3", component: PT_Sign_Up3},

];

export default adminRoutes;