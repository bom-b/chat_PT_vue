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
        progress() {
            return (this.rating.length) ? 100 : 75; // 개인정보 동의가 완료되면 50%의 진행 상태를 나타냅니다.
        },
    },
    created() {
        this.getfoodList(); // getfoodList 메소드를 호출하여 음식 리스트를 가져옵니다.
    },
    methods: {
        selectFood(food) {
            if (this.rating.includes(food.foodnum)) {
                // 이미 선택된 이미지인 경우 선택을 해제합니다.
                this.rating = this.rating.filter(num => num !== food.foodnum);
            } else {
                // 선택되지 않은 이미지인 경우 선택을 추가합니다.
                if (this.rating.length < 5) {
                    this.rating.push(food.foodnum);
                } else {
                    // 이미 5개의 이미지를 선택한 경우 추가적인 선택은 불가능합니다.
                    this.$swal("5개의 음식 이미지만 선택할 수 있습니다.");
                }
            }
        },
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
                    <li v-for="food in foodList" :key="food.foodnum" :class="{ selected: rating.includes(food.foodnum) }">
                        <img :src="getImagePath(food.FOODIMG)" alt="음식 이미지">
                        <span>{{ food.FOODNAME }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>


<style scoped>
.selected {
    border: 7px solid green;
}

li {
    list-style-type: none;
    position: relative;
    padding-left: 30px;
}

li img {
    width: 250px;
    height: 250px;
    object-fit: contain;
    object-position: center;
}

li::before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    width: 20px;
    /* 원하는 너비로 설정 */
    height: 20px;
    /* 원하는 높이로 설정 */
    background-image: url('../../../assets/img/gif/loading.gif');
    background-size: cover;
    /* 이미지가 요소를 완전히 덮도록 설정, 필요에 따라 'contain'으로 변경 가능 */
    background-repeat: no-repeat;
    /* 이미지가 반복되지 않도록 설정 */
    background-position: center;
    /* 이미지가 요소의 중앙에 위치하도록 설정 */
}
</style>
