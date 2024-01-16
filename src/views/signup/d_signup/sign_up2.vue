<script>
export default {
    data() {
        return {
            agreementItems: [
                { text: '내 모습 그대로 당당하게', detail: '사진, 나이, 자기소개를 사실대로 올려 주세요.', checked: false },
                { text: '안전을 최우선으로', detail: '상대방을 잘 모르는 상태에서 개인 정보를 알려주지마세요.', checked: false },
                { text: '매너 있는 대화', detail: 'whswndqkerh tlvdms akszma whswnddmf vygusg', checked: false },
                { text: '개인정보 수집에 동의합니다', detail: '', checked: false },
            ],
            agreeAll: false,
        };
    },
    watch: {
        agreeAll(newValue) {
            this.agreementItems.forEach((item) => {
                item.checked = newValue;
            });
        },
        agreementItems: {
            handler(newItems) {
                this.agreeAll = newItems.every((item) => item.checked);
            },
            deep: true,
        },
    },
    computed: {
        progress() {
            const checkedCount = this.agreementItems.filter((item) => item.checked).length;
            return 25 + (checkedCount * 6.25);
        },
    },
    methods: {
        proceedToNextPage() {
            this.$emit("nextPage");
        }
    },
};
</script>

<template>
    <main class="pt-5">
        <div class="progress fixed-top">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100">
            </div>
        </div>
        <div class="container mt-5 pt-2">
            <h2 class="text-center mb-4">회원가입</h2>
            <div class="signup-container">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(item, index) in agreementItems" :key="index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :id="`agree${index + 1}`"
                                v-model="item.checked">
                            <label class="form-check-label" :for="`agree${index + 1}`">
                                <div class="checkbox-content">
                                    <h3 v-if="index === 0">{{ item.text }}</h3>
                                    <h4 v-else>{{ item.text }}</h4>
                                    <p>{{ item.detail }}</p>
                                </div>
                            </label>
                        </div>
                    </li>
                </ul>
                <div class="form-check mt-3">
                    <input class="form-check-input" type="checkbox" id="agreeAll" v-model="agreeAll">
                    <label class="form-check-label" for="agreeAll">전체 동의</label>
                </div>
            </div>
            <div class="d-grid gap-2 mt-4">
                <!-- "동의함" 버튼 -->
                <button type="button" class="btn btn-success btn-lg" @click="proceedToNextPage"
                    :disabled="!agreementItems.every(item => item.checked)">동의함</button>
            </div>
        </div>
    </main>
</template>
  
<style scoped>
/* 상단 마진 ++*/
.margin-top {
    margin-top: 100px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: px;
}

/* 리스트 앞에 마커 바꾸기*/
li::marker {
    content: '♨';
}
</style>