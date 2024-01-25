
<style scoped>
#search {
  max-width: 200px;
}


.checkboxes-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-left: 15px; /* 필요에 따라 조절 */
}

.checkbox-item {
  margin-bottom: 10px; /* 각 체크박스 사이의 간격 */
}

.list-profile {
  width: 80px;
}

.checkbox-custom {
  transform: scale(1.5); /* 크기 조정 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}

/* 테이블 헤더 및 셀을 위한 스타일 */
.transparent-table th,
.transparent-table td {
  text-align: left; /* 기본적으로 왼쪽 정렬 */
  vertical-align: middle; /* 수직 중앙 정렬 */
  border: none;
}

/* 체크박스 열을 오른쪽 정렬 */
.transparent-table th:last-child,
.transparent-table td:last-child {
  text-align: right; /* 오른쪽 정렬 */
}

/* 이미지 크기 조정 */
.list-profile {
  width: auto; /* 원본 비율 유지 */
  height: 80px; /* 높이 설정 */
  border-radius: 50%; /* 원형 이미지 */
}

.transparent-table {
  background-color: #f8f9f8;
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
      <h5 class="display-5 text-center" style="margin: 20px">수정 데이터 목록</h5>

      <div class="row">
        <div class="col-12 col-md-6">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="이름을 입력하세요"
            @input="handleSearch"
            id="search"
          />
        </div>
        <div class="col-12 col-md-2 text-right">
          <button class="btn btn-primary" @click="handleSendJson">학습시키기</button>
          <button class="btn btn-danger" @click="handleDelete">삭제</button>
        </div>
      </div>

      <table class="table transparent-table mt-3">
        <thead>
          <tr>
            <th class="col-6">업로드 사진</th>
            <th class="col-6">정보</th>
            <th class="col-2">
              <input type="checkbox" @change="handleSelectAllChange" v-model="selectAll" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataRow, index) in filteredSortedItems" :key="dataRow.edit_request_id">
            <td>
              <img
                :src="`${this.$s3BaseURL}/user_upload_food/${dataRow.upphotoid}.jpg`"
                alt=""
                class="list-profile rounded-circle"
                style="width:300px; height:300px;"
              />
            </td>
            <td class="pt-description">
              <p class="mb-3">요청 번호 : {{ dataRow.edit_request_id }}</p>
              <p class="mb-3">요청 아이디: {{ dataRow.nnum }}</p>
              <p class="mb-3">번호: {{ dataRow.upphotoid }}</p>
              <p class="mb-3">코멘트 : {{ dataRow.img_editcomment }}</p>
              <p class="mb-3">수정 전 데이터 : {{ dataRow.before_data }}</p>
              <p class="mb-3">수정 후 데이터 : {{ dataRow.after_data }}</p>
            </td>
              <td>
                <input
                  type="checkbox"
                  :id="`checkbox${index + 1}`"
                  :value="dataRow.edit_request_id"
                  style="width: 50px ; height: 50px; margin: height: 300px; display: flex; align: right;"
                  v-model="checkItems"
                />
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
      selectedCategory: "",
      checkItems: [],
      selectAll: false,
      delTem: "",
    };
  },
  created() {
    this.fetchEditList();
  },
  computed: {
  filteredItems() {
      return this.filteredSortedItems;
    },

    sortedItems() {
      return this.items.slice().sort((a, b) => a.edit_request_id - b.edit_request_id);
    },
    filteredSortedItems() {
      const searchTerm = this.searchKeyword.toLowerCase();
      return this.sortedItems.filter(item => 
        item.img_editcomment && item.img_editcomment.toLowerCase().includes(searchTerm)
      );
    },
  },
watch: {
    // checkItems 배열을 감시
    checkItems(newVal) {
      // 전체 항목이 선택되었는지 확인하여 전체 선택 체크박스 상태 업데이트
      this.selectAll = newVal.length === this.filteredItems.length;
    },
  },

  methods: {
    asdfasdf() {
      this.selectAll = !this.selectAll;
      console.log(this.selectAll);
    },

    handleCheckboxChange(event) {
      const checkedId = event.target.value;
      if (event.target.checked) {
        this.checkItems.push(checkedId);
      } else {
        this.checkItems = this.checkItems.filter(id => id !== checkedId);
      }
      this.selectAll = this.checkItems.length === this.items.length;
    },
    handleSelectAllChange() {
      if (this.selectAll) {
        this.checkItems = this.items.map(item => item.edit_request_id);
      } else {
        this.checkItems = [];
      }
    },
    fetchEditList() {
      this.$Adminaxios.get("/editList")
        .then(resp => {
          console.log(resp.data[0]); // 데이터 구조 확인
          if (resp.data) {
            this.items = resp.data;
            console.log("items : " +  this.items);
          }
        })
        .catch(error => {
          console.error("Error fetching edit list: ", error);
        });
    },

    async handleDelete() {
      if (this.checkItems.length === 0) {
        alert("삭제할 항목을 선택하세요.");
        return;
      }
      try {
        // 삭제할 항목의 ID를 서버로 전송
        await this.$Adminaxios.post("/deleteEditItems", this.checkItems);

        // 체크박스 상태를 초기화
        this.checkItems = [];

        // 전체 선택 체크박스 상태를 초기화
        this.selectAll = false;

        // 데이터 목록을 다시 가져오기
        await this.fetchEditList();
      } catch (error) {
        console.error("Error deleting items: ", error);
        alert("항목 삭제에 실패했습니다.");
      }
    },
    async handleSendJson() {
  if (this.checkItems.length === 0) {
    alert("전송할 목록을 선택해주세요!");
    return;
  }

  try {
    const response = await this.$Adminaxios.post("/sendJsonFile", this.checkItems);
    console.log("보낸 데이터: ", response.data);

    this.$nextTick(() => {
        // 최신 데이터를 다시 불러오기
        this.fetchEditList();
      });

  } catch (error) {
    console.error("데이터 전송 오류: ", error);
    alert("데이터 전송에 실패했습니다.");
  }
},


  },
};
</script>