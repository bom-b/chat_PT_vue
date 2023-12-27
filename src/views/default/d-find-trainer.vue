<script setup>

</script>

<template>
  <main>

    <!--  지역설정  -->
    <section>
      <div class="section1800" style="padding: 4vw;">
        <div class="border-b border-gray-200 pb-4">
          <h5 class="text-2xl font-semibold" style="text-align: left;">▼ 강남구 서초동</h5>
          <hr class="my-4" style="border-width: 3px; border-color: #085c57;">
        </div>
        <div class="flex" style="text-align: right">
          <input placeholder="이름으로 검색" id="search" class="border border-gray rounded py-2" type="text"/>
          <button class="" style="margin-left: 10px;">검색</button>
        </div>
      </div>
    </section>

    <!--이달의 베스트 트레이너-->
    <section style="background: #FFFFFF">
      <div class="best-trainer-icon-container section1800" style="padding: 4vw;">
        <div >
          <h4 class="text-xl mb-5" style="text-align: left;">이달의 베스트 트레이너</h4>
          <div class="row no-gutters" style="text-align: left;">
            <div class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center" style="max-width: 220px;">
              <img src="../../assets/img/trainer1.jpg" alt="" class="best-profile rounded-circle mb-2"
                   style="text-align: center;">
              <p class="">강남구 서초동</p>
              <p class="TheJamsil400">현우진</p>
            </div>
            <div class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center" style="max-width: 220px;">
              <img src="../../assets/img/trainer3.jpg" alt="" class="best-profile rounded-circle mb-2"
                   style="text-align: center;">
              <p class="">강남구 서초동</p>
              <p class="TheJamsil400">현우진</p>
            </div>
            <div class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center" style="max-width: 220px;">
              <img src="../../assets/img/trainer2.jpg" alt="" class="best-profile rounded-circle mb-2"
                   style="text-align: center;">
              <p class="">강남구 서초동</p>
              <p class="TheJamsil400">현우진</p>
            </div>
            <div class="best-trainer-icon col-lg-3 col-md-6 col-sm-6 text-center" style="max-width: 220px;">
              <img src="../../assets/img/trainer1.jpg" alt="" class="best-profile rounded-circle mb-2"
                   style="text-align: center;">
              <p class="">강남구 서초동</p>
              <p class="TheJamsil400">현우진</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--근무하시는 트레이너 분들이에요.-->
    <section id="section3">
      <div class="section1800" style="padding: 4vw;">
        <h4 class="text-xl mb-2" style="text-align: left;"><strong>강남구 서초동</strong>에서</h4>
        <h4 class="text-xl mb-4" style="text-align: left;">근무하시는 트레이너 분들이에요.</h4>
        <hr class="mb-3" style="border-width: 3px; border-color: #085c57;">
        <p class="mb-5" style="text-align: right;">▼ 인기순</p>
        <div class="mt-4" style="text-align: left;">
          <table class="table transparent-table">
            <thead>
            <tr style="border-bottom: none;">
              <th class="col-1"></th>
              <th class="col-11"></th>
            </tr>
            </thead>
            <tbody style="text-align: left;">
            <tr>
              <th style="padding: 30px 10px;">
                <img src="../../assets/img/trainer3.jpg" alt="" class="list-profile rounded-circle" style="">
              </th>
              <td class="pt-description">
                <p class="TheJamsil400 mb-3">양승진 트레이너</p>
                <p class="">최선을 다해서 PT 해드리겠습니다.</p>
              </td>
            </tr>
            <tr>
              <th style="padding: 30px 10px;">
                <img src="../../assets/img/trainer3.jpg" alt="" class="list-profile rounded-circle" style="">
              </th>
              <td class="pt-description">
                <p class="TheJamsil400">김인동 트레이너</p>
                <p class="">당신의 아름다움이 시작되는 곳에 늘 제가 함께할게요.</p>
              </td>
            </tr>
            <tr>
              <th style="padding: 30px 10px;">
                <img src="../../assets/img/trainer3.jpg" alt="" class="list-profile rounded-circle" style="">
              </th>
              <td class="pt-description">
                <p class="TheJamsil400">이원영 트레이너</p>
                <p class="">단 한사람만의 감성을 더 해드리는 이원영입니다. </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
#search {
  max-width: 200px;
}

.list-profile {
  width: 120px;
}

.best-profile {
  width: 150px;
}

.transparent-table {
  background-color: #f8f9f8;
  border: none;
}

.transparent-table th,
.transparent-table td {
  border: none;
}

.transparent-table tr {
  border-bottom: 1px solid #ddd; /* 원하는 색상 및 두께로 조절 가능 */
}

.pt-description {
  padding: 30px 10px;
  padding-left: 50px;
}

/* 모바일 환경에서의 스타일 적용 */
@media (max-width: 768px) {
  .best-trainer-icon-container {
    text-align: center;
    margin: auto;
  }

  .best-trainer-icon {
    width: 170px;
    margin-bottom: 30px;
  }

  .best-profile {
    width: 100px;
  }

  #search {
    max-width: 150px;
    margin-bottom: 30px;
  }

.pt-description {
  padding: 30px 0px;
  padding-left: 20px;
}

  #section3 {
    margin-top: 50px;
  }
}
</style>

