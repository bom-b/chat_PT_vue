
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export function getEventColor(title) {
  const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#000080']; // 빨강, 주황, 노랑, 초록, 파랑, 남색
  return colors[title % colors.length];
}
