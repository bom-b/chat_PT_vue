import Fnd_id from "@/views/common/nonMemberService/find-id-page.vue";
import Fnd_pw from "@/views/common/nonMemberService/find-pw-page.vue";

const adminRoutes = [
    {path: "/service/find_id", component: Fnd_id},
    {path: "//service/find_pw", component: Fnd_pw},
];

export default adminRoutes;