<template>
  <main class="main">
  <analyze_header/>

  <div class="demo-app">

    <div class="demo-app-main">
      <FullCalendar
        class="demo-app-calendar"
        ref="fullCalendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>음식 정보</h3>
        <div class="image-container">
          <p v-if="selectedEvent.foodDetails.length > 0">제목: {{ selectedEvent.foodDetails[currentFoodIndex].title }}</p>
          <button class="nav-button prev" @click="showPreviousFood">&lt;</button>
    <img
      v-if="selectedEvent.foodDetails.length > 0 && selectedEvent.foodDetails[currentFoodIndex].foodImgs"
      :src="`${this.$s3BaseURL}/food_main_images/${selectedEvent.foodDetails[currentFoodIndex].foodImgs}`"
      alt="Event image"
      class="img-event" style="width: 300px; height: 300px;"
    />
    <button class="nav-button next" @click="showNextFood">&gt;</button>
    </div>
        <p>칼로리: {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].cal) }}</p>
        <p>탄수화물: {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].carbohydrate) }}</p>
        <p>단백질: {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].protein) }}</p>
        <p>지방: {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].fat) }}</p>
        <div>
      </div>

        <div class="row">
          <button
            type="button button-container"
            class="btn btn-danger"
            @click="deleteEvent(selectedEvent.id)"
          >
            삭제
          </button>
          <button type="button" class="btn btn-success" @click="closeModal">
            닫기
          </button>
        </div>
      </div>
    </div>
    
  </div>
  </main>
</template>
<script>
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEventColor } from "./event-utils";
import analyze_header from '@/components/header/d-analyze.vue';

export default defineComponent({
  components: {
    FullCalendar,
    analyze_header,
  },
  data() {
    return {
      realcategory: ["아침","점심","저녁","간식"],
      allEvents: [],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      showModal: false,
      showEventInputModal: false,
      selectedEvent: {
        id: null,
        title: "",
        img: "",
        carbohydrate: null,
        protein: null,
        fat: null,
        cal: null,
      },
      imagePreview: null,
      currentEvents: [],
      currentFoodIndex: 0,
    };
  },

  mounted() {
    this.fetchEvents();
  },

  methods: {
    formatEventDate(dateStr) {

      const offset = dateStr.getTimezoneOffset() * 60000; // 로컬 타임존 오프셋을 밀리초 단위로 계산
      const localDate = new Date(dateStr.getTime() - offset); // 로컬 시간으로 조정

      return localDate;
    },

    async fetchEvents() {
  for (let category of this.realcategory) {
    try {
      const response = await this.$axios.get("/myCalendarList", { params: { category } });
      const events = response.data.map(eventData => {
      // const startDateParts = eventData.startStr.split('/');
      // const endDateParts = eventData.endStr.split('/');
      // const startDate1 = new Date(`20${startDateParts[0]}-${startDateParts[1]}-${startDateParts[2]}`);
      // const endDate1 = new Date(`20${endDateParts[0]}-${endDateParts[1]}-${endDateParts[2]}`);
      const startDate = eventData.startStr;
      const endDate = eventData.startStr;

  return {
    id: eventData.eventNum,
    title: eventData.title,
    start: startDate,
    end: endDate,
    color: getEventColor(eventData.title),
  };
});


      this.allEvents.push(...events);

    } catch (error) {
      console.error(`Error fetching ${category} events:`, error);
    }
  }
  this.updateCalendarEvents();
}
,

updateCalendarEvents() {
    if (this.$refs.fullCalendar) {
      const calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.removeAllEvents();
      this.allEvents.forEach(event => calendarApi.addEvent(event));
    } else {
      console.error("FullCalendar 참조가 존재하지 않습니다.");
    }
  },

  handleEventClick(clickInfo) {
      this.currentFoodIndex = 0;
      const eventStartDate = clickInfo.event.start;
      const offset = eventStartDate.getTimezoneOffset() * 60000; // 로컬 타임존 오프셋을 밀리초 단위로 계산
      const localDate = new Date(eventStartDate.getTime() - offset); // 로컬 시간으로 조정
      const formattedDate = localDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 변환

    const params = {
      date: formattedDate,
      category: clickInfo.event.title,
    };
      this.$axios.get("/selectedFoodDetails", { params })
        .then(response => {
          this.selectedEvent = {
        ...clickInfo.event.extendedProps,
        foodDetails: response.data, // 이제 foodDetails는 배열입니다.
      };
          this.showModal = true;
        })
        .catch(error => {
          console.error("Error fetching food details:", error);
        });
    },

    showNextFood() {
  if (this.currentFoodIndex < this.selectedEvent.foodDetails.length - 1) {
    this.currentFoodIndex++;
  }
},

showPreviousFood() {
  if (this.currentFoodIndex > 0) {
    this.currentFoodIndex--;
  }
},

    handleEvents(events) {
      this.currentEvents = events;
    },

    deleteEvent(eventId) {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let event = calendarApi.getEventById(eventId);
      if (event) {
        this.$axios.delete(`/delteCalendarInfo/${eventId}`)
          .then(() => {
            event.remove();
            alert("삭제되었습니다.");
            this.showModal = false;
          })
          .catch(err => {
            console.error("이벤트 삭제 중 오류 발생", err);
          });
      }
    },

    closeModal() {
      this.showModal = false;
    },

    closeInput() {
      this.imagePreview = null;
      this.showEventInputModal = false;
    },
  },
});
</script>


