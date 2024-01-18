import myImage from '@/assets/img/코딩춘식.jpeg';

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export function getEventColor(title) {
  switch (title) {
    case '아침':
      return '#000000'; 
    case '점심':
      return '#fbd75c'; 
    case '저녁':
      return '#fbd75d'; 
    // 여기에 더 많은 case를 추가하여 다른 제목에 대한 색상을 지정할 수 있습니다.
    default:
      return '#378006'; // 제목이 지정되지 않은 경우의 기본 색상
  }
}



export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: '설정해보세요',
    start: todayStr,
    end: '2024-01-11',
    img:myImage,
    
    color: getEventColor('아침'), // 색상 함수를 호출하여 색상 지정
  },
  // 여기에 더 많은 이벤트를 추가할 수 있습니다.
];

export function createEventId() 
{



  return String(eventGuid++);
}
