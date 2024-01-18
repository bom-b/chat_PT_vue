<template>
    <main>
        <h5 class="display-5 text-center" style="margin: 20px">
          신고 관리
        </h5>
      <div class="container mt-3 main-container">


        <table class="table transparent-table">
          <thead>
            <tr style="border-bottom: none">
              <th class="col-1">신고 번호</th>
              <th class="col-3">신고 제목</th>
              <th class="col-1">신고자</th>
              <th class="col-1">상태</th>
            </tr>
          </thead>
          <tbody style="text-align: left">
            <tr @click="goToDetailPage()">
              <td class="report-td">1</td>
              <td class="report-td" >절 막 욕했어요</td>
              
              <td class="report-td">윤승현</td>
              <td class="report-td">처리상태</td>
            </tr>
          </tbody>        
        </table>
      </div>
    </main>
  </template>

<script>

export default {
  data() {
    return {

       };
 },

 methods:
 {
    goToDetailPage()
    {
        // this.$router.push({ name: 'a_reportDetails'});
    },




 },

}



</script>



<style scoped>
.report-td {
  vertical-align: middle; /* 셀 내용을 중앙에 배치 */
  line-height: normal; /* 셀 내용의 줄 높이를 기본값으로 설정 */
  /* 필요하다면 line-height 값을 조정하여 완벽한 중앙 정렬을 맞출 수 있습니다. */
}

.table {
  width: 80%; /* 테이블 너비를 100%로 설정 */
  table-layout: fixed; /* 테이블의 레이아웃을 고정시키고, 너비가 넘치는 내용은 숨김 처리 */
}

.table th, .table td {
  word-break: break-word; /* 내용이 너무 길면 자동으로 줄바꿈 */
}

.main-container {
  display: flex;
  justify-content: center; /* This will center the child elements (like your table) horizontally */
  align-items: center; /* This will center the child elements vertically, if needed */
  /* Ensure the main container takes up the full width */
  width: 100%;
}

.table {
  margin-left: auto;
  margin-right: auto;
  /* Keep the rest of your styles as is */
}


/* 추가적인 스타일링이 필요할 수 있습니다. */
</style>
