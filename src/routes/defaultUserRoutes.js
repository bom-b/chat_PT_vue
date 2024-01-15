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
import D_A_Change_Calory from "@/views/default/d-a-change_calories.vue";
import D_A_Change_weight from "@/views/default/d-a-change_weight.vue";
import D_A_Balance from "@/views/default/d-a-balance.vue";
import D_A_Record from "@/views/default/d-a-record.vue";
import D_A_Recommand from "@/views/default/d-diet-recommand.vue"
import D_T_Detail from "@/views/default/d-trainer-detail.vue"

const defaultRoutes = [
    { path: "/default/d_home", component: D_Home },
    { path: "/default/d_kakao", component: D_Kakao },
    { path: "/default/d_upload", component: D_Upload },
    { path: "/default/d_upload_main", component: D_Upload_Main },
    { path: "/default/d_upload_self", component: D_Upload_Self },
    { path: "/default/d_upload_auto", component: D_Upload_Auto },
    { path: "/default/d_upload_result", component: D_Upload_Result },
    { path: "/default/d_overview", component: D_overview },
    { path: "/default/d_find_trainer", component: D_Find_Trainer },
    { path: "/default/d_a_change_calory", component: D_A_Change_Calory },
    { path: "/default/d_a_change_weight", component: D_A_Change_weight },
    { path: "/default/d_a_balance", component: D_A_Balance },
    { path: "/default/d_recommand", component: D_A_Recommand },
    { path: "/default/d_a_record", component: D_A_Record },
    { path: "/default/d_trainer_detail/:id", component: D_T_Detail },
];

export default defaultRoutes;