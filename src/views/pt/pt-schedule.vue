<template>
  <main>
      <div class='demo-app-main'>
        <FullCalendar class='demo-app-calendar' :options='calendarOptions' ref='fullCalendar'>
        <template v-slot:eventContent='arg'>
          <b>{{ formatTime(arg.event.start) }}</b> <!-- 이벤트 시작 시간 포맷팅 -->
          <b>{{ formatTime(arg.event.end) }}</b> <!-- 이벤트 시작 시간 포맷팅 -->
          <i>{{ arg.event.title }}</i> <!-- 이벤트 제목 -->
        </template>
        
        </FullCalendar>
      </div>
    
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS , getEventColor } from "./event-utils";
import dragula from 'dragula';
import 'dragula/dist/dragula.css';


export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      allEvents: [],
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'timeGridWeek',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        drop: true,
        droppable:true,
      },
      currentEvents: [],

      drake: null,
    };
  },

  created() {
    this.fetchData();
    // INITIAL_EVENTS를 allEvents에 추가합니다.
    this.allEvents.push(...INITIAL_EVENTS);
  },

  mounted() {
    this.initCalendar();
    this.updateCalendarEvents(); // 초기 이벤트 추가를 위해 호출
  },



  methods: {

    formatTime(date) {
    if (!date) {
      return '';
    }
    let d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // 시간이 '0'이면 '12'로 변경
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  },

  async fetchData() {
  try {
    const response = await this.$axios.get("/getMyPtList");
    const events = response.data.map(eventData => {
      let startDate = new Date(eventData.ptstart);
      let endDate = new Date(startDate.getTime() + (1/2) * 60 * 60 * 1000); // 3시간 추가

      console.log("d : " + eventData.ptstart)
      console.log(startDate, endDate);

      return {
        id: eventData.scnum,
        title: eventData.title,
        start: startDate,
        end: endDate,
        color:getEventColor(eventData.scnum),
      };
    });

    this.allEvents.push(...events);
    console.log("ALL EVENTS : " + this.allEvents);
    this.updateCalendarEvents();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
},

updateCalendarEvents() {
  this.$nextTick(() => {
    if (this.$refs.fullCalendar) {
      const calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.removeAllEvents();
      this.allEvents.forEach(event => calendarApi.addEvent(event));
    } else {
      console.error("FullCalendar 참조가 존재하지 않습니다.");
    }
  });
},
  handleDateSelect(selectInfo) {
      let title = prompt('일정을 적어주세요');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: "1",
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        });
      }
    },

    handleEventClick(clickInfo) {
      if (confirm(`이 일정을 삭제하시겠습니까? '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;

    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    initCalendar() {
      const containerEl = document.getElementById('external-events-list');

      this.drake = dragula({
        containers: [containerEl],
        copy: true,
      });

      this.drake.on('drop', (el, target) => {
        const title = el.innerText;
        const calendarApi = this.$refs.fullCalendar.getApi();

        calendarApi.addEvent({
          title,
          start: calendarApi.getDateFromElement(target),
          allDay: !calendarApi.getOption('allDaySlot'),
        });
      });

    },
  },

});
</script>




<style lang='css' scoped>
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
</style>
