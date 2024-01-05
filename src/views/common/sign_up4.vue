<template>
    <main>
        <div class="progress fixed-top" style="margin-top: 81px;">
            <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress"
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="container">
            <h2>선호하는 음식 선택 (5개 선택 필수)</h2>
            <p>음식 추천을 할때 도와드려요</p>
            <div class="input-container">
                <table>
                    <tr>
                        <td>
                            <img src="../../assets/img/don.jpeg" :class="{ selected: isSelected('don') }"
                                @click="toggleImageSelection('don')">
                        </td>
                        <td>
                            <img src="../../assets/img/chicken.jpeg" :class="{ selected: isSelected('chicken') }"
                                @click="toggleImageSelection('chicken')">
                        </td>
                        <td>
                            <img src="../../assets/img/fork.jpeg" :class="{ selected: isSelected('fork') }"
                                @click="toggleImageSelection('fork')">
                        </td>
                        <td>
                            <img src="../../assets/img/pizza.jpeg" :class="{ selected: isSelected('pizza') }"
                                @click="toggleImageSelection('pizza')">
                        </td>
                        <td>
                            <img src="../../assets/img/tang.jpeg" :class="{ selected: isSelected('tang') }"
                                @click="toggleImageSelection('tang')">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="../../assets/img/don.jpeg" :class="{ selected: isSelected('don1') }"
                                @click="toggleImageSelection('don1')">
                        </td>
                        <td>
                            <img src="../../assets/img/chicken.jpeg" :class="{ selected: isSelected('chicken1') }"
                                @click="toggleImageSelection('chicken1')">
                        </td>
                        <td>
                            <img src="../../assets/img/fork.jpeg" :class="{ selected: isSelected('fork1') }"
                                @click="toggleImageSelection('fork1')">
                        </td>
                        <td>
                            <img src="../../assets/img/pizza.jpeg" :class="{ selected: isSelected('pizza1') }"
                                @click="toggleImageSelection('pizza1')">
                        </td>
                        <td>
                            <img src="../../assets/img/tang.jpeg" :class="{ selected: isSelected('tang1') }"
                                @click="toggleImageSelection('tang1')">
                        </td>
                    </tr>
                </table>
            </div>

            <div class="button-container">
                <button type="button" class="btn btn-primary" @click="proceedToNextPage"
                    :disabled="selectedImages.length !== 5">다음</button>
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

.selected {
    border: 7px solid green;

}
</style>

<script>
export default {
    data() {
        return {
            selectedImages: [],
        };
    },
    computed: {
        progress() {
            return (this.selectedImages.length == 5) ? 100 : 75; // 개인정보 동의가 완료되면 50%의 진행 상태를 나타냅니다.
        },
    },
    methods: {
        proceedToNextPage() {
            if (this.selectedImages.length == 5) {
                this.$router.push('/joinsuccess'); // 이름 입력 페이지로 이동
            } else {
                alert('이미지를 선택해주세요');
            }
        },
        toggleImageSelection(image) {
            if (this.selectedImages.includes(image)) {
                this.selectedImages = this.selectedImages.filter(img => img !== image);
            } else {
                if (this.selectedImages.length < 5) {
                    this.selectedImages.push(image);
                } else {
                    alert('최대 5개의 이미지를 선택할 수 있습니다!');
                }
            }
        },
        isSelected(image) {
            return this.selectedImages.includes(image);
        },

    },

};
</script>
