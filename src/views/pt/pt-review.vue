<template>
    <main>
      <section id="section1800">
        <div class="card-container">
          <!-- Card -->
          <div class="card">
            <div style="margin: 0 auto;">
              <img src="https://dthezntil550i.cloudfront.net/a2/latest/a22009061456022380001356010/1280_960/9604617d-7b75-454b-93ed-b198681e2de2.png" class="card-img-top" alt="1" />
            </div>
            <div class="card-body">
              <h5 class="card-title">프로필</h5>
            </div>
          </div>
          <div class="col-12 green" style="height: 50px; margin-bottom: 0;"></div>
  
          <!-- Announcements Section -->
          <section>
            <div class="card card_plale">
              <div class="card-header">
                <div class="faq-tab">
                  <a class="faq-tab-item active">리뷰 게시판</a>
                  <!-- additional tabs as needed -->
                </div>
              </div>
              <div class="card-body">
                <!-- 게시물 리스트 -->
                <div class="content-box" @click="gotoReviewDetails(item)" v-for="item in paginatedData" :key="item.id">
                  <div class="title">{{ item.title }}</div>
                </div>
  
                <!-- 페이징 컨트롤 -->
            
              </div>

              <ul class="number">
                  <li><a href="#" @click.prevent="prevPage">&lt;</a></li>
                  <li v-for="page in totalPages" :key="page">
                    <a href="#" @click.prevent="changePage(page)" :class="{ 'active': currentPage === page }">
                        {{ page }}</a>
                  </li>
                  <li><a href="#" @click.prevent="nextPage">&gt;</a></li>
                </ul>
            </div>
          </section>
        </div>
      </section>
    </main>
  </template>
  
  <script>


  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 5, // 페이지당 게시물 수
        dataList: 
        [   { id: 1, title: "리뷰 제목 1" },
            { id: 2, title: "리뷰 제목 2" },
            { id: 3, title: "리뷰 제목 3" },
            { id: 4, title: "리뷰 제목 4" },
            { id: 5, title: "리뷰 제목 5" },
            { id: 6, title: "리뷰 제목 6" },
            { id: 7, title: "리뷰 제목 7" },
            { id: 8, title: "리뷰 제목 8" },
            { id: 9, title: "리뷰 제목 9" },
            { id: 10, title: "리뷰 제목 10" },
            { id: 11, title: "리뷰 제목 11" },
            { id: 12, title: "리뷰 제목 12" },   ] // 여기에 게시물 데이터를 로드합니다
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.dataList.length / this.pageSize);
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.dataList.slice(start, end);
      }
    },
    methods: {
      changePage(page) {
        this.currentPage = page;
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() 
      {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      gotoReviewDetails()
      {
        this.$Authaxios.get();
      }
    },
    mounted() {
      // 이곳에서 dataList에 데이터를 로드하거나 API 호출을 수행합니다.
      // 예: this.dataList = fetchYourData();
    }
  };
  </script>
    
    
<style scoped>
.card {
  width: 15rem; /* 너비 조정 */
  height: auto; /* 높이를 자동으로 설정하여 내용에 맞춤 */
  /* 기존의 스타일 유지 */
  background-color: #fff;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}


.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  border: none;
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
  
  .card-body .check ,.delete {
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
  margin: 10px 10px 20px 10px ;
  }
  
  .btn a {
  padding: 10px;
  background-color: tomato;
  color: #fff;
  border-radius: 10px;
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
.card {
    background-color: #fff;
    border-radius: 10px;
    border: none;
    position: relative;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #085c57) !important;
    color: #fff;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #085c57) !important;
    color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 100px;
}

.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: -5px;
    top: 10px;
    margin: auto;
    opacity: 0.1;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}
    </style>