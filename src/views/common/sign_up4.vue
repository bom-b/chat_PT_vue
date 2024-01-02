<template>
    <main>
        <div class="progress mt-3">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="container">
            <h2>선호하는 음식 선택 (최대 5개 선택 가능)</h2>
            <div class="input-container">
                <ul>
                
                </ul>
            </div>

            <div class="button-container">
                <button type="button" class="btn btn-primary" @click="proceedToNextPage"
                    :disabled="!purpose || !weight">다음</button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.radio-group {
    display: flex;
    flex-direction: column;
}

.radio-group label {
    margin-bottom: 5px;
}
</style>

<script>
export default {
    data() {
        return {
            purpose: '',
            weight: '',
        };
    },
    methods: {
        proceedToNextPage() {
            if (this.purpose && this.weight) {
                // 다음 페이지로 이동하거나 추가적인 처리를 수행할 수 있습니다.
            } else {
                // 목적 또는 몸무게가 입력되지 않았을 때 처리
                alert('목적과 몸무게를 입력해주세요!');
            }
        },
    },
};
</script>