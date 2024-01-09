<template>
    <main>
        <div>
            <ul>
                <li v-for="trainer in trainerList" :key="trainer.trainer_id" @click="showDetail(trainer.trainer_id)">
                    {{ trainer.trainer_id }}
                </li>
            </ul>
        </div>

        <!-- 상세 정보 표시 -->
        <div v-if="selectedTrainer">
            <h2>{{ selectedTrainer.trainer_id }} 상세 정보</h2>
            <!-- 상세 정보 표시를 위한 다른 필드들 추가 -->
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            trainerList: [],
            selectedTrainer: null,
        };
    },
    created() {
        this.fetchTrainerList();
    },
    methods: {
        fetchTrainerList() {
            axios
                .get('http://192.168.0.62/springpt/trainerList')
                .then((resp) => {
                    this.trainerList = resp.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showDetail(trainerId) {
            // 클릭한 트레이너의 상세 정보를 가져오기
            axios
                .get(`http://192.168.0.62/springpt/trainers/${trainerId}`)
                .then((resp) => {
                    this.selectedTrainer = resp.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
  
<style></style>
  