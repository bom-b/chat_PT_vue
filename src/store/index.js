import {createStore} from 'vuex'

export default createStore({
    state: {
        headerType: "non_member", // 기본 헤더 타입
    },
    getters: {},
    mutations: {
        setHeaderType(state, headerType) {
            state.headerType = headerType;
        },
    },
    actions: {},
    modules: {}
})
