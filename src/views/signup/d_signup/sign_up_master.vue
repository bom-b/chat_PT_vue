<template>
    <div>
        <component :is="page" v-on:nextPage="nextPage"/>
        <!-- <component v-bind:is="currPage"></component> -->
    </div>
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
            sid: 0,
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
        }
    },
    methods: {
        nextPage() {
            this.currentPageIndex++;
        }
    }
}
</script>
