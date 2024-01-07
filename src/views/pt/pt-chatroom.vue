<template>
  <main>
  <div>
    <h1>채팅방 목록</h1>
    <ul>
      <li v-for="room in rooms" :key="room.roomId">
        Room ID: {{ room.roomId }}
      </li>
    </ul>

    <h2>채팅방 생성</h2>
    <form @submit.prevent="createRoom">
      <label for="roomName">채팅방 이름:</label>
      <input type="text" id="roomName" v-model="roomName" required>
      <button type="submit">채팅방 생성</button>
    </form>
  </div>
</main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: [], // 채팅방 목록을 담을 배열
      roomName: '', // 채팅방 이름
    };
  },
  mounted() {
    this.fetchRooms(); // 컴포넌트가 마운트되면 채팅방 목록을 가져오도록 설정
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get('http://localhost/pt_chatroom'); // MsgController의 findAllRoom 매핑에 GET 요청
        this.rooms = response.data; // 가져온 데이터를 rooms 배열에 할당
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    },
    async createRoom() {
      try {
        const response = await axios.post('http://localhost/pt_chatroom', { name: this.roomName }); // MsgController의 createRoom 매핑에 POST 요청
        console.log('Created room:', response.data);
        this.roomName = ''; // 폼 초기화
        this.fetchRooms(); // 새로운 채팅방 생성 후 목록을 다시 가져옴
      } catch (error) {
        console.error('Error creating chat room:', error);
      }
    },
  },
};
</script>
