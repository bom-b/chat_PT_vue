<template>
  <main>
    <div class="pt-body">
      <section>
        <div class="m_title">
          <h2>예약 관리 페이지</h2>
        </div>
        <h3>예약 신청 회원 목록</h3>
        <vxe-grid
          border
          :columns="new_mem_table"
          :data="new_data"
          show-overflow
          @checkbox-change="selectCheck"
        >
        </vxe-grid>
        <button class="btn btn-primary" @click="agree">PT수락</button>
        <button class="btn btn-primary" @click="agree">삭제</button>
      </section>
      <section>
        <div class="m_title">
          <h2>수락한 회원 목록</h2>
        </div>
        <vxe-grid
          border
          :columns="select_mem_table"
          :data="new_data"
          show-overflow
        >
        </vxe-grid>
        <button class="btn btn-primary" @click="agree">위로 이동</button>
        <button class="btn btn-primary" @click="agree">위로 이동</button>
      </section>
    </div>
  </main>
</template>

<style scoped>
.side-icon {
  position: relative;
  /* right: -75px; */
  transition: transform 300ms;
}

.side .side-icon:hover {
  transform: rotateY(360deg);
  pointer-events: all;
}

.naver {
  position: relative;
  width: 50px;
  height: 50px;
}
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      new_mem_table: [
        { type: "seq", title: "번호", width: 50, fixed: "left" },
        { type: "checkbox", fixed: "center", width: 50 },
        { field: "name", title: "이름", width: 200 },
        { field: "age", title: "나이", width: 200 },
        { field: "phone", title: "전화번호", width: 200 },
        { field: "weight", title: "체중" },
        { field: "goal", title: "목표" },
      ],
      new_data: [
        {
          name: "홍길동",
          age: "18",
          phone: "010-1111-2222",
          weight: 87,
          goal: "다이어트",
        },
        {
          name: "김첨지",
          age: "24",
          phone: "010-3333-4444",
          weight: 66,
          goal: "증량",
        },
        {
          name: "놀부",
          age: "24",
          phone: "010-5555-6666",
          weight: 57,
          goal: "재활",
        },
      ],
      select_mem_table: [
        { type: "seq", title: "번호", width: 50, fixed: "left" },
        { type: "checkbox", fixed: "center", width: 50 },
        { field: "name", title: "이름", width: 200 },
        { field: "age", title: "나이", width: 200 },
        { field: "phone", title: "전화번호", width: 200 },
        { field: "weight", title: "체중" },
        { field: "goal", title: "목표" },
      ],
      select_data: [],
    };
  },
  methods: {
    selectCheck({ records }) {
      this.select_data = records.filter((record) => record._XSelection);
    },
    agree() {
      this.select_data.forEach((record) => {
        const index = this.new_data.indexOf(record);
        if (index !== -1) {
          this.new_data.splice(index, 1);
          this.select_mem_table.push(record);
        }
      });
      this.select_data = []; // 선택한 회원 데이터 초기화
    },
    onScrollAnimation() {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        if (elementPosition < viewportHeight) {
          element.classList.add("active");
        }
      });
    },
  },
  mounted() {
  window.addEventListener('scroll', this.onScrollAnimation);
}
};
</script>

<style scoped>
.m_title {
  margin-top: 20px;
}

.vxe-table--empty-content {
  display: none !important;
}
.button-animation {
  transition: background-color 0.3s, transform 0.3s;
}

.button-animation:hover {
  background-color: #3f232d; /* 네온 색상으로 변경 */
  transform: translateY(-5px); /* 버튼이 살짝 위로 올라감 */
}

.fade-in {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  
}

.btn {
  padding: 10px 20px;
  margin: 16px;
  border: none;
  background-image: linear-gradient(45deg, hsl(150, 69%, 37%), #88d3ce);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn:active,
.btn:focus {
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

</style>
