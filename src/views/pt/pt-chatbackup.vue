<template>
  <main>
    <div>
      <div id="app">
        <div class="chat-container">
          <div class="chat-room-title">
            {{ currentRoom.name }}
          </div>
          <div class="chat-messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="message"
            >
              <span class="username">{{ message.userid }}:</span>
              <span class="text">{{ message.log }}</span>
            </div>
          </div>
          <div class="chat-rooms">
            <ul>
              <li v-for="room in rooms" :key="room.id">
                <button @click="changeRoom(room.id)">{{ room.name }}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'; // axios import 추가

export default {
  data() {
    return {
      messages: [],
      roomId: null,
      newMessage: "",
      rooms: [
        { id: 1, name: "Room 1" },
        { id: 2, name: "Room 2" },
        { id: 3, name: "Room 3" },
      ],
      currentRoomId: 1,
      webSocket: null,
    };
  },
  computed: {
    currentRoom() {
      return this.rooms.find((room) => room.id === this.currentRoomId);
    },
  },
  methods: {
    async fetchRoomId() { // roomID를 가져오는 메서드 추가
      try {
        const response = await axios.get('/api/getRoomId'); // API 호출
        this.roomId = response.data.roomId; // 가져온 roomID를 Vue.js 데이터에 설정
        await this.loadMessages(); // 메시지를 가져오는 메서드 호출
      } catch (error) {
        console.error('Error fetching room ID', error);
      }
    },
    async loadMessages() {
      // 메시지를 받아오는 로직은 필드명을 수정하여 변경합니다.
      // 서버로부터 데이터를 가져오는 부분으로 수정해야 합니다.
      // 여기서는 roomId에 해당하는 메시지만 가져온다고 가정합니다.
      try {
        const response = await axios.get(`http://localhost/api/messages/${this.roomId}`); // roomID를 사용하여 해당 방의 메시지를 가져오는 API 호출
        this.messages = response.data.messages; // 가져온 메시지를 Vue.js 데이터에 설정
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          userid: 'User', // 필드명 수정
          log: this.newMessage, // 필드명 수정
        });

        const message = {
          messageType: 'ENTER',
          chatroomid: this.currentRoomId, // 수정된 변수명 사용
          userid: 'User123', // 필드명 수정
          log: this.newMessage, // 필드명 수정
        };
        // WebSocket을 통해 메시지 전송
        this.sendWebSocketMessage(message);

        this.newMessage = '';
      }
    },
    async changeRoom(roomId) {
      this.currentRoomId = roomId;
      await this.loadMessages(); // Load messages for the new room
    },
    
    sendWebSocketMessage(message) {
      // 연결이 없거나 연결 상태가 OPEN이 아니면 새로운 WebSocket 연결을 엽니다.
      if (!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN) {
        this.webSocket = new WebSocket("ws://localhost/chatptCHAT"); // WebSocket endpoint URL

        // 연결이 열리면 새로운 메시지를 받을 수 있도록 설정합니다.
        this.webSocket.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          this.messages.push({
            username: receivedMessage.userid, // 수정 필요
            text: receivedMessage.log, // 수정 필요
          });
        };
      }
      // WebSocket이 열려 있으면 메시지를 전송합니다.
      if (this.webSocket.readyState === WebSocket.OPEN) {
        this.webSocket.send(JSON.stringify(message));
      }
    },
  },

  mounted() {
    // Load initial messages
    this.loadMessages();
    this.fetchRoomId(); // 컴포넌트가 마운트되면 API 호출
    // Connect to WebSocket
    this.webSocket = new WebSocket("ws://localhost/chatptCHAT"); // WebSocket endpoint URL

    // Handle incoming messages from WebSocket
    this.webSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      // Process received message as needed and add it to the messages array
      this.messages.push({
        username: receivedMessage.USERID, // 수정 필요
        text: receivedMessage.LOG, // 수정 필요
      });
    };
  },
  beforeUnmount() {
    // 컴포넌트가 제거되기 전에 WebSocket 연결을 닫습니다.
    if (this.webSocket) {
      this.webSocket.close();
    }
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.chat-container {
  flex: 1;
  display: flex;
}

.chat-room-title {
  padding: 10px;
  background-color: #00997b;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  max-height: 425px;
  position: relative;
  color: black;
}

.chat-rooms {
  width: 200px;
  border-left: 1px solid #ccc;
  background-color: #00997b;
  padding: 20px;
}

.message {
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
}

.input-container {
  display: inline-flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #085c57;
}

input {
  flex: 1;
  margin-right: 10px;
}

button {
  cursor: pointer;
}

.chat-rooms button {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
}
</style>
