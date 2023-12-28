<template>
  <main id="main" class="">
  <analyze_header/>
  <div style="width: 50%; margin: 0 auto;">
  <div >
    <button type="button" class="btn btn-dark-gray">{{ formattedStartDate }} ~ {{ formattedEndDate }}</button>
    <button type="button" class="btn bold" @click="moveWeek(-1)">&lt;</button>
    <button type="button" class="btn bold" @click="moveWeek(1)">&gt;</button>
  </div>
  <div>
    <img src="../../assets/img/영양소.png" alt="영양소 그래프 이미지">
  </div>
  </div>
  </main>
</template>

<style scoped>
.btn-dark-gray {
  background-color: #343a40; /* 진한 회색 */
  color: white; /* 글씨 색상을 흰색으로 설정 */
  font-weight: bold; /* 글씨 굵게 */
}
.bold {
  font-weight: bold; /* 글씨를 굵게 */
  font-size: 1.2em; /* 폰트 크기를 조금 더 크게 */
  padding: 5px 10px; /* 버튼 내부 여백을 조절 */
  margin: 0 5px; /* 버튼 사이의 간격 */
}

</style>



<script>
import analyze_header from '@/components/header/d-analyze.vue';

export default {
  components: {
    analyze_header,
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  created() {
    this.setWeekRange();
  },
  methods: {
    setWeekRange() {

      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 6);
      this.startDate = new Date(currentDate);
      this.endDate = new Date();
    },
    moveWeek(weeks) {
      let newStartDate = new Date(this.startDate.getTime());
      let newEndDate = new Date(this.endDate.getTime());

      newStartDate.setDate(newStartDate.getDate() + weeks * 7);
      newEndDate.setDate(newEndDate.getDate() + weeks * 7);

      if (weeks > 0 && newEndDate > new Date()) {
        return; // 미래로 가지 않음
      }

      this.startDate = newStartDate;
      this.endDate = newEndDate;
    },
    formatDate(date) {
      return date.toISOString().substring(0, 10).replace(/-/g, '/');
    },
  },
  computed: {
    formattedStartDate() {
      return this.formatDate(this.startDate);
    },
    formattedEndDate() {
      return this.formatDate(this.endDate);
    },
  },
};
</script>
