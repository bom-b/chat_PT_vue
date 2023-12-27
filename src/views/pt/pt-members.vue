<template>
  <div id="app">
    <h1>수강회원 관리 페이지</h1>
    <vxe-grid border :columns="columns" :data="data" show-overflow>
      <template #content>
        <div style="border: 1px solid red; overflow: hidden">
          <vxe-table>
            <vxe-table-column title="테스트1"></vxe-table-column>
            <vxe-table-column title="테스트2"></vxe-table-column>
            <vxe-table-column title="테스트3"></vxe-table-column>
          </vxe-table>
        </div>
      </template>
    </vxe-grid>
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
          slots: {
            content: "content",
          },
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
    };
  },
};
</script>

<style>
</style>
