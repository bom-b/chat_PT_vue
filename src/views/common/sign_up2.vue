<template>
    <main>
        <div class="progress fixed-top" style="margin-top: 81px;">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
        <div class="container">
            <h2>회원가입</h2>
            <div class="signup-container">                
                <div>
                    <ul>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree1" v-model="agree1">
                                <label class="form-check-label" for="agree1">
                                    <div class="checkbox-content">
                                        <h3>내 모습 그대로 당당하게</h3>
                                        <p class="no-marker">사진, 나이, 자기소개를 사실대로 올려 주세요.</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree2" v-model="agree2">
                                <label class="form-check-label" for="agree2">
                                    <div class="checkbox-content">
                                        <h4>안전을 최우선으로</h4>
                                        <p>상대방을 잘 모르는 상태에서 개인 정보를 알려주지마세요.</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree3" v-model="agree3">
                                <label class="form-check-label" for="agree3">
                                    <div class="checkbox-content">
                                        <h4>매너 있는 대화</h4>
                                        <p> whswndqkerh tlvdms akszma whswnddmf vygusg</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree4" v-model="agree4">
                                <label class="form-check-label" for="agree4">
                                    <div class="checkbox-content">
                                        <p>개인정보 수집에 동의합니다</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="agreeAll" v-model="agreeAll">
                            <label class="form-check-label" for="agreeAll">전체 동의</label>
                        </div>
                    </li>

                </div>
            </div>
            <div class="button-container">
                <!-- "동의함" 버튼 -->
                <button type="button" class="btn btn-primary" @click="proceedToNextPage"
                    :disabled="!agree1 || !agree2 || !agree3 || !agree4">동의함</button>
            </div>
        </div>
    </main>
</template>
  
<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    margin-top: px;
}

</style>
  
<script>
export default {
    data() {
        return {
            agree1: false,
            agree2: false,
            agree3: false,
            agree4: false,
            agreeAll: false,
        };
    },
    watch: {
        agreeAll(agree) {
            this.agree1 = agree;
            this.agree2 = agree;
            this.agree3 = agree;
            this.agree4 = agree;
        }
    },
    computed: {
        progress() {
            return (this.agree1 && this.agree2 && this.agree3 && this.agree4) ? 50 : 25;
        },
    },
    methods: {
        proceedToNextPage() {
            if (this.agree1 && this.agree2 && this.agree3 && this.agree4) {
                this.$router.push('/sign_up3');
            }
        },
    },
};
</script>