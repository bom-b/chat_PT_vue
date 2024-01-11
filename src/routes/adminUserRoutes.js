import a_userList from "@/views/admin/a-userList.vue";
import a_checkFood from "@/views/admin/a-checkFood.vue";

const adminRoutes = [
    {path: "/admin/a_userList", component: a_userList},
    {path: "/admin/a_checkFood", component: a_checkFood},
];

export default adminRoutes;