<template>
    <div>
      <div id="app">
        <div class="chat-container">
          <div class="chat-room-title">
            {{ currentRoom.name }}
          </div>
          <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
              <span class="username">{{ message.username }}:</span>
              <span class="text">{{ message.text }}</span>
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
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        newMessage: '',
        rooms: [
          { id: 1, name: 'Room 1' },
          { id: 2, name: 'Room 2' },
          { id: 3, name: 'Room 3' },
        ],
        currentRoomId: 1,
      };
    },
    computed: {
      currentRoom() {
        return this.rooms.find(room => room.id === this.currentRoomId);
      },
    },
    methods: {
      async sendMessage() {
        if (this.newMessage.trim() !== '') {
          this.messages.push({
            username: 'User', // Replace with actual username or user data
            text: this.newMessage,
          });
          this.newMessage = '';
        }
      },
      async changeRoom(roomId) {
        this.currentRoomId = roomId;
        await this.loadMessages(); // Load messages for the new room
      },
      async loadMessages() {
        // Simulate loading messages from the server
        // Replace this with actual API call
        await new Promise(resolve => setTimeout(resolve));
  
        // Example: Add some mock messages
        this.messages = [
          { username: 'User', text: 'Welcome to the chat room!' },
          { username: 'User', text: 'Feel free to start chatting.' },
        ];
      },
    },
    mounted() {
      // Load initial messages
      this.loadMessages();
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