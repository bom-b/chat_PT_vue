<template>
  <main>
    <div class='demo-app' data-aos="fade-in" data-aos-duration="2000" data-aos-delay="">
      <div class='demo-app-sidebar'>
        <div class='demo-app-sidebar-section'>
          <h2>회원 스케줄 관리</h2>
          <ul>
            <li v-for='(event, index) in externalEvents' :key='index' class='external-event' :draggable='true'
              :data-event='JSON.stringify(event)'>
              {{ event.title }}
            </li>
          </ul>
        </div>
        <div class='demo-app-sidebar-section'>
          <label>
            <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
            주말 on/off
          </label>
        </div>
        <div class='demo-app-sidebar-section'>
          <h2>일정 ({{ currentEvents.length }})</h2>
          <ul>
            <li v-for='event in currentEvents' :key='event.id'>
              <b>{{ event.startStr }}</b>
              <b>{{ event.endStr }}</b>
              <i>{{ event.title }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class='demo-app-main'>
        <FullCalendar class='demo-app-calendar' :options='calendarOptions' ref='fullCalendar'>
        <template v-slot:eventContent='arg'>
          <b>{{ formatTime(arg.event.start) }}</b> <!-- 이벤트 시작 시간 포맷팅 -->
          <b>{{ formatTime(arg.event.end) }}</b> <!-- 이벤트 시작 시간 포맷팅 -->
          <i>{{ arg.event.title }}</i> <!-- 이벤트 제목 -->
        </template>
        </FullCalendar>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
        droppable: true,

      },
      currentEvents: [],
      externalEvents: [
        {
          title: '나는 오늘부터 지지관계에서 벗어나',
          backgroudColor: "#008000"
        },
        { title: '춘식이와 나는 한몸으로 일체가 된다' },
        { title: '춘식이에 대한 공격은 나에 대한 공격으로 간주한다.' },
      ],
      drake: null,
    };
  },

  created() 
  {
    this.fetchData();
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
  this.$axios.get("/getMyPtList")
    .then(response => {
      // 데이터를 변환하여 이벤트 배열을 생성합니다.
      const events = response.data.map(eventData => {
        // 날짜와 시간을 결합합니다. 'T'는 ISO 8601 형식을 위해 사용됩니다.
        console.log(eventData)
        const start = eventData.PTDATE + 'T' + eventData.PTSTARTTIME;
        const end = eventData.PTDATE + 'T' + eventData.PTENDTIME;

        console.log("start : " +start)
        console.log("end : " +end)
        // FullCalendar의 이벤트 객체를 반환합니다.
        return {
          id: eventData.SCNUM,
          title: eventData.TITLE,
          start: start,
          end: end,
        };
      });

      // 변환된 이벤트를 allEvents 배열에 추가합니다.
      this.allEvents.push(...events);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
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
  mounted() {
    this.initCalendar();
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

.fc-event {
  background-color: green !important;
}
</style>
