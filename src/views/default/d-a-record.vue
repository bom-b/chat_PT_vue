<template>
      <br><br><br><br>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          주말 적용
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>기록 ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <i>{{ event.title }}</i>
            <b>{{ event.img }}</b>
            <b>{{ event.startStr }}</b>
            <b>{{ event.calories }}</b>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        ref="fullCalendar"
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>


    <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h3>이벤트 정보</h3>
      <p>제목: {{ selectedEvent.title }}</p>
      <img :src="selectedEvent.img" alt="Event image" v-if="selectedEvent.img" 
      class="img-event"/>
      <p >칼로리: {{ selectedEvent.calories }}</p>
      <p>날짜: {{ formatEventDate(selectedEvent.startStr) }}</p>
      <div class="row">
      <button type="button" class="btn btn-danger" @click="deleteEvent(selectedEvent.id)">삭제</button>
      <button type="button" class="btn btn-success" @click="closeModal">닫기</button>
    </div>
    </div>
  </div>


  <!-- <div v-if="showEventInputModal" class="modal modalInput">
  <h3 style="color: aliceblue;">이벤트 정보</h3>
  <div>
  <input type="radio" id="breakfast" value="아침" v-model="selectedEvent.title" class="radio-button">
  <label for="breakfast" class="radio-button-label">아침</label>

  <input type="radio" id="lunch" value="점심" v-model="selectedEvent.title" class="radio-button">
  <label for="lunch" class="radio-button-label">점심</label>

  <input type="radio" id="dinner" value="저녁" v-model="selectedEvent.title" class="radio-button">
  <label for="dinner" class="radio-button-label">저녁</label>

  <input type="radio" id="snack" value="간식" v-model="selectedEvent.title" class="radio-button">
  <label for="snack" class="radio-button-label">간식</label>
</div>
  <input type="file" @change="handleImageUpload" />
  <div v-if="imagePreview" class="image-preview-container">
    <img :src="imagePreview" class="image-preview" alt="미리보기 이미지" />
  </div>
<div>
  <button type="button" class="btn2 btn-primary" @click="insertMyCalendar">등록</button>
  <button type="button" class="btn2 btn-success" @click="closeInput">닫기</button>
</div> -->



<!-- </div> -->


  </div>
</template>


<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS , getEventColor } from './event-utils'
import dayjs from 'dayjs'

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
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      showModal: false,
      showEventInputModal: false,
      selectedEvent: 
      {
        title:'',
        img:'',
        startStr:'',
        endStr:'',
        calories: null,
        time: null
      },
      imagePreview: null, 
      currentEvents: [],
      
    }
  },

  created()
  {
    this.fetchEvents();
  },
  mounted() 
  {
   
  },

  methods: {
    formatEventDate(dateStr) 
    {
      return dayjs(dateStr).format('YYYY-MM-DD'); // Day.js를 사용하여 날짜 포맷
    },
    fetchEvents() 
    {
  this.$axios.get('/myCalendarList')
    .then(response => {
      let eventsFromServer = response.data.map(eventData => {
        // 날짜 형식을 'YYYY-MM-DD'로 변환합니다.
        let [year, month, day] = eventData.startStr.split('/');
        year = '20' + year; // 2자리 연도를 4자리로 변환합니다.
        let startDate = `${year}-${month}-${day}`; // ISO 8601 형식으로 조정합니다.

        [year, month, day] = eventData.endStr.split('/');
        year = '20' + year; // 2자리 연도를 4자리로 변환합니다.
        let endDate = `${year}-${month}-${day}`; // ISO 8601 형식으로 조정합니다.

        return {
          id: eventData.eventNum,
          title: eventData.title,
          start: startDate,
          end: endDate, 
          color: getEventColor(eventData.title),
          // 기타 필요한 속성들...
        };
      });

      // 이벤트를 캘린더에 추가하기 전에 기존 이벤트를 모두 제거합니다.
      const calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.removeAllEvents(); // 기존 이벤트를 모두 제거합니다.

      // 현재 이벤트를 저장하고 캘린더에 추가합니다.
      this.currentEvents = eventsFromServer;
      this.currentEvents.forEach(event => calendarApi.addEvent(event));
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
  },

  handleWeekendsToggle() 
  {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
  },
  handleDateSelect(selectInfo) 
  {
    this.selectedEvent = {
    ...this.selectedEvent, // 기존의 selectedEvent 속성 유지
    img: this.selectedEvent.img,
    startStr: dayjs(selectInfo.start).format('YYYY-MM-DD'), // 시작 날짜 포맷팅
    endStr: dayjs(selectInfo.end).format('YYYY-MM-DD'), // 종료 날짜 포맷팅
  };
  this.showEventInputModal = true; // 입력 모달 표시
  },
    handleEventClick(clickInfo) 
    {
      this.selectedEvent = 
      {
        ...clickInfo.event.extendedProps,
        title: clickInfo.event.title,
        startStr: clickInfo.event.start.toISOString(),
        id: clickInfo.event.id // 이벤트 ID를 저장
      };
      this.showModal = true;
    },

    handleEvents(events) 
    {
      this.currentEvents = events
    },
    deleteEvent(eventId) {
  let calendarApi = this.$refs.fullCalendar.getApi(); // FullCalendar 인스턴스에 접근
  let event = calendarApi.getEventById(eventId); // 이벤트 ID로 이벤트 인스턴스를 가져옴

  if (event) {
    let num = event.id;
    console.log(num);

    // Axios DELETE 요청, num을 URL 경로에 포함
    this.$axios.delete(`/delteCalendarInfo/${num}`)
      .then(resp => {
        console.log(resp);
        event.remove(); // 이벤트가 존재하면 삭제
        alert("삭제되었습니다.");
        this.showModal = false;
      })
      .catch(err => {
        console.error("이벤트 삭제 중 오류 발생", err);
      });
  }
}
,

    handleImageUpload(event) 
    {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) 
      {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result; // 결과 데이터를 이미지 미리보기 속성에 저장
        };
        reader.readAsDataURL(file); // 파일을 Data URL로 읽기
      }
    },

    closeModal()
    {
      this.showModal = false;
    },
    closeInput()
    {
      this.imagePreview = null;
      this.showEventInputModal = false;
    },
  //   insertMyCalendar() {
  //   // 새 이벤트 객체 생성
  //   const newEvent = {
      
  //     title: this.selectedEvent.title,
  //     start: this.selectedEvent.startStr,
  //     end: this.selectedEvent.endStr,
  //     img: this.imagePreview, // 이미지 미리보기 또는 업로드된 이미지 URL
  //     // 필요한 추가 데이터...
  //   };

  //   // 서버에 새 이벤트 저장 요청
  //   this.$axios.post("/insertCalendar", newEvent)
  //     .then(response => {
  //       // 성공 응답 처리
  //       console.log("이벤트가 성공적으로 저장되었습니다.", response);

  //       // 서버에서 반환된 이벤트 ID로 새 이벤트 객체 업데이트 (예시)
  //       if (response.data && response.data.eventId) {
  //         newEvent.id = response.data.eventId;
  //       }

  //       // 현재 이벤트 목록에 새 이벤트 추가
  //       this.currentEvents.push(newEvent);

  //       // FullCalendar 인스턴스에 새 이벤트 추가
  //       const calendarApi = this.$refs.fullCalendar.getApi();
  //       calendarApi.addEvent(newEvent);

  //       // 모달 닫기 및 선택된 이벤트 초기화
  //       this.closeInput();
  //     })
  //     .catch(error => {
  //       // 오류 응답 처리
  //       console.error("이벤트 저장 중 오류가 발생했습니다.", error);
  //     });
  // },




  }
})
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

