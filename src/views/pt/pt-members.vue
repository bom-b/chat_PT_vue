<template>
  <div id="app">
    <h1>수강회원 관리 페이지</h1>
    <img src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" alt="Logo" />
    <vxe-grid border :columns="columns" :data="data" show-overflow>
      <template #content="{ row }">
        <div style="border: 1px solid red; overflow: hidden">
          <vxe-table>
            <vxe-table-column title="테스트1"></vxe-table-column>
            <vxe-table-column title="테스트2"></vxe-table-column>
            <vxe-table-column title="테스트3"></vxe-table-column>
          </vxe-table>
        </div>
        <div>
          <button @click="addSelected(row)">선택</button>
        </div>
      </template>
    </vxe-grid>

    <h2>선택한 회원</h2>
    <vxe-grid border :columns="selectedColumns" :data="selectedData" show-overflow></vxe-grid>
  </div>

  <div v-for="(question, index) in questions" :key="index" class="faq">
    <div class="question" @click="toggleAnswer(index)">{{ question.title }}</div>
    <div v-if="question.open" class="answer">{{ question.answer }}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      columns: [
        {
          type: "seq",
          title: "순서",
          width: 50,
          fixed: "left",
        },
        {
          type: "checkbox",
          fixed: "left",
          width: 50,
        },
        {
          title: "펼치기",
          type: "expand",
          slots: { content: "content" },
        },
        {
          field: "name",
          title: "name",
          width: 200,
        },
        {
          field: "age",
          title: "age",
          width: 200,
        },
        {
          field: "전화번호",
          title: "전화번호",
          width: 200,
        },
        {
          field: "주소",
          title: "주소",
          width: 200,
        },
      ],
      data: [
        {
          name: "홍길동",
          age: "18",
        },
        {
          name: "김첨지",
          age: "24",
        },
        {
          name: "놀부",
          age: "24",
        },
      ],
      selectedColumns: [
        {
          type: "seq",
          title: "순서",
          width: 50,
          fixed: "left",
        },
        {
          field: "name",
          title: "name",
          width: 200,
        },
        {
          field: "age",
          title: "age",
          width: 200,
        },
        {
          field: "전화번호",
          title: "전화번호",
          width: 200,
        },
        {
          field: "주소",
          title: "주소",
          width: 200,
        },
        {
          title: "삭제",
          width: 100,
          fixed: "right",
          slots: { default: "deleteBtn" },
        },
      ],
      selectedData: [],
    };
  },
  methods: {
    removeAward(index) {
      this.awards.splice(index, 1);
    },    
    addSelected(row) {
      this.selectedData.push(row);
    },
    deleteSelected(index) {
      this.selectedData.splice(index, 1);
    },
  },
};
</script>

<style>
.faq {
  margin-bottom: 15px;
  cursor: pointer;
}

.answer {
  display: none;
  margin-top: 10px;
}

.answer.open {
  display: block;
}
.vxe-table--empty-content {
  
  display: none !important;
  
}
</style>