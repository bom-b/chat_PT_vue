<template>
  <div
    class="container"
    v-cloak
    style="background-color: #003a2452; height: 690px; border-radius: 30px"
  >
    <!-- 로딩 스피너 -->

    <div v-if="isLoading" style="display: flex;   justify-content: center;   align-items: center;  height: 100%; color: #c6e0e2;" >
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">chatroom Loading...</span>
          <!-- 실제 보이지는 않지만  -->
        </div>
      </div>

    </div>

    <div v-else class="row">
      <div class="col-md-12" style="margin-top: 30px">
        <h3>PT 회원 채팅 리스트</h3>
      </div>
    </div>
    <div class="input-group" style="margin: 10px">
      <div class="input-group-prepend"></div>
      <div>
        <input
          type="text"
          class="form-control"
          v-model="room_name"
          placeholder="회원 이름"
        />
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item list-group-item-action"
        v-for="item in filteredChatrooms"
        :key="item.roomId"
        @click="enterRoom(item.roomId)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room_name: "",
      chatrooms: [],
      localUserName: "", // localStorage에서 가져온 사용자 이름을 저장할 속성
      isLoading: false, // 데이터 로딩 상태
    };
  },
  created() {
    this.localUserName = localStorage.getItem("name");
    this.findAllRoom();
  },
  computed: {
    filteredChatrooms() {
      return this.chatrooms.filter((item) => item.name !== this.localUserName);
    },
  },
  methods: {
    findAllRoom() {
      this.isLoading = true; // 로딩 시작
      this.$axios
        .get("/chat/rooms")
        .then((response) => {
          this.chatrooms = response.data;
          this.isLoading = false; // 로딩 완료
        })
        .catch(() => {
          this.isLoading = false; // 에러 발생 시 로딩 완료
        });
    },
    // 나머지 메소드
    enterRoom(roomId) {
      localStorage.setItem("wschat.roomId", roomId);

      this.$emit("change-component", "NextComponentName");
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.list-group-item {
  background-color: #5482354f;
  color: #070606;
  border: 0px;
  height: 65px;
  box-shadow: 0, 0, 0, 0.6;
}

/* 회원이름 라벨 */
.input-group-text {
  margin-right: 10px;
}

/* 입력창 */
.form-control {
  background-color: #f4fdf34d;
  border: 0px;
  width: 160px;
  border-radius: 60px;
}
.form-control:hover {
  background-color: #f3f3f3;
}

/* 스피너스타일 설정 */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 컨테이너 높이에 맞춤 */
  color: #50832e07;
}

.spinner-border {
  width: 3rem; /* 스피너 크기 조절 */
  height: 3rem; /* 스피너 크기 조절 */
  border-width: 0.8rem; /* 테두리 굵기 조절 */
  color: #50832e07; /* 채팅방 색상에 맞는 색상 */

  }
</style>
