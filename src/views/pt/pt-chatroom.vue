<template>
  <div
    class="container"
    v-cloak
    style="background-color: #003a2452; height: 690px; border-radius: 30px"
  >
    <div class="row">
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
    };
  },
  created() {
    this.localUserName = localStorage.getItem('name');
    this.findAllRoom();
  },
  computed: {
    filteredChatrooms() {
      return this.chatrooms.filter(item => item.name !== this.localUserName);
    }
  },
  methods: {
    findAllRoom() {
      this.$axios.get("/chat/rooms").then((response) => {
        this.chatrooms = response.data;
      });
    },
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
</style>
