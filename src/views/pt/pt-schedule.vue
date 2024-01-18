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
              <i>{{ event.title }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class='demo-app-main'>
        <FullCalendar class='demo-app-calendar' :options='calendarOptions' ref='fullCalendar'>
          <template v-slot:eventContent='arg'>
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
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
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';

function createEventId() {
  return String(Date.now());
}

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
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
  methods: {
    handleDateSelect(selectInfo) {
      let title = prompt('일정을 적어주세요');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
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

      new ThirdPartyDraggable(containerEl, {
        itemSelector: '.external-event',
        mirrorSelector: '.gu-mirror',
        eventData: (eventEl) => {
          return {
            title: eventEl.innerText,
          };
        },
      });

      const calendarApi = this.$refs.fullCalendar.getApi();
      this.externalEvents.forEach((event) => {
        calendarApi.addEvent(event);
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
