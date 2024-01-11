<template>
  <main>
    <div class="container" v-cloak>
      <div class="row">
        <div class="col-md-12">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="room_name"
          @keyup.enter="createRoom"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="createRoom">
            채팅방 개설
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item list-group-item-action"
          v-for="item in chatrooms"
          :key="item.roomId"
          @click="enterRoom(item.roomId)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script>


export default {
  data() {
    return {
      room_name: "",
      chatrooms: [],
    };
  },
  created() {
    this.findAllRoom();
  },
  methods: {
    findAllRoom() {
      axios.get("http://localhost/springpt/chat/rooms").then((response) => {
        this.chatrooms = response.data;
      });
    },
    createRoom() {
      if (this.room_name === "") {
        alert("방 제목을 입력해 주십시요.");
        return;
      }
      var params = new URLSearchParams();
      params.append("name", this.room_name);
      axios
        .post("http://localhost/springpt/chat/room", params)
        .then((response) => {
          alert(response.data.name + "방 개설에 성공하였습니다.");
          this.room_name = "";
          this.findAllRoom();
        })
        .catch(() => {
          // 'response' 매개변수 제거
          alert("채팅방 개설에 실패하였습니다.");
        });
    },

    enterRoom(roomId) {
      var sender = prompt("대화명을 입력해 주세요.");
      if (sender !== "") {
        localStorage.setItem("wschat.sender", sender);
        localStorage.setItem("wschat.roomId", roomId);
        //window.location.href = `/chat/room/enter/${roomId}`;
        window.location.href = `http://localhost:8081/pt_chat`;
      //}
      }
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>