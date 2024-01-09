<template>
    <div id="wrap">
        <div id="external-events">
            <h4>Draggable Events</h4>
            <div id="external-events-list">
                <div v-for="event in events" :key="event.id"
                    class="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event">
                    <div class="fc-event-main">{{ event.title }}</div>
                </div>
            </div>
            <p>
                <input type="checkbox" id="drop-remove" />
                <label for="drop-remove">remove after drop</label>
            </p>
        </div>
        <div id="calendar-wrap">
            <FullCalendar :options="calendarOptions" />
        </div>
    </div>
</template>
  
<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
export default {
    data() {
        return {
            events: [
                { id: 1, title: "My Event 1" },
                { id: 2, title: "My Event 2" },
                { id: 3, title: "My Event 3" },
                { id: 4, title: "My Event 4" },
                { id: 5, title: "My Event 5" }
            ],
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                editable: true,
                droppable: true,
                drop: function (arg) {
                    if (document.getElementById('drop-remove').checked) {
                        arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                    }
                }
            }
        };
    },
    mounted() {
        const containerEl = document.getElementById("external-events-list");
        const calendarEl = document.getElementById("calendar");

        new FullCalendar.Draggable(containerEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                return {
                    title: eventEl.innerText.trim()
                };
            }
        });

        const calendar = new FullCalendar.Calendar(calendarEl, this.calendarOptions);
        calendar.render();
    }
};
</script>
  
<style scoped>
body {
    margin-top: 40px;
    font-size: 14px;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
}

#external-events {
    position: fixed;
    left: 20px;
    top: 20px;
    width: 150px;
    padding: 0 10px;
    border: 1px solid #ccc;
    background: #eee;
    text-align: left;
}

#external-events h4 {
    font-size: 16px;
    margin-top: 0;
    padding-top: 1em;
}

#external-events .fc-event {
    margin: 3px 0;
    cursor: move;
}

#external-events p {
    margin: 1.5em 0;
    font-size: 11px;
    color: #666;
}

#external-events p input {
    margin: 0;
    vertical-align: middle;
}

#calendar-wrap {
    margin-left: 200px;
}

#calendar {
    max-width: 1100px;
    margin: 0 auto;
}
</style>