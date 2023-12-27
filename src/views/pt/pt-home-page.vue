<template>
  <div class="body">
    <h1> 관리할 회원을 추가해주세요.</h1>
    <ul>
      <li v-for="member in memList" :key="member">
        {{ member.name }}: {{ member.phoneNumber }}
      </li>
    </ul>
  </div>
</template>
<script>
export default ({
  data() {
    return {
      memList: [
        { name: '홍길동', phoneNumber: '010-1234-5678' },
        { name: '김첨지', phoneNumber: '010-9876-5432' },
        { name: '놀부', phoneNumber: '010-5555-5555' }
      ]
    }
  },
  components: {
  }
})
</script>

<style>
.body {
  padding: 20px;
}

</style>