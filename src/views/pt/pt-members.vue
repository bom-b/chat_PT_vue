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

<template>
  <h1>스케줄 관리</h1>
  <calendarOptions>
    
  </calendarOptions>
  <FullCalendar :options='calendarOptions' />  
</template>