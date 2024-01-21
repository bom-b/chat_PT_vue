<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
    data() {
        return {
            rating: [],
            foodList: [],

        };
    },
    computed: {
        progress() {
            return (this.rating.length >= 5) ? 100 : 75;
        },
    },
    created() {
        this.getfoodList();
    },
    methods: {
        selectFood(food) {
            this.rating = Array.from(this.rating);
            if (this.rating.includes(food.FOODNUM)) {
                this.rating = this.rating.filter(num => num !== food.FOODNUM);
                console.log("셀렉푸드if", this.rating);
            } else {
                if (this.rating.length < 5) {
                    this.rating.push(food.FOODNUM);
                    console.log(this.rating)
                } else {
                    this.$swal("", "5개의 음식 이미지만 선택할 수 있습니다.", "warning");
                }
            }
        },
        async proceedToNextPage() {
            try {
                const isValid = 1;
                const data = {
                    rating: this.rating
                };
                // let jsonData = JSON.stringify(data);
                // console.log(jsonData);
                // console.log(typeof (jsonData));
                if (isValid) {
                    const signup = await Swal.fire({
                        title: "",
                        text: "가입하시겠습니까?",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                    })
                    if (signup.isConfirmed) {
                        this.$emit("nextPage", data);
                    } else {
                        this.$swal("", "잘못된 접근입니다.");
                    }
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
            <p>음식 추천을 할 때 도와드려요</p>
            <div class="input-container">
                <ul class="list-group">
                    <li v-for="food in foodList" :key="food.foodnum"
                        :class="{ 'list-group-item': true, selected: rating.includes(food.foodnum), row: true }"
                        @click="selectFood(food)">
                        <div class="d-flex align-items-center">
                            <div class="food-image-wrapper">
                                <img :src="getImagePath(food.FOODIMG)" alt="음식 이미지">
                            </div>
                            <span class="ml-3">{{ food.FOODNAME }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-success" @click="proceedToNextPage" :disabled="this.rating.length < 5">
                완료
            </button>
        </div>
    </main>
</template>

<style scoped>
li {
    list-style-type: none;
    position: relative;
    padding-left: 30px;
}

li img {
    width: 200px;
    height: 150px;
    object-fit: contain;
    object-position: center;
}

.food-image-wrapper {
    overflow: hidden;
    width: 250px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

.list-group-item {
    border: none;
    cursor: pointer;
}

.list-group-item:hover {
    background-color: #f8f9fa;
}

.selected {
    background-color: gray;
}

.selected-food {
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
}
</style>