<template>
    <div class="container" v-cloak style="background-color: #003a2452; height: 690px; border-radius: 30px;" >
      <div class="row">
        <div class="col-md-12" style="margin-top: 30px;">
          <h3>PT 회원 채팅 리스트</h3>
        </div>
      </div>
      <div class="input-group" style="margin: 10px;">
        <div class="input-group-prepend">
        
        </div>
        <div>
          <input
          type="text"
          class="form-control"
          v-model="room_name"
          @keyup.enter="createRoom"
          placeholder="회원 이름"
        />
      </div>
        
      </div>
      <ul class="list-group">
        <li class="list-group-item list-group-item-action" v-for="item in chatrooms" 
        :key="item.roomId" @click="enterRoom(item.roomId)">
          {{ item.roomId }} {{ item.name }}
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
  color: #070606;
  border:0px;
  height: 65px;
  box-shadow: 0,0,0,0.6;
}

/* 회원이름 라벨 */
.input-group-text{
  margin-right: 10px;
}

/* 입력창 */
.form-control{ 
  background-color: #f4fdf34d;
  border: 0px;
  width: 160px;
  border-radius: 60px;

}
.form-control:hover{ 
  background-color: #f3f3f3;
  
    
}
</style>