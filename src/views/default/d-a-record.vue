<template>
  <main class="main">
    <analyze_header />
    <div class="demo-app">
      <div class="demo-app-main">
        <FullCalendar
          class="demo-app-calendar"
          ref="fullCalendar"
          :options="calendarOptions"
        >
          <template v-slot:eventContent="arg">
            <i class="title-event">{{ arg.event.title }}</i>
            <!-- 이벤트 제목 -->
          </template>
        </FullCalendar>
      </div>

      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>음식 정보</h3>
          <div class="image-container">
            <p v-if="selectedEvent.foodDetails.length > 0">
              제목: {{ selectedEvent.foodDetails[currentFoodIndex].title }}
            </p>
            <button class="nav-button prev" @click="showPreviousFood">
              &lt;
            </button>
            <img
              v-if="
                selectedEvent.foodDetails.length > 0 &&
                selectedEvent.foodDetails[currentFoodIndex].img
              "
              :src="`${this.$s3BaseURL}/food_main_images/${selectedEvent.foodDetails[currentFoodIndex].img}`"
              alt="Event image"
              class="img-event"
              style="width: 300px; height: 300px"
            />
            <button class="nav-button next" @click="showNextFood">&gt;</button>
          </div>
          <p>
            칼로리:
            {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].foodcal) }}kcal
          </p>
          <p>
            탄수화물:
            {{
              Math.round(
                selectedEvent.foodDetails[currentFoodIndex].carbohydrate
              )
            }}g
          </p>
          <p>
            단백질:
            {{
              Math.round(selectedEvent.foodDetails[currentFoodIndex].protein)
            }}g
          </p>
          <p>
            지방:
            {{ Math.round(selectedEvent.foodDetails[currentFoodIndex].fat) }}g
          </p>
          <div></div>

          <div class="row">
            <button
              type="button button-container"
              class="btn btn-danger"
              @click="
                deleteEvent(selectedEvent.foodDetails[currentFoodIndex].id)
              "
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
import analyze_header from "@/components/header/d-analyze.vue";

