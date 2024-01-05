<template>
    <div>
      <div class="col-12 green" style="height: 80px; margin-bottom: 0;"></div>
      <div>
        <h1>쿠폰 관리</h1>
        <div class="col-12 green" style="height: 10px; margin-bottom: 0;"></div>
  
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn" style="background-color: aquamarine;">쿠폰생성</button>
        </div>
  
        <table class="table table-striped" style="">
          <thead>
            <tr>
              <th>번호</th>
              <th>쿠폰명</th>
              <th>만료날짜</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in couponData" :key="index">
              <td>{{ value.num }}</td>
              <td>{{ value.cname }}</td>
              <td>{{ value.cdate }}</td>
              <td>
            <button v-if="value.cstate === '진행중'"
                style="border-radius: 100px; background-color: black; color: white;">
                {{ value.cstate }}
            </button>
            <button
                v-else
                style="border-radius: 100px; background-color: gray; color: white;"
            >
                {{ value.cstate }}
  </button>
</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="col-12 green" style="height: 80px; margin-bottom: 0;"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        couponData: [
          { num: 1, cname: '쿠폰1', cdate: '2024-01-10', cstate: '진행중' },
          { num: 2, cname: '쿠폰2', cdate: '2024-01-15', cstate: '종료됨' },
          // Add more dummy data as needed
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your styles go here */
  </style>
  