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
            const index = this.rating.indexOf(food.FOODNUM);
            if (index !== -1) {
                this.rating.splice(index, 1);
                console.log("음식 제거", this.rating);
            } else {
                if (this.rating.length < 5) {
                    this.rating.push(food.FOODNUM);
                    console.log("음식 추가", this.rating);
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
                        this.$swal("", "다시 골라주세요.");
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
    <main class="main">
        <div class="progress fixed-top" style="margin-top: 81px;">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="container main">
            <h2>선호하는 음식 선택 (5개 선택 필수)</h2>
            <p>음식 추천을 할 때 도와드려요</p>
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div v-for="(food, index) in foodList" :key="food.foodnum"
                        :class="{ 'carousel-item': true, active: index === 0 }">
                        <img :src="getImagePath(food.FOODIMG)" class="d-block mx-auto w-100" :alt="food.FOODNAME"
                            @click="selectFood(food)">
                        <div class="carousel-caption d-md-block">
                            <h5>{{ food.FOODNAME }}</h5>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div>
            <p>선택한 음식들</p>
            {{ rating }}
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-success" @click="proceedToNextPage" :disabled="this.rating.length < 5">
                완료
            </button>
        </div>
    </main>
</template>

<style scoped>
.main {
    margin-top: 100px;
}

img {
    min-width: 300px !important;
    min-height: 200px !important;
    max-width: 300px !important;
    max-height: 200px !important;
    object-fit: contain !important;
    object-position: center !important;
    border-radius: 20px !important;
}

.carousel-control-prev,
.carousel-control-next {
    /* background-color: green; */
    /* 원하는 색상으로 변경하세요 */
}

.carousel-control-prev-icon {
    background-image: url(../../../assets/img/icon/arrow-left-short.svg);
}

.carousel-control-next-icon {
    background-image: url(../../../assets/img/icon/arrow-right-short.svg);
}
</style>