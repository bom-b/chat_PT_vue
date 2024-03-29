<template>
  <main style="user-select: none">
    <section id="hero" class="hero d-flex align-items-center section-bg">
      <div class="col-12" style="max-width: 1600px; margin: 0 auto;">
        <p data-aos="fade-in" data-aos-duration="1000" class="TheJamsil400" id="hero-title">간편하게 이용하는 식단관리
          솔루션,<br>Chat PT</p>
        <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="100" class="" id="hero-sub"
           style="color: #727070;">
          회원의 식단관리를 대신 해줄 사람이 필요한 당신에게
          <br>
          식단 관리 솔루션을 제공합니다.
        </p>
      </div>
    </section>
    <!-- End Hero Section -->

    <div class="col-12 green" style="height: 40px; margin-bottom: 0"></div>

    <div
      class="info-container p-4 my-4 d-flex align-items-center justify-content-between bg-light border rounded"
      style="
        width: 890px;
        margin: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 그림자 추가 */
      "
    >
      <div class="info-icon mr-3">
        <img
          :src="getImageUrl('배경지운 로고.png')"
          alt="Info Icon"
          style="height: 100px; margin: auto"
        />
      </div>
      <div class="image-hover-container info-text flex-grow-1">
        <h4 class="mb-2" style="margin-top: 30px">오늘 식단 요약</h4>

        <p style="margin-top: 30px">
          관리 회원들의 식단을 <br />
          확인 할 수 있습니다.
        </p>

        <div class="image-hover-item">
          <img
            src="../../assets/img/분류_식단모름card.png"
            alt="식단모름"
            class="image-hover-img"
          />
          <div class="image-hover-text">식단등록 X</div>
        </div>

        <div class="image-hover-item">
          <img
            src="../../assets/img/분류_적정량card.png"
            alt="적정량"
            class="image-hover-img"
          />
          <div class="image-hover-text">적정량</div>
        </div>

        <div class="image-hover-item">
          <img
            src="../../assets/img/분류_과식card.png"
            alt="과식"
            class="image-hover-img"
          />
          <div class="image-hover-text">과식</div>
        </div>
      </div>
    </div>

    <!-- 로딩 스피너 -->
    <div
      v-if="isLoading"
      class="d-flex justify-content-center"
      style="height: 150px; border: 60px; margin: 80px; color: #085c5652"
    >
      <div class="spinner-border" role="status">
        <span class="sr-only"> Loading...</span>
      </div>
    </div>

    <section class="card-grid" style="width: 650px; margin: auto">
      <div class="card" v-for="(user, index) in live_data" :key="index">
        <div
          class="card-header"
          :style="{
            backgroundImage: 'url(' + getImageUrl(user.backgroundImage) + ')',
          }"
        ></div>
        <!-- :src="getImageUrl(user.nm_PROFILEIMG)" -->
        <img
          :src="`${this.$s3BaseURL}/normal_user/profile_img/${user.nm_PROFILEIMG}`"
          class="card-profile-img"
          alt="Profile Image"
        />

        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p>현재 먹은 칼로리 : {{ user.dailyTotalCal }}</p>
          <p>추천 칼로리 : {{ user.recommandCal }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
  
  
<script>
export default {
  name: "PtHomePage",
  data() {
    return {
      wait_data: [], // PT 상담 예약 리스트 데이터
      live_data: [], // PT 수강중인 회원 목록 데이터
      users: [],
      isLoading: true, // 데이터 로딩 상태
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    // 'live' 상태인 데이터만 필터링
    liveDataFiltered() {
      return this.live_data.filter((item) => item.status === "live");
    },
  },

  methods: {
    fetchData() {
      this.$axios
        .get("/pthandleAll2")
        .then((response) => {
          console.log(response.data);
          this.live_data = response.data
            .filter((item) => item.status === "live")
            .map(this.transformData);
          this.wait_data = response.data
            .filter((item) => item.status === "wait")
            .map(this.transformData);
          this.isLoading = false; // 로딩 완료
        })
        .catch((error) => {
          console.error("There was an error fetching the data:", error);
          this.isLoading = false; // 에러 발생 시 로딩 완료
        });
    },
    transformData(item) {
      // 추천 ~ 먹은 칼로리에 따른 이미지
      let backgroundImage;
      if (item.dailyTotal === null) {
        backgroundImage = "분류_식단모름card.png";
      } else if (
        Number(item.dailyTotal.dailyTotalCal).toFixed(2) < item.recommandCal
      ) {
        backgroundImage = "분류_적정량card.png";
      } else {
        backgroundImage = "분류_과식card.png";
      }

      return {
        name: item.name,
        gender: item.gender,
        age: this.calculateAge(item.birth),
        ptstart: this.formatDate(item.ptstart),
        ptend: this.formatDate(item.ptend),
        height: item.height + " cm",
        target_WEIGHT: item.target_WEIGHT + " kg",
        weight: item.weight + " kg",
        goal: this.purposeToText(item.purpose), // 목표를 텍스트로 변환
        userid: item.userid,
        dailyTotalCal: item.dailyTotal
          ? Number(item.dailyTotal.dailyTotalCal).toFixed(2)
          : "없음",
        dailyTotalTan: item.dailyTotal
          ? Number(item.dailyTotal.dailyTotalTan).toFixed(2)
          : null,
        dailyTotalDan: item.dailyTotal
          ? Number(item.dailyTotal.dailyTotalDan).toFixed(2)
          : null,
        dailyTotalGi: item.dailyTotal
          ? Number(item.dailyTotal.dailyTotalGi).toFixed(2)
          : null,

        recommandTan:
          item.recommandTan != null ? item.recommandTan.toFixed(2) : "",
        recommandDan:
          item.recommandDan != null ? item.recommandDan.toFixed(2) : "",
        recommandGi:
          item.recommandGi != null ? item.recommandGi.toFixed(2) : "",
        recommandCal:
          item.recommandCal != null ? item.recommandCal.toFixed(2) : "",
        nm_PROFILEIMG: item.nm_PROFILEIMG,
        backgroundImage,
        // 다른 필요한 필드 변환        // 필요한 추가적인 필드 변환
      };
    },
    purposeToText(purpose) {
      switch (purpose) {
        case 0:
          return "다이어트";
        case 1:
          return "체중유지";
        case 2:
          return "벌크업";
        default:
          return "알 수 없음"; // 기본값 처리
      }
    },
    calculateAge(birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    },
    formatDate(dateStr) {
      if (!dateStr) return ""; // 날짜가 없는경우 빈 문자열을 반환
      const date = new Date(dateStr);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
    // 이미지 경로를 위함
    getImageUrl(path) {
      return require("@/assets/img/" + path);
    },
  },
};

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});
</script>


<style scoped>
.chart-section {
  width: 100%; /* 부모 컨테이너의 100% 너비를 사용 */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 20px; /* 차트 사이의 간격 조정 (필요에 따라 조절) */
  padding: 10px; /* 차트 섹션의 외부 여백 */
}

.chart-container {
  width: 60%; /* 컨테이너 전체 너비로 설정 */
  max-width: 300px; /* 차트의 최대 너비 지정 (필요에 따라 조절) */
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.select_button_menu {
  border: none;
  background-color: white;
}

.container {
  width: 100%;
  margin: 0 auto;
}

.title {
  text-align: center;
}

.qna-list {
  list-style-type: none;
  padding: 0;
}

.qna-item {
  margin-bottom: 10px;
}
</style>

<style scoped>
li {
  list-style: non; /* list 생성시 나오는 '-' 마크 제거 */
}
a {
  color: inherit; /* 글자 색생은 부모로부터 상속 */
  text-decoration: none;
}

head {
  display: none;
}
body {
  display: block;
}
.card_plale {
  width: 700px;
  height: 500px;
  margin: 100px auto;

  box-shadow: 3px 3px 50px #e6e6e6;
  /* box-shadow: 1px 1px 10px #000; */
  /* box-shadow: offset x y blur color; */
  /* offset x:는 얼마나, y:는 얼마나 blur:흐림정도는 얼마나 color:색은 어떤걸로*/

  border-radius: 20px;
  position: center; /* 상대적인 값 */
}

.card-header {
  padding: 20px;
  text-align: center;
}
.card-header h1 {
  font-size: 30px;
  font-weight: 600;
}
.card-body {
  padding: 20px;
  text-align: center;
}
.card-body input[type="search"] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #999;
  border-radius: 10px;
  width: 300px;
  font-size: 16px;
}
.card-body a.search {
  padding: 10px 15px 10px 15px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: tomato;
  color: #fff;
}
.card-body div {
  margin-top: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.card-body div div {
  display: inline-block;
  padding: 15px 10px 15px 10px;
  margin: 0;
  border: none;
}

.card-body .check,
.delete {
  width: 5%;
}
.card-body .title {
  width: 70%;
  text-align: left;
}
.card-body .delete button {
  background-color: #fff;
  border: none;
}
.number {
  padding: 10px;
}

.number li {
  display: inline-block;
}

.number li a {
  display: block;
  width: 40px;
  /* text-align이 위로 올라간다 */
  line-height: 40px;
  border-radius: 10px;
  margin: 3px;
  margin-top: 20px;
  box-shadow: 0 5px 10px #f1f1f1;
}

.number li a.active {
  background-color: rgb(13, 179, 115);
}

.btn {
  /* position: absolute; 는 절대적인 값으로 상대적인 값이 필요하다. */
  /* 상대적인 값은 전체 영역을 담당하는 class="card"에 position: relative; 을 추가한다. */
  position: absolute; /* 절대적인 값 */
  right: 0;
  bottom: 0;
  padding: 10px;
  margin: 10px 10px 20px 10px;
}

.btn a {
  padding: 10px;
  background-color: tomato;
  color: #fff;
  border-radius: 10px;
}
</style>
<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 그리드 */
  grid-gap: 20px;
  padding: 20px;
  overflow-y: auto;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-header {
  position: relative;
  height: 150px; /* 배경 이미지의 높이 */
  background-size: cover;
  background-position: center;
}

.card-profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* 원형으로 만들기 */
  position: absolute;
  top: 100px; /* 조정하여 적절한 위치에 배치 */
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid #fff; /* 배경과 구분되도록 테두리 추가 */
}

.card-body {
  padding: 60px 15px 15px; /* 프로필 이미지와 겹치지 않도록 상단 패딩 조정 */
  text-align: center;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(1, 1fr); /* 모바일에서는 1열 그리드 */
  }
  .card {
    width: 70%;
  }
}
</style>