export default defineComponent({
  components: {
    FullCalendar,
    analyze_header,
  },
  data() {
    return {
      realcategory: ["아침", "점심", "저녁", "간식"],
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
    formatDateString(dateTimeString) {
      const parts = dateTimeString.split(" ");
      if (parts.length !== 2) {
        return null; // 날짜와 시간을 구분하는 공백이 없으면 null 반환
      }

      const dateParts = parts[0].split("-");
      if (dateParts.length !== 3) {
        return null; // 날짜 형식이 잘못되었으면 null 반환
      }

      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // JavaScript의 월은 0부터 시작합니다.
      const day = parseInt(dateParts[2], 10);

      const timeParts = parts[1].split(":");
      if (timeParts.length !== 3) {
        return null; // 시간 형식이 잘못되었으면 null 반환
      }

      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);

      const date = new Date(year, month, day, hours, minutes, seconds);
      if (isNaN(date.getTime())) {
        return null; // 유효하지 않은 날짜의 경우 null 반환
      }

      return date.toISOString();
    },

    formatTime(date) {
      if (!date) {
        return "";
      }
      let d = new Date(date);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // 시간이 '0'이면 '12'로 변경
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },

    async fetchEvents() {
      try {
        const response = await this.$axios.get("/myCalendarList");
        const events = response.data.map((eventData) => {
          let startDate = new Date(this.formatDateString(eventData.eatdate));
          let endDate = new Date(startDate);
          endDate.setHours(startDate.getHours() + 5); // 시작 시간에서 5시간 뒤로 설정

          return {
            id: eventData.id,
            title: eventData.title,
            start: startDate,
            end: endDate,
            color: getEventColor(eventData.title),
          };
        });

        // 날짜별로 이벤트를 그룹화합니다.
        const groupedByDate = events.reduce((acc, event) => {
          const dateKey = event.start.toISOString().split("T")[0]; // 날짜 부분만 추출
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
          return acc;
        }, {});

        // 각 날짜에서 title별로 이벤트를 그룹화하고 합칩니다.
        const mergedEvents = [];
        Object.values(groupedByDate).forEach((dateGroup) => {
          const groupedByTitle = dateGroup.reduce((acc, event) => {
            if (!acc[event.title]) {
              acc[event.title] = { ...event, count: 0 };
            }
            acc[event.title].count++;
            return acc;
          }, {});

          Object.values(groupedByTitle).forEach((event) => {
            if (event.count > 1) {
              event.title = `${event.title}`;
            }
            mergedEvents.push(event);
          });
        });

        this.allEvents.push(...mergedEvents);
        console.log(this.allEvents);
      } catch (error) {
        console.error(`Error fetching events:`, error);
      }
      this.updateCalendarEvents();
    },

    updateCalendarEvents() {
      if (this.$refs.fullCalendar) {
        const calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.removeAllEvents();
        this.allEvents.forEach((event) => calendarApi.addEvent(event));
      } else {
        console.error("FullCalendar 참조가 존재하지 않습니다.");
      }
    },

    handleEventClick(clickInfo) {
      this.currentFoodIndex = 0;
      // 이벤트의 고유 식별자를 가져옵니다. 여기서는 'id'를 예시로 사용합니다.
      const eventId = clickInfo.event.id;
      const eventtitle = clickInfo.event.title;
      const eventdate = clickInfo.event.start;
      const dateKey = eventdate.toISOString().split("T")[0]; // 날짜 부분만 추출 ("2024-01-23")
      const parts = dateKey.split("-"); // ["2024", "01", "23"]
      const formattedDate = `${parts[0].substring(2)}/${parts[1]}/${parts[2]}`; // "24/01/23"

      const params = {
        id: eventId,
        title: eventtitle,
        eatdate: formattedDate,
      };
      console.log(params);

      // 서버에 해당 이벤트 ID에 대한 상세 정보를 요청합니다.
      this.$axios
        .get(`/selectedFoodDetails`, { params })
        .then((response) => {
          console.log("반응오냐",response)
          // 서버로부터 받은 응답을 사용하여 모달의 상태를 업데이트합니다.
          this.selectedEvent = {
            ...clickInfo.event.extendedProps,
            foodDetails: response.data,
          };
          
          // 모달을 표시합니다.
          this.showModal = true;
        })
        .catch((error) => {
          console.error("Error fetching food details:", error);
        });
    },

    async showNextFood() {
      if (this.currentFoodIndex < this.selectedEvent.foodDetails.length - 1) {
        this.currentFoodIndex++;
        await this.fetchSelectedFoodDetails(this.selectedEvent.id);
      }
    },

    async showPreviousFood() {
      if (this.currentFoodIndex > 0) {
        this.currentFoodIndex--;
        await this.fetchSelectedFoodDetails(this.selectedEvent.id);
      }
    },

    async fetchSelectedFoodDetails(eventId) {
      try {
        // 모달의 내용을 초기화합니다.
        this.selectedEvent = {
          id: null,
          title: "",
          img: "",
          carbohydrate: null,
          protein: null,
          fat: null,
          cal: null,
        };

        // 서버로부터 선택된 이벤트의 상세 정보를 불러옵니다.
        const response = await this.$axios.get(
          `/selectedFoodDetails/${eventId}`
        )
        // 응답 데이터로 모달의 상태를 업데이트합니다.
        this.selectedEvent = {
          ...this.selectedEvent,
          ...response.data,
        };
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },

    deleteEvent(eventId) {
      console.log("삭제 시작");
      let calendarApi = this.$refs.fullCalendar.getApi();
      let event = calendarApi.getEventById(eventId);
      if (event) {
        this.$axios
          .delete(`/delteCalendarInfo/${eventId}`)
          .then(() => {
            event.remove();
            alert("삭제되었습니다.");
            this.showModal = false;
          })
          .catch((err) => {
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

<style scoped>
h2 {
  margin: 0;
  font-size: 16px;
}
i {
  justify-content: center;
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
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.demo-app-calendar .fc-event-title {
  /* FullCalendar v4 이하 */
  text-align: center;
  width: 100%;
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
  background-color: rgba(0, 0, 0, 0.75);

  z-index: 1000;
}
.modal-content {
  background: #fff;
  width: auto;
  max-width: 500px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  gap: 10px; /* 버튼 사이 간격 */
}

.img-event {
  max-width: 100%;
  max-height: 300px;
  width: 90%;
  object-fit: contain;
  margin-bottom: 1rem;
}

.text-content {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
  width: 100%;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.detail {
  font-size: 1rem;
  color: #555;
}

.btn {
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  color: white;
  border: none;
  flex: 1;
  padding: 0.5em 1em;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
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
