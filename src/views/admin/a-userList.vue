
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
        사용자(USER) 목록
      </h5>

      <!-- [st]검색상자 -->
      <div>
        <input type="text"
          v-model="searchKeyword"
          placeholder="이름을 입력하세요"
          @input="handleSearch"
        />
				<button class="btn">검색</button>

        <div v-for="(item, index) in filteredItems" :key="index">
          <div v-if="filteredItems.length <= 3">
            {{ item }}
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
    <tr v-for="(trainer, index) in filteredItems" :key="index">
      <th style="padding: 30px 10px">
        <!-- 예시 이미지를 사용합니다. -->
        <img
          :src="`../../assets/img/trainer${index % 3 + 1}.jpg`"
          alt=""
          class="list-profile rounded-circle"
          style=""
        />
      </th>
      <td class="pt-description">
        <!-- 트레이너 이름을 표시합니다. -->
        <p class="TheJamsil400 mb-3">{{ trainer }} 트레이너</p>
      </td>
      <td class="pt-description">
        <!-- 체크박스 라벨과 입력을 넣으셨던 부분으로 유지합니다. -->
        <div class="form-check form-switch">
          <label class="form-check-label" :for="`checkbox${index + 1}`"
            >승인 완료</label
          >
          <input
            class="form-check-input checkbox1"
            type="checkbox"
            role="switch"
            :id="`checkbox${index + 1}`"
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
      items: [
        "양승진",
        "김인동",
        "이원영",
        "박효준",
        "이성한",
        "김진원",
        "윤승현",
        "배민섭",
        "김영모",
      ], // 검색 대상 항목들
      selectedCategory: "",
      categories: [
        "회원",
        "PT선생님(승인X)",
        "PT선생님(승인O)",
        "PT선생님(전부)",
      ], // 카테고리 목록
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch() {
      // 검색어 변경에 대한 로직 수행
      // 예: 서버에 검색어를 보내거나, 검색 결과를 업데이트하는 등의 작업
    },
    handleCategoryChange() {
      // 카테고리 변경에 대한 로직 수행
      // 선택된 카테고리에 따른 작업을 수행할 수 있습니다.
    },
  },
};
</script>