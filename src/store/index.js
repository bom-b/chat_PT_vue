import {createStore} from 'vuex'

export default createStore({
    state: {
        headerType: "non_member", // 기본 헤더 타입
        newKakaoUserData : {}
    },
    getters: {},
    mutations: {
        setHeaderType(state, headerType) {
            state.headerType = headerType;
        },
        newKakaoUserData(state, payload) {
            state.newKakaoUserData = payload;
        }
    },
    actions: {},
    modules: {}
})
