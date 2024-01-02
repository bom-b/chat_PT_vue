<template>
    <main>
        <div class="progress fixed-top" style="margin-top: 81px;">
			<div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
				aria-valuemin="0" aria-valuemax="100"></div>
		</div>
        <div class="container">
            <h2>키와 몸무게 입력</h2>
            <div class="input-container">
                <ul>
                    <li>
                        <label for="height">키(cm)</label>
                        <input class="form-control" type="number" id="height" v-model="height">
                    </li>
                    <li>
                        <label for="weight">몸무게(kg)</label>
                        <input class='form-control' type="number" id="weight" v-model="weight">
                    </li>
                    
                </ul>
            </div>

            <div class="button-container">
                <button type="button" class="btn btn-primary" @click="proceedToNextPage"
                    :disabled="!height || !weight">다음</button>
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
</style>

<script>
export default {
    data() {
        return {
            height: '',
            weight: '',
            hasAllergy: '',
        };
    },
    methods: {
        proceedToNextPage() {
            if (this.height && this.weight) {

                this.$router.push('/sign_up4');

            } else {
                // 키 또는 몸무게가 입력되지 않았을 때 처리
                alert('키와 몸무게를 입력해주세요!');
            }
        },
    },

};
</script>