<style scoped>
.image-hover-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.image-hover-item {
  position: relative;
  display: inline-block;
}

.image-hover-img {
  height: 120px;
  transition: opacity 0.3s;
}

.image-hover-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000000;
  font-weight: bold;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-hover-item:hover .image-hover-img {
  opacity: 0.3;
}

.image-hover-item:hover .image-hover-text {
  opacity: 1;
}
</style>

<style lang="scss" scoped>
#hero {
  height: 350px;
  background-image: url('../../../public/assets/img/background/3-2.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  //background-attachment: fixed; /* 스크롤을 내려도 이미지는 고정 */
  color: white; /* 텍스트 색상을 설정하세요 (배경 이미지에 대한 대비를 높이기 위해) */
  text-align: left;

  #hero-title {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1.5rem;
  }

  #hero-sub {
    white-space: nowrap;
    margin: 1vw;
    font-size: 1rem;
    text-decoration: none;
  }
}

@media (max-width: 768px) {
  #hero {
    height: 300px;
    padding: 0 20px;

    // 글자크기 작게
    #hero-title {
      white-space: nowrap;
      margin: 1vw;
      font-size: 1.3rem;
    }

    #hero-sub {
      white-space: nowrap;
      margin: 3vw 1vw 1vw;
      font-size: 1rem;
      text-decoration: none;
    }
  }
}
</style>