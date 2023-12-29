<template>
    <main>
        <div class="progress mt-3">
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
                    <li>
                        <label for="allergie">알러지 유무</label>
                        <input type="radio" id="allergyYes" value="yes" v-model="hasAllergy">
                        <label for="allergyYes">예</label>
                        <input type="radio" id="allergyNo" value="no" v-model="hasAllergy">
                        <label for="allergyNo">아니오</label>
                    </li>
                </ul>
            </div>

            <div class="button-container">
                <button type="button" class="btn btn-primary" @click="proceedToNextPage"
                    :disabled="!height || !weight">다음</button>
            </div>
        </div>
    </main>
    <b-toast v-if="showAllergyToast" :auto-hide-delay="5000" no-close-button>
        <div class="d-flex flex-column align-items-center">
            <h6>알러지 종류를 선택하세요:</h6>
            <div class="btn-group mt-3">
                <button v-for="allergy in allergyTypes" :key="allergy" @click="selectAllegy(allergy)"
                    class="btn btn-secondary">{{ allergy }}</button>
            </div>
        </div>
    </b-toast>
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
            allergyTypes: [
                '난류', '우유', '메밀', '땅콩', '대두', '밀', '고등어', '게', '새우',
                '돼지고기', '복숭아', '토마토', '아황산류', '호두', '닭고기', '쇠고기',
                '오징어', '조개류(굴, 전복, 홍합 포함)', '잣'
            ],
            showAllergyToast: false,
        };
    },
    methods: {
        proceedToNextPage() {
            if (this.height && this.weight) {
                if (this.hasAllergy === 'yes') {
                    this.showAllergyToast = true;
                } else {
                    this.$router.push('/next-page');
                }
            } else {
                // 키 또는 몸무게가 입력되지 않았을 때 처리
                alert('키와 몸무게를 입력해주세요!');
            }
        },
        selectAllegy(allergy) {
            // 알러지 종류를 선택한 경우의 처리
            alert(`선택한 알러지 종류: ${allergy}`);
            this.showAllergyToast = false; // 팝업 닫기
            // 다음 페이지로 이동하거나 추가적인 처리를 수행할 수 있습니다.
        },
    },

};
</script>