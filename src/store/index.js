import {createStore} from 'vuex'

export default createStore({
    state: {
        headerType: "non_member", // 기본 헤더 타입
        newKakaoUserData : {} // 카카오 로그인 후 회원가입 페이지로 넘어갈 때 사용할 유저 정보
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
