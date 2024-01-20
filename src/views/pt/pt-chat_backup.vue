<template>
  <div
    class="container"
    v-cloak
    style="background-color: #003a2452; height: 690px; border-radius: 30px"
  >
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
          'fade-in': msg.animation === 'fade-in',
        }"
      >
        <span>{{ msg.message }}</span>
        <div class="message-time">{{ formatTime(msg.logdate) }}</div>
      </li>
    </ul>
    <div class="input-group" style="background-color: unset">
      <div class="input-group-prepend">
        <label class="input-group-text" style="border: 0"> ➕ </label>
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
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const token = localStorage.getItem("jwtToken");
const headers = {
  Authorization: "Bearer " + token,
};
console.log(headers);
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
    this.sender = localStorage.getItem("name");
    this.findRoom();
    this.loadPreviousMessages();
    this.connect();
  },
  methods: {
    findRoom() {
      // API 주소는 해당 프로젝트의 실제 백엔드 주소에 따라 달라집니다.
      this.$axios
        .get(`http://localhost/springpt/chat/room/${this.roomId}`)
        .then((response) => {
          this.room = response.data;
        });
    },
    loadPreviousMessages() {
      this.$axios
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
          logdate: new Date().toISOString(), // 현재 시간을 ISO 8601 형식으로 추가
        };
        let messageString = JSON.stringify(messageData);

        this.ws.send("/pub/chat/message", messageString, headers);
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
        animation: "fade-in",
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
        this.ws.subscribe(
          `/sub/chat/room/${this.roomId}`,
          (message) => {
            const recv = JSON.parse(message.body);
            console.log("Received message: ", recv);
            this.recvMessage(recv);
          },
          headers
        );

        this.ws.send(
          "/pub/chat/message",
          JSON.stringify(
            {
              type: "ENTER",
              roomId: this.roomId,
              sender: this.sender,
              message: this.message,
            },
            headers
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

      this.ws.connect(headers, onConnected, onError);
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
  background-color: #f4f4f4;

  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* 그림자 효과 */
  max-width: 600px; /* 최대 너비 설정 */
  margin: 20px auto; /* 중앙 정렬 */
  padding: 20px; /* 내부 여백 */
}

/* 기본 리스트 그룹 아이템 스타일 */
.list-group-item {
  border: none; /* 기본 테두리 제거 */
  position: relative; /* 말풍선 꼬리를 위한 위치 설정 */
  padding: 10px 20px; /* 여백 조정 */
  margin-bottom: 8px; /* 메시지 간 간격 */
  border-radius: 20px; /* 둥근 모서리 */
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
  width: 6px;
}

.list-group::-webkit-scrollbar-track {
  background: rgb(200, 245, 226);
}

.list-group::-webkit-scrollbar-thumb {
  background: #cafdcf;
}

.list-group::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.input-group {
  background-color: transparent; /* 투명 배경 */
  border: none; /* 테두리 없음 */
  transition: transform 0.5s ease; /* 호버 애니메이션 효과 */
  background-color: #f4f4f4; /* 입력창 배경 */
}

.input-group:hover {
  transform: scale(1.01); /* 호버 시 약간 확대 */
  /* background-color: #eef2f1; 호버 배경색 변경 */
}

.input-group-text {
  background-color: #58a77854; /* 초록색 배경 */
  color: white; /* 텍스트 색상 */
  border-radius: 5px 0 0 5px; /* 왼쪽 모서리 둥글게 */
}

.form-control {
  border-radius: 0 5px 5px 0; /* 오른쪽 모서리 둥글게 */
}

.btn-primary {
  background-color: #6cad64; /* 초록색 배경 */
  border: none; /* 테두리 없음 */
}
.btn-primary:hover {
  background-color: #3c6037;
  border: none; /* 테두리 없음 */
}
/* 내가 보낸 메시지 스타일 */
.message-mine {
  margin-left: auto;
  background-color: #6cad64; /* 연두색 배경 */
  border-bottom-right-radius: 0; /* 오른쪽 아래 모서리 둥글게 하지 않음 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* 그림자 효과 */
  color: #000000;
  max-width: 80%;
  margin-right: 6px;
}

/* 내 메시지 말풍선 꼬리 (세련된 모양) */
.message-mine::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: -6px; /* 꼬리의 위치 조정 */
  width: 15px; /* 꼬리의 너비 */
  height: 15px; /* 꼬리의 높이 */
  background-color: #dcf8c6;
  border: 2px solid #f4f4f4; /* 배경색과 같은 색상으로 보더 설정 */
  border-left-color: transparent;
  border-top-color: transparent;
  border-radius: 16px; /* 둥글게 처리 */
  transform: rotate(45deg) translate(-50%, 50%);
}

/* 다른 사람이 보낸 메시지 스타일 */
.message-other {
  margin-right: auto;
  background-color: #f4f4f4; /* 흰색 배경 */
  bottom: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* 그림자 효과 */
  border-bottom-left-radius: 0; /* 왼쪽 아래 모서리 둥글게 하지 않음 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  max-width: 80%; /* 메시지 최대 너비 설정 */
  margin-left: 6px;
}

/* 다른 사람의 메시지 말풍선 꼬리 (세련된 모양) */
.message-other::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -6px; /* 꼬리의 위치 조정 */
  width: 15px; /* 꼬리의 너비 */
  height: 15px; /* 꼬리의 높이 */
  background-color: #ffffff;
  border: 2px solid #f4f4f4; /* 배경색과 같은 색상으로 보더 설정 */
  border-right-color: transparent;
  border-top-color: transparent;
  border-radius: 16px; /* 둥글게 처리 */
  transform: rotate(-45deg) translate(50%, 50%);
}

.list-group {
  overflow-y: auto; /* 스크롤바 설정 */
  background-color: #0a7069da;
  border: 0;
}

.list-group {
  -ms-overflow-style: none; /* IE, 엣지 */
  scrollbar-width: none; /* 파이어폭스 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
}

.message-time {
  font-size: 0.7em; /* 시간 글자 크기 */
  color: #1e1f22; /* 시간 글자 색상 */
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

/* 애니메이션 클래스 */
.fade-in {
  animation: fadeIn 0.5s ease-in;
}
</style>
