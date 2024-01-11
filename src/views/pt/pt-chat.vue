<template>
  <main style="margin-top: 125px">
    <div class="container" v-cloak>
      <div>
        <h2>{{ room.name }}</h2>
      </div>
      <ul class="list-group" ref="chatList">
        <li
          class="list-group-item"
          v-for="msg in messages"
          :key="msg.id"
          :class="{
            'message-mine': msg.sender === sender,
            'message-other': msg.sender !== sender,
          }"
        >
          <div class="profile-img-container d-flex" style="margin-right: 20px">
            <img
              class="profile-img"
              src="../../assets/img/코딩춘식.jpeg"
              alt=""
              style="width: 32px; object-fit: contain; margin: 8px"
            />{{ msg.sender }}
          </div>
          <span>{{ msg.message }}</span>
          <div class="message-time">{{ formatTime(msg.logdate) }}</div>
        </li>
      </ul>
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text"> ➕ </label>
          <!--✔️ -->
        </div>
        <input
          type="text"
          class="form-control"
          v-model="message"
          @keypress.enter="sendMessage"
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary"
            type="button"
            @click="sendMessage"
            style="margin-left: 10px"
          >
            보내기
          </button>
        </div>
      </div>
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
    this.loadPreviousMessages();
    this.connect();
  },
  methods: {
    findRoom() {
      // API 주소는 해당 프로젝트의 실제 백엔드 주소에 따라 달라집니다.
      axios
        .get(`http://localhost/springpt/chat/room/${this.roomId}`)
        .then((response) => {
          this.room = response.data;
        });
    },
    loadPreviousMessages() {
      axios
        .get(`http://localhost/springpt/chat/rooms/${this.roomId}/messages`)
        .then((response) => {
          // logdate를 기준으로 오름차순 정렬
          this.messages = response.data.sort(
            (a, b) => new Date(a.logdate) - new Date(b.logdate)
          );
        })
        .catch((error) => {
          console.error("Error loading previous messages: ", error);
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

        this.ws.send("/pub/chat/message", messageString, {});
        this.message = "";
      }
    },

    recvMessage(recv) {
      // 메시지 배열의 끝에 새 메시지 추가
      this.messages.push({
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
        logdate: recv.logdate, // 시간도 추가
      });

      // 새 메시지가 추가된 후 스크롤을 아래로
      this.$nextTick(() => {
        if (this.$refs.chatList) {
          const chatList = this.$refs.chatList;
          chatList.scrollTop = chatList.scrollHeight;
        }
      });
    },
    connect() {
      const sock = new SockJS("http://localhost/springpt/ws-stomp");
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
          JSON.stringify(
            {
              type: "ENTER",
              roomId: this.roomId,
              sender: this.sender,
              message: this.message,
            },
            {}
          )
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
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.container {
  background-color: #f4f4f4; /* 밝은 배경 */
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* 그림자 효과 */
  max-width: 600px; /* 최대 너비 설정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px; /* 내부 여백 */
}

.list-group {
  max-height: 600px; /* 채팅창 높이 */
  overflow-y: auto; /* 스크롤바 */
  background-color: white; /* 채팅창 배경색 */
  border: 1px solid #eaeaea; /* 테두리 */
  border-radius: 10px; /* 모서리 둥글게 */
  margin-bottom: 20px; /* 아래 여백 */
}

/* 사용자 정의 스크롤바 스타일 */
.list-group::-webkit-scrollbar {
  width: 3px;
}

.list-group::-webkit-scrollbar-track {
  background: #f4f4f4;
}

.list-group::-webkit-scrollbar-thumb {
  background: #075b56;
}

.list-group::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.input-group {
  background-color: transparent; /* 투명 배경 */
  border: none; /* 테두리 없음 */
  transition: transform 0.5s ease; /* 호버 애니메이션 효과 */
}

.input-group:hover {
  transform: scale(1.02); /* 호버 시 약간 확대 */
  /* background-color: #eef2f1; 호버 배경색 변경 */
}

.input-group {
  background-color: #f4f4f4; /* 입력창 배경 */
}

.input-group-text {
  background-color: #58a778; /* 초록색 배경 */
  color: white; /* 텍스트 색상 */
  border-radius: 5px 0 0 5px; /* 왼쪽 모서리 둥글게 */
}

.form-control {
  border-radius: 0 5px 5px 0; /* 오른쪽 모서리 둥글게 */
}

.btn-primary {
  background-color: #58a778; /* 초록색 배경 */
  border: none; /* 테두리 없음 */
}

/* 챗 왼쪽 | 오른쪽 정렬을 위한 CSS */
.message-mine {
  text-align: right; /* 내가 보낸 메시지는 오른쪽 정렬 */
  background-color: #f0f0f0; /* 내 메시지 배경색 */
}

.message-other {
  text-align: left; /* 다른 사람이 보낸 메시지는 왼쪽 정렬 */
  background-color: #e3e3e3; /* 다른 사람의 메시지 배경색 */
}

.message-time {
  font-size: 0.8em; /* 시간 글자 크기 */
  color: #888; /* 시간 글자 색상 */
}
</style>