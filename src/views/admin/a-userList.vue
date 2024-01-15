<style scoped>
#search {
  max-width: 200px;
}

.container {
  font: Awesome 6 Solid;
}

.list-profile {
  width: 80px;
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

#section3 {
  margin-top: 100px;
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

  .solvvy-lazy-button {
    position: fixed;
    z-index: 1900000000;
    bottom: 0px;
    right: 0px;
    width: 60px;
    height: 60px;
    margin: 20px;
    padding: 12px;
    background: #0b5cff;
    border-radius: 26px;
    box-shadow: 0px 0px 18px 3px rgb(0 0 0 / 35%);
    cursor: pointer;
    border: none;
  }
}
</style>

<template>
  <main>
    <div class="container mt-3">
      <h5 class="display-5 text-center" style="margin: 20px">
        사용자(USER) 목록
      </h5>

      <!-- [st]검색상자 -->
      <div>
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="이름을 입력하세요"
          @input="handleSearch"
        />
        <button class="btn">검색</button>

        <div v-for="(item, index) in filteredItems" :key="index">
          <div v-if="filteredItems.length <= 3">
          </div>
        </div>

        <div v-if="!filteredItems.length && searchKeyword.length > 0">
          검색 결과가 없습니다.
        </div>
      </div>
      <!-- [ed]검색상자 -->
  
      <!-- [st] 카테고리 -->
      <div>
        <select v-model="selectedCategory" @change="handleCategoryChange">
          <option disabled value="">카테고리 선택</option>
          <option
            v-for="(category, index) in categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <!-- 선택된 카테고리에 따른 내용 표시 -->
        <div v-if="selectedCategory">
          선택된 카테고리: {{ selectedCategory }}
          <!-- 여기에 해당 카테고리에 맞는 내용을 표시하거나 로직을 수행할 수 있습니다. -->
        </div>
      </div>
      <!-- [ed] 카테고리 -->

      <table class="table transparent-table">
        <thead>
          <tr style="border-bottom: none">
            <th class="col-1"></th>
            <th class="col-5"></th>
            <th class="col-6"></th>
          </tr>
        </thead>
        <tbody style="text-align: left">

          
          <tr v-for="(trainer, index) in filteredItems" :key="index" @click="goToDetailPage(trainer)">

            <th style="padding: 30px 10px"></th>
            <td class="pt-description">
              
              <!-- 유저 표시 -->
              <p class="TheJamsil400 mb-3">아이디 : {{trainer.userid}}  </p>
              <p class="TheJamsil400 mb-3">이름 : {{ trainer.username }}</p>
              <p class="TheJamsil400 mb-3">Role : {{trainer.usertype}} </p>
              <p v-if="trainer.userstatus != null"> {{trainer.userstatus}}</p>
              
            </td>
            <td class="pt-description">
              <!-- 체크박스 라벨과 입력을 넣으셨던 부분으로 유지합니다. -->
              <div class="form-check form-switch"  v-if="trainer.userstatus != null && selectedCategory !='회원' " >
                <label

                class="form-check-label"
                :for="`checkbox${index + 1}`"
                style="margin: 10px"
                >승인</label
                >
                
                <input
  class="form-check-input checkbox1"
  type="checkbox"
  :checked="trainer.userstatus === '승인'"
  :key="trainer.tnum"
  @click="event => event.stopPropagation()"
  @change="updateTrainerRole(trainer, $event)"
/>
              </div>
            </td>
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
      searchKeyword: "",
      items: [], // 검색 대상 항목들
      originalItems: [],
      selectedCategory: "PT선생님(승인X)",
      categories: [
        "회원",
        "PT선생님(승인X)",
        "PT선생님(승인O)",
        "PT선생님(전체)",
      ], // 카테고리 목록
      isLoading: false,
    };
  },
  created() {
    this.fetchData();
    this.fetchData2();
  },
computed: {
  filteredItems() {
    if (!this.searchKeyword) {
      return Array.isArray(this.items) ? this.items : [];
    }
    return Array.isArray(this.items)
      ? this.items.filter(item =>
          item.username.toLowerCase().includes(this.searchKeyword.toLowerCase())
        )
      : [];
  },
},

  methods: {
    handleSearch() {
  if (this.searchKeyword.trim()) {

    this.items = this.originalItems.filter(item =>
      item.username.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  } else {

    this.items = [...this.originalItems];
  }
},

  goToDetailPage(trainer) {
  if (trainer && trainer.userid) {
    console.log(trainer.userid)
    this.$router.push({ name: 'a_userDetails', params: { id: trainer.userid } });
    
  } else {
    console.log("goPage Error");
  }
},

  fetchData2() {
    let url;
    switch (this.selectedCategory) {
      case "회원":
        url = "/allUsers";
        break;
      case "PT선생님(승인X)":
        url = "/getunApplyUsers";
        break;
      case "PT선생님(승인O)":
        url = "/getApplyUsers";
        break;
      case "PT선생님(전체)":
        url = "/allPTusers";
        break;
    }
    this.isLoading = true; // 로딩 시작
    this.$Adminaxios.get(url)
    .then(response => {
      if (Array.isArray(response.data)) {
        this.originalItems = response.data;
        this.items = response.data;
      } else {
        console.error("Expected an array, but got:", response.data);
        // 데이터가 배열이 아니면, 빈 배열로 초기화
        this.originalItems = [];
        this.items = [];
      }
      if (this.searchKeyword) {
        this.handleSearch();
      }
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });

  },
    handleCategoryChange() {
      // 카테고리 변경에 대한 로직 수행
      // 선택된 카테고리에 따른 작업을 수행할 수 있습니다.
      this.fetchData2();

    },

// <script> 태그 내부
updateTrainerRole(trainer, event) 
{
  const newStatus = event.target.checked ? "승인" : "미승인";

  this.$Adminaxios.put(`/updateTrainerStatus/${trainer.tnum}`, { status: newStatus })
    .then(response => {
      console.log("서버 상태 업데이트 성공", response.data);

      // 각 항목의 상태를 업데이트합니다.
      this.items = this.items.map(item => {
        if (item.tnum === trainer.tnum) {
          return { ...item, userstatus: newStatus };
        }
        return item;
      });

      // 선택된 카테고리에 따라 필터링을 다시 적용합니다.
      this.filteredItems = this.filterItemsByCategory(this.selectedCategory);

      // 필요한 경우 추가적인 UI 업데이트를 수행합니다.
    })
    .catch(error => {
      console.error("서버 상태 업데이트 실패", error);
    });
},

filterItemsByCategory(category) {
  if (category === "PT선생님(승인X)") {
    return this.items.filter(item => item.userstatus === "미승인");
  } else if (category === "PT선생님(승인O)") {
    return this.items.filter(item => item.userstatus === "승인");
  } 
  // 다른 카테고리에 대한 조건을 추가합니다.
  return this.items; // 기본적으로 모든 항목을 반환합니다.
},


  fetchData() {
       console.log("axios시작");      
       this.$Adminaxios.get("/getunApplyUsers")
        .then((resp) => {
          console.log("!!!!" + resp);
          this.items = resp.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    href(row) {
      console.log(row);
      // router에 이동할 경로를 등록하기 , 함수가 호출이 되면, index.js에 등록된 라우터로 찾아간다.
      //this.$router.push({name:'DetailView'}) //일반적인 라우터

      // query형식의 라우터 - get방식의 쿼리로 전달.
      //this.$router.push({name:'DetailView', query:row})

      // param형식의 라우터
      // :num/ :name/ :email/
      // this.$router.push({ name: "boardDetail", params: row });
    },
  },
};
</script>