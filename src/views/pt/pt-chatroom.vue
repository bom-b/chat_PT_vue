<template>
  <div class="chatroom-container">
    <div class="header">
      <h3>PT 회원 채팅 리스트</h3>
      <div class="search-box">
        <input type="text" class="search-input" v-model="room_name" @input="filterChatrooms" placeholder="회원 이름 검색 & 바로 연결"/>
      </div>
    </div>
    <ul class="chatroom-list">
      <!-- 회원 리스트가 한 명뿐인 경우 자동으로 연결 -->
      <li class="chatroom-item" v-if="filteredChatrooms.length === 1" @click="enterRoom(filteredChatrooms[0].roomId)">
        {{ filteredChatrooms[0].name }}
      </li>
      <!-- 그 외의 경우 리스트로 표시 -->
      <li class="chatroom-item" v-else v-for="item in filteredChatrooms" :key="item.roomId" @click="enterRoom(item.roomId)">
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
      filteredChatrooms: [], // 필터링된 채팅방 목록
    };
  },
  created() {
    this.localUserName = localStorage.getItem('name');
    this.findAllRoom();
  },
  methods: {
    findAllRoom() {
      // 채팅방 목록을 가져옵니다.
      this.$axios.get("/chat/rooms").then((response) => {
        this.chatrooms = response.data;
        // 페이지 로딩 시 기존 채팅방을 필터링합니다.
        this.filterChatrooms();
      });
    },
    filterChatrooms() {
      // 검색어를 사용하여 채팅방을 필터링합니다.
      this.filteredChatrooms = this.chatrooms.filter((item) => {
        return item.name.includes(this.room_name);
      });
      
      // 회원 리스트가 한 명뿐이면 자동으로 연결
      if (this.filteredChatrooms.length === 1) {
        this.enterRoom(this.filteredChatrooms[0].roomId);
      }
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
/* 자식 컨테이너 */
.chatroom-container {
  height: 100%; /* 전체 높이 */
  width: 100%; /* 전체 너비 */
  margin: auto; /* 자동 마진으로 중앙 정렬 */
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
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
<style scoped>
.chatroom-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.header {
  margin-bottom: 20px;
}

h3 {
  color: #333;
  margin-bottom: 15px;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chatroom-list {
  list-style: none;
  padding: 0;
}

.chatroom-item {
  background-color: #ffffff;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.chatroom-item:hover {
  background-color: #e9e9e9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}
</style>