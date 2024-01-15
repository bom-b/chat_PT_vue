<template>
    <div>
        <div v-for="(page, index) in pages" :key="index">
            <!-- 각 페이지 컴포넌트에 이벤트 수신기 등록 -->
            <component :is="page" @page1-data="handlePage1Data"></component>
        </div>
    </div>
</template>
  
<script>
import signUp from "@/views/signup/d_signup/sign_up.vue";
import signUp2 from "@/views/signup/d_signup/sign_up2.vue";
import signUp3 from "@/views/signup/d_signup/sign_up3.vue";
import signUp4 from "@/views/signup/d_signup/sign_up4.vue";

export default {
    methods: {
        handlePage1Data(userData) {
            // userData를 사용하여 부모 컴포넌트에서 원하는 작업 수행
            console.log('받은 데이터:', userData);
        },
    },
    data() {
        return {
            pages: [signUp, signUp2, signUp3, signUp4],
        };
    },
};
</script>
  