import {createStore} from 'vuex'

export default createStore({
    state: {
        headerType: "non_member", // 기본 헤더 타입
        account: {
            id: 0,
        }
    },
    getters: {},
    mutations: {
        setHeaderType(state, headerType) {
            state.headerType = headerType;
        },
        setAccount(state, payload) {
            state.account = payload;
        }
    },
    actions: {},
    modules: {}
})
