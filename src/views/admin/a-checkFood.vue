
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
        <div class="col-12 col-md-6 text-right">
          <button class="btn btn-primary" @click="handleSendJson">학습시키기</button>
          <button class="btn btn-danger" @click="handleDelete">삭제</button>
        </div>
      </div>

      <table class="table transparent-table mt-3">
        <thead>
          <tr>
            <th class="col-1">
              <input type="checkbox" @change="handleSelectAllChange" v-model="selectAll" />
            </th>
            <th class="col-3">사진</th>
            <th class="col-8">정보</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataRow, index) in filteredItems" :key="dataRow.edit_request_id">
  <td>
    <input
      type="checkbox"
      :id="`checkbox${index + 1}`"
      :value="dataRow.edit_request_id"
      v-model="checkItems"
    />
  </td>
            <td>
              <img
                :src="dataRow.img_edit"
                alt=""
                class="list-profile rounded-circle"
              />
            </td>
            <td class="pt-description">
              <p class="mb-3">수정 요청 ID : {{ dataRow.edit_request_id }}</p>
              <p class="mb-3">업로드 사진 ID : {{ dataRow.up_photo_id }}</p>
              <p class="mb-3">요청 상태 : {{ dataRow.edit_request_status }}</p>
              <p class="mb-3">수정 코멘트 : {{ dataRow.img_editcomment }}</p>
              <p class="mb-3">수정 전 데이터 : {{ dataRow.before_data }}</p>
              <p class="mb-3">수정 후 데이터 : {{ dataRow.after_data }}</p>
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
      categories: ["판독 전", "판독 완료", "전체 리스트"], // 카테고리 목록
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
      return this.items.filter((item) => 
        item.after_data.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    },
  },

  watch: {
    // checkItems 배열을 감시
    checkItems(newVal) {
      // 전체 항목이 선택되어 있는지 확인
      this.selectAll = newVal.length === this.filteredItems.length;
    }
  },

  methods: {
    asdfasdf() {
      this.selectAll = !this.selectAll;
      console.log(this.selectAll);
    },

    handleSelectAllChange() {
    if (this.selectAll) {
      this.checkItems = this.filteredItems.map(item => item.edit_request_id);
    } else {
      this.checkItems = [];
    }
  },

  // 개별 체크박스 변경 처리
  handleCheckboxChange(event) {
    const checkedId = event.target.value;
    if (event.target.checked) {
      this.checkItems.push(checkedId);
    } else {
      this.checkItems = this.checkItems.filter(id => id !== checkedId);
    }

    // 전체 선택 체크박스 상태 업데이트
    this.selectAll = this.checkItems.length === this.filteredItems.length;
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