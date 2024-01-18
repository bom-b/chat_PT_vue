import a_userList from "@/views/admin/a-userList.vue";
import a_userDetails from "@/views/admin/a-userDetails.vue";
import a_checkFood from "@/views/admin/a-checkFood.vue";
import a_report from "@/views/admin/a-report.vue";
import a_reportDetails from "@/views/admin/a-reportDetails.vue";

const adminRoutes = [
    {path: "/admin/a_userList", component: a_userList},
    {path: "/admin/a_report", component: a_report},

    {
        path: "/admin/a_userDetails/:id",
        name: "a_userDetails",
        component: a_userDetails,
        props: true // `props: true`를 설정하면 `:id` 매개변수가 props로 컴포넌트에 전달됩니다.
      },

      {
        path: "/admin/a-reportDetails/:id",
        name: "a-reportDetails",
        component: a_reportDetails,
        props: true // `props: true`를 설정하면 `:id` 매개변수가 props로 컴포넌트에 전달됩니다.
      },
    {path: "/admin/a_checkFood", component: a_checkFood},
];

export default adminRoutes;