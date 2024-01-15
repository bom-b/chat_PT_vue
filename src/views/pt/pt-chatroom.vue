<template>
    <div class="container" v-cloak style="background-color: #003a2452; height: 690px; border-radius: 30px;" >
      <div class="row">
        <div class="col-md-12" style="margin-top: 30px;">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">회원 이름</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="room_name"
          @keyup.enter="createRoom"
        />
        
      </div>
      <ul class="list-group">
        <li
          class="list-group-item list-group-item-action"
          v-for="item in chatrooms"
          :key="item.roomId"
          @click="enterRoom(item.roomId)"
        >
          {{ item.roomId }}
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
    };
  },
  created() {
    this.findAllRoom();
  },
  methods: {
    findAllRoom() {
      this.$axios.get("/chat/rooms").then((response) => {
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

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      this.$axios
        .post("/chat/room", params, config)
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
        
        this.$emit('change-component', 'NextComponentName'); // 이벤트 발송
//window.location.href = `/trainer/pt_chat`;
      //}
      }
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.list-group-item{
  background-color: #5482354f;
  color: #f3f3f3;
  border:0px;
}
</style>