<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75); // 배경을 약간 더 어둡게 조정
  z-index: 1000; // z-index를 높여서 다른 요소들 위에 표시되도록 함
}

.modal-content {
  background: #fff;
  width: auto;
  max-width: 500px; // 모달의 최대 너비를 지정
  padding: 2rem;
  border-radius: 10px; // 모달의 모서리를 둥글게
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); // 모달에 그림자 효과 추가
  display: flex;
  flex-direction: column;
  overflow: hidden; // 내용이 넘칠 경우 숨김 처리
  align-items: center; // 내용을 센터로 정렬
}

.button-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
}

.img-event {
  max-width: 100%; // 이미지가 모달 너비를 넘지 않도록 조정
  max-height: 300px; // 이미지의 최대 높이를 제한
  width: 90%; // 모달 너비에 맞게 이미지 크기 조정
  object-fit: contain; // 이미지 비율을 유지하면서 전체 내용을 표시
  margin-bottom: 1rem; // 이미지와 텍스트 사이의 간격을 둠
}

.text-content {
  color: #333; // 텍스트 색상을 어둡게 조정하여 가독성 향상
  margin-bottom: 1rem; // 텍스트 사이의 간격을 둠
  text-align: center; // 텍스트를 가운데 정렬
  width: 100%; // 텍스트 너비를 모달에 맞게 조정
}

// 각 요소의 스타일을 세밀하게 조정
.title {
  font-size: 1.5rem; // 제목의 폰트 크기를 크게 조정
  font-weight: bold; // 제목을 굵게 표시
}

.detail {
  font-size: 1rem; // 상세 정보의 폰트 크기를 조정
  color: #555; // 상세 정보의 텍스트 색상을 조정
}

.btn {
  padding: 0.5rem 1rem; // 버튼의 패딩을 조정
  margin-top: 1rem; // 버튼과 다른 요소 사이의 간격을 둠
  font-size: 1rem; // 버튼 텍스트의 폰트 크기를 조정
  color: white; // 버튼 텍스트 색상을 흰색으로 조정
  border: none; // 버튼 테두리 제거
  flex:1;
  padding: 0.5em 1em;
  margin: 0 0.5rem; // 버튼 사이의 간격 조정
  border-radius: 5px; // 버튼 모서리를 둥글게 조정
  cursor: pointer; // 마우스 오버 시 커서 변경
  &:hover {
    background: #0056b3; // 버튼 호버 시 배경색을 어둡게 조정
  }
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
}

.img-event {
  max-width: 100%;
  max-height: 300px;
  width: 90%;
  object-fit: contain;
  margin: 0 10px;
}


</style>
