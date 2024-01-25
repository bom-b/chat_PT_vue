import PT_Home from "@/views/pt/pt-home-page.vue";
import pt_members from "@/views/pt/pt-members.vue";
import pt_schedule from "@/views/pt/pt-schedule.vue";
import pt_profile from "@/views/pt/pt-profile.vue";
import pt_coupon from "@/views/pt/pt-coupon.vue";
import pt_review from "@/views/pt/pt-review.vue";
import pt_chat from "@/views/pt/pt-chat.vue";
import pt_chatroom from "@/views/pt/pt-chatroom.vue";
import PTmember_edit from "@/views/pt/pt-member_edit.vue";


const trainerRoutes = [
    {path: "/trainer/pt_home", component: PT_Home},
    {path: "/trainer/pt_members", component: pt_members},
    {path: "/trainer/pt_schedule", component: pt_schedule},
    {path: "/trainer/pt_profile", component: pt_profile},
    {path: "/trainer/pt_coupon", component: pt_coupon},
    {path: "/trainer/pt_review", component: pt_review},
    {path: "/trainer/pt_chat", component: pt_chat},
    {path: "/trainer/pt_chatroom", component: pt_chatroom},
    { path: "/trainer/pt_member_edit/", component: PTmember_edit },

];

export default trainerRoutes;