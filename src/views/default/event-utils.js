
import axios from 'axios'

let eventGuid = 0
// let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [

]

export function createEventId() {
  return String(eventGuid++)
}

// 값 가져오기
export function loadEvents()
{

  axios.get('').
  then((resp) =>{
    console.log(resp)
  }).catch((error) =>{error.message})
  

  console.log(this.todayStr);
  // INITIAL_EVENTS.append();
}

// 최대 10개만 나오게 하기
export function topten()
{

}
export function saveEvents()
{

}


