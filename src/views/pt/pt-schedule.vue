<!--https://github.com/fullcalendar/fullcalendar-vue?tab=readme-ov-file-->
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      }
    }
  }
}
</script>

<script setup>
import { ref } from 'vue';

let obj = ref({ count: 0 });
const onClick = () => {
  obj.value.count++;
};
const onChange = () => {
  obj.value = {
    count: 100
  };
}
</script>

<template>
  <div>
    <h1>스케줄 관리</h1>

    <calendarOptions>

    </calendarOptions>
    <FullCalendar :options='calendarOptions' />
  </div>

  <div>
    {{ obj.count }}
    <button @click="onClick">증가</button>
    <button @click="onChange">변경</button>
  </div>
</template>
