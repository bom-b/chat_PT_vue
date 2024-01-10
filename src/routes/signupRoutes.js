import Sign_up from "@/views/signup/d_signup/sign_up.vue";
import Sign_up2 from "@/views/signup/d_signup/sign_up2.vue";
import Sign_up3 from "@/views/signup/d_signup/sign_up3.vue";
import Sign_up4 from "@/views/signup/d_signup/sign_up4.vue";
import D_A_joinsuccess from "@/views/common/d-joinsuccess.vue";
import PT_Sign_Up from "@/views/signup/pt_signup/pt_sign_up.vue";
import PT_Sign_Up2 from "@/views/signup/pt_signup/pt_sign_up2.vue";
import PT_Sign_Up3 from "@/views/signup/pt_signup/pt_sign_up3.vue";
import PT_Sign_Finish from "@/views/signup/pt_signup/pt_sign_finish.vue";

const adminRoutes = [
    // 일반 회원가입
    {path: "/signUp/sign_up", component: Sign_up},
    {path: "/signUp/sign_up2", component: Sign_up2},
    {path: "/signUp/sign_up3", component: Sign_up3},
    {path: "/signUp/sign_up4", component: Sign_up4},
    {path: "/signUp/joinsuccess", component: D_A_joinsuccess},

    // pt쌤 회원가입
    {path: "/signUp/pt_sign_up", component: PT_Sign_Up},
    {path: "/signUp/pt_sign_up2", component: PT_Sign_Up2},
    {path: "/signUp/pt_sign_up3", component: PT_Sign_Up3},
    {path: "/signUp/pt_sign_finish", component: PT_Sign_Finish},
];

export default adminRoutes;