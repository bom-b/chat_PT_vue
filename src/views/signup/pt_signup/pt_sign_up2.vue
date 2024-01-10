<template>
    <main>
        <div class="progress fixed-top" style="margin-top: 81px;">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
        <div class="container">
            
            <div class="login-container">
                <h2 class = "mb-4"> 개인정보동의 내역</h2>
                <!-- 개인정보 동의 체크박스 -->
                <div>
                    <ul>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree1" v-model="agree1">
                                <label class="form-check-label" for="agree1">
                                    <h3>내 모습 그대로 당당하게</h3>
                                    <p>사진, 나이, 자기소개를 사실대로 올려 주세요.</p>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree2" v-model="agree2">
                                <label class="form-check-label" for="agree2">
                                    <h4>안전을 최우선으로</h4>
                                    <p>상대방을 잘 모르는 상태에서 개인 정보를 알려주지마세요.</p>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree3" v-model="agree3">
                                <label class="form-check-label" for="agree3">
                                    <h4>매너 있는 대화</h4>
                                    <p> whswndqkerh tlvdms akszma whswnddmf vygusg</p>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="agree4" v-model="agree4">
                                <label class="form-check-label" for="agree4">개인정보 수집에 동의합니다</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="button-container">
                <!-- "동의함" 버튼 -->
                <button type="button" class="btn btn-primary" @click="proceedToNextPage" :disabled="!agree1 || !agree2 || !agree3 || !agree4">동의함</button>
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
        };
    },
    computed: {
        progress() {
            return (this.agree1 &&this.agree2 && this.agree3 && this.agree4 ) ? 50 : 25; // 개인정보 동의가 완료되면 50%의 진행 상태를 나타냅니다.
        },
    },
    methods: {
        proceedToNextPage() {
            if (this.agree1 &&this.agree2 && this.agree3 && this.agree4) {
                this.$router.push('/signUp/pt_sign_up3'); // 이름 입력 페이지로 이동
            }
        },
    },
};
</script>