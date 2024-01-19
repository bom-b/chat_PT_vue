<template>
    <main class="main">
        <div>
            <component :is="page" v-on:nextPage="nextPage" />
        </div>
    </main>
</template>
<script>
import { mapState } from "vuex";
import signUp1 from "@/views/signup/d_signup/sign_up.vue";
import signUp2 from "@/views/signup/d_signup/sign_up2.vue";
import signUp3 from "@/views/signup/d_signup/sign_up3.vue";
import signUp4 from "@/views/signup/d_signup/sign_up4.vue";
export default {
    components: {
        signUp1,
        signUp2,
        signUp3,
        signUp4,
    },
    data() {
        return {
            pages: ['signUp1', 'signUp2', 'signUp3', 'signUp4'],
            currentPageIndex: 1,
            userdata: {},
            serverReturn: 0
        };
    },
    computed: {
        ...mapState(['page']),
        page() {
            if (this.currentPageIndex == 1) {
                return signUp1;
            } else if (this.currentPageIndex == 2) {
                return signUp2;
            } else if (this.currentPageIndex == 3) {
                return signUp3;
            } else if (this.currentPageIndex == 4) {
                return signUp4;
            }
            return signUp1;
        },

    },
    methods: {
        nextPage(pagesdata) {
            if (this.currentPageIndex == this.pages.length) {
                return this.completeSignup;
            }
            this.currentPageIndex++;
            this.userdata = { ...this.userdata, ...pagesdata };
            console.log(this.userdata);

            if (this.currentPageIndex == this.pages.length) {
                this.completeSignup();
            }
        },
        async completeSignUp() {
            await this.$axiosWithoutValidation.post("/signUp/completeSignUp", this.userdata)
                .then(response => {
                    this.serverReturn = response.data;
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }
}
</script>
<style>
.main {
    margin-top: 90px;
}
</style>
