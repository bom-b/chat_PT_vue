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
import signUp1 from "@/views/signup/pt_signup/pt_sign_up.vue";
import signUp1_kakao from "@/views/signup/pt_signup/pt_sign_up_kakao.vue";
import signUp2 from "@/views/signup/pt_signup/pt_sign_up2.vue";
import signUp3 from "@/views/signup/pt_signup/pt_sign_up3.vue";
export default {
    components: {
        signUp1,
        signUp1_kakao,
        signUp2,
        signUp3,
    },
    data() {
        return {
            pages: ['signUp1', 'signUp2', 'signUp3'],
            currentPageIndex: 1,
            userdata: {},
            serverReturn: 0,
        };
    },
    computed: {
        ...mapState(['page']),
        page() {
            if (this.currentPageIndex == 1) {
              if (window.localStorage.getItem('newKakaoUserData')) {
                return signUp1_kakao;
              } else {
                return signUp1;
              }
            } else if (this.currentPageIndex == 2) {
                return signUp2;
            } else if (this.currentPageIndex == 3) {
                return signUp3;
            }
            return signUp1;
        },

    },
    methods: {
        nextPage: async function (pagesdata) {
            this.userdata = { ...this.userdata, ...pagesdata };
            console.log(this.userdata);

            if (this.currentPageIndex == 3) {
                await this.completeSignUp();
            }

            if (this.currentPageIndex < this.pages.length) {
                this.currentPageIndex++;
            }
        },
        async completeSignUp() {
          const formData = new FormData();
            try {
                for (const key in this.userdata) {
                    const value = this.userdata[key];
                    if (value instanceof File) {
                        // 파일인 경우
                        this.form1Data.append(key, value);
                    } else if (Array.isArray(value)) {
                        // 배열인 경우
                        for (let i = 0; i < value.length; i++) {
                            formData.append(`${key}[${i}]`, value[i]);
                            console.log("key : " + `${key}[${i}]`);
                            console.log("value : " + value[i]);
                        }
                    } else {
                        // 일반 데이터인 경우
                        formData.append(key, value);
                      console.log("key : " + key);
                      console.log("value : " + value);
                    }
                }
              // formData의 모든 키-값 쌍을 순회하여 콘솔에 출력
              for (let [key, value] of formData.entries()) {
                console.log(key, value);
              }
                await this.$axiosWithoutValidation.post("/signUp/PTcompleteSignUp", formData)
                    .then(async response => {
                        this.serverReturn = response.data;
                        console.log("*********" + this.serverReturn);
                        if (this.serverReturn > 0) {
                            // 로컬스토리지에 있는 카카오 정보 삭제 (카카오 회원가입을 통해 들어온 경우.)
                            window.localStorage.removeItem('newKakaoUserData');
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
                                title: '회원가입이 완료되었습니다. 잠시후 로그인 페이지로 이동합니다.',
                                content: '관리자의 승인이 필요합니다.'


                            });
                            this.$router.push('/service/login');
                        } else {
                            this.$swal("", "경로이상", "warning");
                        }
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
<style scoped>
.main {
    margin-top: 90px;
}
</style>
