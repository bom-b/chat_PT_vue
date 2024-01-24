<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Autoplay',
    components: {
        Carousel,
        Slide,
        Navigation,
        Pagination,
    },
    data() {
        return {
            rating: [],
            foodList: [],
            foodName: [],
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
                this.foodName.splice(index,1)
                console.log("음식 제거", this.rating);
            } else {
                if (this.rating.length < 5) {
                    this.rating.push(food.FOODNUM);
                    this.foodName.push(food.FOODNAME)
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
                        console.log("취소")
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
});
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
            <Carousel :autoplay="4000" :itemsToShow="3.95" :wrapAround="true" :transition="500">
                <Slide v-for="slide in foodList" :key="slide">
                    <div class="carousel__item">
                        <div class="card" style="width:100%;" @click="selectFood(slide)">
                            <img :src="`${this.$s3BaseURL}/food_main_images/${slide.FOODIMG}`" style="width: 100%;" />

                            <div class="container">
                                <h4><b>{{ slide.FOODNAME }}</b></h4>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>
        <div class="center-container" style="margin-top: 25px;">
        <h2 class="TheJamsil400 pine_Green_text">선택한 음식들</h2>
        </div>
        <div class="center-container">
            <div>         
                <span style="font-size: 1.3rem;">{{ foodName }}</span>
            </div>
            <div class="button-container mt-5">
                <button type="button" class="btn btn-success" @click="proceedToNextPage" :disabled="this.rating.length < 5">
                    완료
                </button>
            </div>
        </div>

    </main>
</template>

<style scoped>
.main {
    margin-top: 100px;
}
.center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
img {
    min-width: 200px !important;
    min-height: 200px !important;
    max-width: 250px !important;
    max-height: 150px !important;
    object-fit: cover !important;
    object-position: center !important;

}

.carousel__slide {
    padding: 5px;
}

.carousel__viewport {
    height: 0px;
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    height: 500px;
    /* 캐러셀 높이와 동일하게 조절 */
    padding: 10px;
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
}

.carousel__item {
    min-height: 200px;
    width: 95%;
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-style: flat;
    /* 3D 변환 비활성화 */
    perspective: none;
    /* perspective 효과 비활성화 */
}

.carousel__item:hover {
    transform: scale(1.03);
    /* 마우스 호버 시 1.1배 확대 */
    opacity: 1;
    /* 마우스 호버 시 투명도 1로 변경 */
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    color: black;
    background: white;
    box-sizing: content-box;
    border: 2px solid white;
}

.profile-cards {
    list-style: none;
    padding: 0;
}

.card2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 요소들 사이에 공간을 균등하게 분배 */
    border-bottom: 1px solid #ccc;
    padding: 10px;
}



.card2 .image-container {
    width: 200px;
    /* 이미지 컨테이너의 너비를 지정합니다. */
    height: 250px;
    /* 이미지 컨테이너의 높이를 지정합니다. */
    overflow: hidden;
    /* 이미지가 넘칠 경우 잘라냅니다. */
    object-position: center;
}

.card2 img {
    width: 100%;
    /* 이미지의 너비를 카드 너비와 동일하게 설정 */
    height: 100%;
    /* 이미지의 높이를 카드 높이와 동일하게 설정 */
    object-fit: cover;
    /* 이미지가 카드의 전체 영역을 채우도록 설정 */
    object-position: center;
    /* 이미지가 카드 중앙에 위치하도록 설정 */
}

.card2 .info .card-title {
    font-size: 1.5em;
    color: #000;
    font-weight: bold;
    text-align: left;
    margin-top: auto;
    position: relative;
    /* Allows absolute positioning of the pseudo-element */
}

.card2 .info .card-title .title-content {
    display: inline-block;
    /* This makes the container only as wide as its content */
    position: relative;
    /* Needed for the positioning of the pseudo-element */
}

.card2 td {
    padding-top: 15px;
    /* 상단 여백을 15px로 설정합니다. */
    padding-bottom: 15px;
    /* 하단 여백을 15px로 설정합니다. */
}
</style>