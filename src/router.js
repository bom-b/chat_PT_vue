import { createRouter, createWebHistory } from "vue-router";
import Login from "./views/common/login-page.vue";
import D_Home from "./views/defualt/d_home-page.vue";
import D_About from "./views/defualt/d_about-page.vue";
import PT_Home from "./views/pt/pt-home-page.vue";


const router = new createRouter({
    history: createWebHistory(),
    routes: [
        {path:"/",component: Login},
        {path:"/d_home",component: D_Home},
        {path:"/d_about",component: D_About},
        {path:"/pt_home",component: PT_Home},
    ]
})

export default router;