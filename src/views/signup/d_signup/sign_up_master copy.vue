<template>
    <main class="main">
        <div>
            <component :is="page" v-on:nextPage="nextPage" />
        </div>
    </main>
</template>
<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { mapState } from "vuex";
import signUp1 from "@/views/signup/d_signup/sign_up1.vue";
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
            serverReturn: 0,
            serverimageReturn: 0
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
        nextPage: async function (pagesdata) {
            this.userdata = { ...this.userdata, ...pagesdata };
            console.log(this.userdata);

            if (this.currentPageIndex == 4) {
                await this.completeSignUp();
            }

            if (this.currentPageIndex < this.pages.length) {
                this.currentPageIndex++;
            }
        },
        async completeSignUp() {
            try {
                let data = this.userdata;
                let jsonData = JSON.stringify(data);
                let imageFile = this.userdata.nm_profileimg;
                await this.$axiosWithoutValidation.post("/signUp/completeSignUp", jsonData)
                    .then(async response => {
                        this.serverReturn = response.data;
                        console.log("*********" + this.serverReturn);
                        if (this.serverReturn > 0) {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'center-center',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            await Toast.fire({
                                icon: 'success',
                                title: '회원가입이 완료되었습니다. 잠시후 로그인 페이지로 이동합니다.'
                            });
                            this.$router.push('/service/login');
                        } else {
                            this.$swal("", "경로이상", "warning");
                        }
                        let formData = new FormData();
                        formData.append('image', imageFile);
                        await this.$axiosWithoutValidation.post("/s3upload", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }).then(imageResponse => {
                            this.serverimageReturn = imageResponse.data;
                            if (this.serverimageReturn > 0) {
                                console.log("이미지 aws에 저장");
                            }
                        }).catch(imageError => {
                            console.error("이미지 업로드 에러", imageError);
                        });
                    })
                    .catch(e => {
                        console.error("부모에러", e);
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>
<style>
.main {
    margin-top: 90px;
}
</style>
