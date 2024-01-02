import { createStore } from 'vuex'

export default createStore({
  state: {
    headerType: null, // 기본 헤더 타입
    
    // 윤승현 테스트
    // new_data: [
    //     { name: "홍길동", age: "18", phone: "010-1111-2222", weight: 87, goal: "다이어트" },
    //     { name: "김첨지", age: "24", phone: "010-3333-4444", weight: 66, goal: "증량" },
    //     { name: "놀부", age: "24", phone: "010-5555-6666", weight: 57, goal: "재활" }, 
    //   ]
    },
  getters: {
  },
  mutations: {
    setHeaderType(state, headerType) {
      state.headerType = headerType;
    },
  },
  actions: {
  },
  modules: {
  }
})
