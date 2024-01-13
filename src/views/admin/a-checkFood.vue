
<style scoped>
#search {
  max-width: 200px;
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

.pt-description {
  padding: 30px 10px;
  padding-left: 50px;
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
}
</style>

<template>
  <main>
    <div class="container mt-3">
      <h5 class="display-5 text-center" style="margin: 20px">
        수정 데이터 목록
      </h5>

      <div class="row">
        <!-- 검색 상자 -->
        <div class="col-3">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="이름을 입력하세요"
            @input="handleSearch"
          />
          <div v-if="!filteredItems.length && searchKeyword.length > 0">
            검색 결과가 없습니다.
          </div>
        </div>
        <!-- 검색 상자 끝 -->

        <!-- 카테고리 선택 -->
        <div class="col-3">
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
        </div>
        <!-- 카테고리 선택 끝 -->
        <button class="col-2">학습시키기</button>
        <button class="col-2">삭제</button>
      </div>

      <!-- 수정 데이터 목록 테이블 -->
      <table class="table transparent-table">
        <thead>
          <tr style="border-bottom: none">
            <th class="col-1"></th>
            <th class="col-3"></th>
            <th class="col-8"></th>
          </tr>
        </thead>
        <tbody style="text-align: left">
          <tr v-for="(dataRow, index) in filteredItems" :key="index">
            <td class="pt-description">
              <div class="form-check form-checked">
                <input
                  class="form-check-input checkbox1"
                  type="checkbox"
                  role="switch"
                  :id="`checkbox${index + 1}`"
                />
              </div>
            </td>
            <th style="padding: 30px 10px">
              <img
                :src="dataRow.img_edit"
                alt=""
                class="list-profile rounded-circle"
              />
            </th>
            <td class="pt-description">
              <p class="TheJamsil400 mb-3">수정 요청 ID : {{ dataRow.edit_request_id }}</p>
              <p class="TheJamsil400 mb-3">업로드 사진 ID : {{ dataRow.up_photo_id }}</p>
              <p class="TheJamsil400 mb-3">요청 상태 : {{ dataRow.edit_request_status }}</p>
              <p class="TheJamsil400 mb-3">수정 코멘트 : {{ dataRow.img_editcomment }}</p>
              <p class="TheJamsil400 mb-3">수정 전 데이터 : {{ dataRow.before_data }}</p>
              <p class="TheJamsil400 mb-3">수정 후 데이터 : {{ dataRow.after_data }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 수정 데이터 목록 테이블 끝 -->
    </div>
  </main>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchKeyword: "",
      items: [], // 검색 대상 항목들
      selectedCategory: "",
      categories: ["판독 전", "판독 완료", "전체 리스트"], // 카테고리 목록
    };
  },
  created() {
    this.fetchEditList();
  },
  computed: {
  filteredItems() {
    return this.items.filter((item) => 
      item.after_data.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  },
},
  methods: {
    handleSearch() {
      // 검색어 변경에 대한 로직 수행
    },
    handleCategoryChange() {
      // 카테고리 변경에 대한 로직 수행
    },
    getColumnName(index) {
      // 각 열의 데이터에 대한 컬럼명 반환 로직
      const columnNames = [
        "수정 요청 내용(음식이름)",
        "수정 전 내용(음식이름)",
        "수정한 회원",
        "수정한 날짜",
      ];
      return columnNames[index];
    },
    fetchEditList() {
  axios.get("http://localhost/springpt/editList")
    .then(resp => {
      console.log(resp.data[0]); // 데이터 구조 확인
      this.items = resp.data;
      console.log("items : " +  this.items)
    })
    .catch(error => {
      console.error("Error fetching edit list: ", error);
    });
},




  },
};
</script>