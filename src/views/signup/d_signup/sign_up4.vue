<script>
export default {
    data() {
        return {
            rating: [],
            foodnum: '',
            foodList: [],
        };
    },
    computed: {
        // progress() {
        //     return () ? 100 : 75; // 개인정보 동의가 완료되면 50%의 진행 상태를 나타냅니다.
        // },
    },
    created() {
        this.getfoodList(); // getfoodList 메소드를 호출하여 음식 리스트를 가져옵니다.
    },
    methods: {
        proceedToNextPage() {
            try {
                const isValid = 1;
                const data = {
                    foodnum: this.foodnum,
                    rating: this.rating
                };
                if (isValid) {
                    this.$emit("nextPage", data);
                } else {
                    this.$swal("유효하지 않은 경로입니다.");
                }
            } catch (e) {
                console.log(e);
            }
        },
        getImagePath(fileName) {
            const basePath = process.env.VUE_APP_API_URL + '/images/foodMainImages/';
            const encodedFileName = encodeURIComponent(fileName);
            return `${basePath}${encodedFileName}`;
        },
        async getfoodList() {
            try {
                const response = await this.$axiosWithoutValidation.get("/signUp/getfoodList");
                this.foodList = response.data;
                console.log("음식 리스트 가져오기", this.foodList);
            } catch (e) {
                console.log("음식 리스트 에러", e);
            }
        },
    },
};
</script>
<template>
    <main>
        <div class="progress fixed-top" style="margin-top: 81px;">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="container">
            <br>
            <h2>선호하는 음식 선택 (5개 선택 필수)</h2>
            <p>음식 추천을 할때 도와드려요</p>
            <div class="input-container">
                <ul>
                    <li v-for="food in foodList" :key="food.foodnum">
                        <img :src="getImagePath(food.FOODIMG)" alt="음식 이미지">
                        <span>{{ food.FOODNAME }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    margin-top: 95px;
}

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

.selected {
    border: 7px solid green;

}
</style>