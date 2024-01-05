
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
          

          <div v-for="(item, index) in filteredItems" :key="index">
            <div v-if="filteredItems.length <= 3">
              {{ item }}
            </div>
          </div>

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
          <div v-if="selectedCategory">
            선택된 카테고리: {{ selectedCategory }}
            <!-- 해당 카테고리에 맞는 내용 표시 또는 로직 수행 -->
          </div>
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
                  :value="checked"
                />
              </div>
            </td>
            <th style="padding: 30px 10px">
              <div>{{ dataRow[4] }}</div>
              <img
                :src="`../../assets/img/trainer${dataRow[4]}.jpg`"
                alt=""
                class="list-profile rounded-circle"
              />
            </th>
            <td class="pt-description">
              <!-- 데이터 항목 표시 -->
              <div
                v-for="(item, dataIndex) in dataRow.slice(
                  0,
                  dataRow.length - 1
                )"
                :key="dataIndex"
                class="TheJamsil400 mb-3"
              >
                {{ getColumnName(dataIndex) }} : {{ item }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 수정 데이터 목록 테이블 끝 -->
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "",
      items: [
        ["바톤빵", "벽돌", "user01", "2023-04-13", "바톤빵.jpg"],
        ["해물 된장찌개", "김치찌개", "user01", "2023-04-13", "된장.jpg"],
        ["삼겹살", "버섯", "user02", "2023-04-12", "삼겹살.png"],
        ["과자", "옥수수", "user02", "2023-04-11", "새우깡.png"],
      ], // 검색 대상 항목들
      selectedCategory: "",
      categories: ["판독 전", "판독 완료", "전체 리스트"], // 카테고리 목록
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.some((data) =>
          data.toLowerCase().includes(this.searchKeyword.toLowerCase())
        )
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
  },
};
</script>