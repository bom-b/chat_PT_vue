<template>
  <main>
    <div class="container" v-cloak>
      <div>
        <h2>{{ room.name }}</h2>
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text">내용</label>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="message"
          @keypress.enter="sendMessage"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="sendMessage">
            보내기
          </button>
        </div>
      </div>
      <ul class="list-group">
        <li class="list-group-item" v-for="msg in messages" :key="msg.id">
          {{ msg.sender }} - {{ msg.message }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  data() {
    return {
      roomId: "",
      room: {},
      sender: "",
      message: "",
      messages: [],
      ws: null,
      reconnect: 0,
    };
  },
  created() {
    this.roomId = localStorage.getItem("wschat.roomId");
    this.sender = localStorage.getItem("wschat.sender");
    this.findRoom();
    this.connect();
  },
  methods: {
    findRoom() {
      // API 주소는 해당 프로젝트의 실제 백엔드 주소에 따라 달라집니다.
      axios
        .get(`http://localhost/chat/room/${this.roomId}`)
        .then((response) => {
          this.room = response.data;
        });
    },
    sendMessage() {
      if (this.ws && this.ws.connected) {
        let messageData = {
          type: "TALK",
          roomId: this.roomId,
          sender: this.sender,
          message: this.message,
        };
        let messageString = JSON.stringify(messageData);

        this.ws.send("/pub/chat/message", {}, messageString);
        this.message = "";
      }
    },

    recvMessage(recv) {
      this.messages.unshift({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      });
    },
    connect() {
      const sock = new SockJS("http://localhost/ws-stomp");
      this.ws = Stomp.over(sock);

      const onConnected = () => {
        console.log("웹소켓 연결 성공!!!!");
        this.reconnect = 0; // 연결 성공 시 재연결 시도 횟수 초기화
        this.ws.subscribe(`/sub/chat/room/${this.roomId}`, (message) => {
          const recv = JSON.parse(message.body);
          console.log("Received message: ", recv);
          this.recvMessage(recv);
        });

        this.ws.send(
          "/pub/chat/message",
          {},
          JSON.stringify([{
            type: "ENTER",
            roomId: this.roomId,
            sender: this.sender,
            message: this.message
          }])
        );
      };

      const onError = (error) => {
        console.error("Connection error: ", error);
        if (this.reconnect++ < 5) {
          setTimeout(() => {
            console.log("Attempting to reconnect...");
            this.connect();
          }, 10 * 1000);
        } else {
          console.log("Failed to reconnect after 5 attempts.");
        }
      };

      this.ws.connect({}, onConnected, onError);
    },
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