b { /* used for event dates/times */
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

.fc { /* the calendar root */
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
  margin:auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px; /* 내부 여백 */
  border-radius: 5px; /* 테두리 둥글게 */
  max-width: 800px; /* 최대 너비 */
  max-height: 600px; /* 최대 높이 */
  overflow: auto; /* 내용이 넘치면 스크롤바 생성 */
}

.img-event {
  max-width: 300px; /* 이미지의 최대 너비 */
  max-height: 300px; /* 이미지의 최대 높이 */
  object-fit: cover; /* 이미지가 지정된 영역을 채우도록 조정 */
  display: block; /* 이미지를 블록 요소로 만들어 줌 */
  margin-left: 30%;
}

.btn{
  width:10%;
  display: block;
  margin: 0 10px;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalInput {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  max-width: 500px; /* 최대 너비 조정 */
  max-height: 50%; /* 최대 높이 조정 */
  width: auto; /* 너비 자동 조정 */
  display: flex;
  flex-direction: column; /* 요소들을 수직으로 정렬 */
  justify-content: center; /* 센터 정렬 */
  align-items: center; /* 가로축 기준 센터 정렬 */
}

/* 라디오 버튼 숨기기 */
.radio-button {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* 라벨을 버튼처럼 보이게 하기 */
.radio-button-label {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #f0f0f0; /* 기본 배경색 */
  border: 1px solid #ddd; /* 테두리 */
  border-radius: 5px; /* 둥근 테두리 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}

/* 선택된 라디오 버튼의 라벨 스타일 */
.radio-button:checked + .radio-button-label {
  background-color: #0fcf59; /* 선택된 항목의 배경색 */
  color: white; /* 선택된 항목의 텍스트 색상 */
}

/* 호버 효과 */
.radio-button-label:hover {
  background-color: #e7e7e7;
}

.image-preview-container {
    margin-top: 10px; /* 이미지와 다른 컨텐츠와의 간격 조절 */
  }

  .image-preview {
    width: 100px; /* 미리보기 이미지의 너비 */
    height: 100px; /* 미리보기 이미지의 높이 */
    object-fit: contain; /* 이미지 비율 유지 */
    border: 1px solid #ddd; /* 이미지 테두리 */
    border-radius: 5px; /* 테두리 둥글게 */
  }

</style>
