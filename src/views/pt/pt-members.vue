<template>
  <div id="app">
    <div class="m_title">
      <h2>수강회원 관리 페이지</h2>
    </div>
    <vxe-grid border :columns="new_mem" :data="data" show-overflow @checkbox-change="handleCheckboxChange">    
    </vxe-grid>
    <br>
    <div class="m_title">
      <h2>선택한 회원</h2>
    </div>
    <vxe-grid border :columns="selectedColumns" :data="selectedData" show-overflow>
    </vxe-grid>
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
      new_mem: [
        {
          type: "seq",
          title: "번호",
          width: 50,
          fixed: "left",
        },
        {
          type: "checkbox",
          fixed: "center",
          width: 50,
        },
        {
          field: "name",
          title: "이름",
          width: 200,
        },
        {
          field: "age",
          title: "나이",
          width: 200,
        },
        {
          field: "phone",
          title: "전화번호",
          width: 200,
        },
        {
          field: "weight",
          title: "체중",
        },
        {
          field: "goal",
          title:"목표"
        }
      ],
      // 더미 데이터
      data: [
        {
          name: "홍길동",
          age: "18",
          phone: "010-1111-2222",
        },
        {
          name: "김첨지",
          age: "24",
          phone: "010-3333-4444"
        },
        {
          name: "놀부",
          age: "24",
          phone: "010-5555-6666"
        },
      ],
      selectedColumns: [
        {
          type: "seq",
          title: "번호",
          width: 50,
          fixed: "left",
        },
        {
          type: "checkbox",
          fixed: "center",
          width: 50,
        },
        {
          field: "name",
          title: "이름",
          width: 200,
        },
        {
          field: "age",
          title: "나이",
          width: 200,
        },
        {
          field: "phone",
          title: "전화번호",
          width: 200,
        },
        {
          field: "weight",
          title: "체중",
        },
        {
          field: "goal",
          title:"목표"
        }
      ],
      selectedData: [],      
    };
  },
  methods: {
    handleCheckboxChange({ records }) {
      this.selectedData = records.filter((record) => record._XSelection);
    },
    toggleAnswer(index) {
      this.questions[index].open = !this.questions[index].open;
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

.app {
  padding: 20px;
}
</style>