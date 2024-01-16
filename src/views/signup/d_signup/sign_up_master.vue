<template>
    <div>
        <signUp1 @signUp1data="userdata1" />
        <signUp2 @signUp2data="userdata2" />
        <signUp3 @signUp3data="userdata3" />
        <signUp4 @signUp4data="userdata4" />
    </div>
</template>
  
<script>
import signUp1 from "@/views/signup/d_signup/sign_up.vue";
import signUp2 from "@/views/signup/d_signup/sign_up2.vue";
import signUp3 from "@/views/signup/d_signup/sign_up3.vue";
import signUp4 from "@/views/signup/d_signup/sign_up4.vue";

export default {
    data() {
        return {
            page1: null,
            page2: null,
            page3: null,
            page4: null,
        };
    },
    components: {
        signUp1,
        signUp2,
        signUp3,
        signUp4,
    },

    methods: {
        userdata1(data1) {
            this.page1 = data1;
        },
        userdata2(data2) {
            this.page1 = data2;
        },
        userdata3(data3) {
            this.page1 = data3;
        },
        userdata4(data4) {
            this.page1 = data4;
        },
    }
}
</script>
  