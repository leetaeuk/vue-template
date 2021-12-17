import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 다이얼로그 수행팝업 json
        dialog : {
            isOpen    : false,// OPEN여부
            component : null, // 동적컴포넌트
            params    : null, // 파라미터
            screen    : false,// 스크린종류
            persistent: true, // 팝업이외 영역클릭시 닫히지 않게하는 여부
            maxWidth  : 500,  // 최대너비
            transition: null, // 표현방식
            isOverlay : true,
            scrollable: true,
            vm        : null, // openPopup을 수행한 영역의 this 객체
        }
    },
    mutations: {
        /**
         * 팝업호출
         * @param state
         * @param payload
         */
        openPopup(state, payload)
        {
            state.dialog.isOpen     = true;               // 팝업오픈
            state.dialog.component  = payload.component;  // 동적컴포넌트 할당
            state.dialog.params     = payload.params;     // 파라미터
            state.dialog.screen     = payload.screen;     // 스크린종류
            state.dialog.persistent = payload.persistent; // 팝업이외 영역클릭시 닫히지 않게하는 여부
            state.dialog.maxWidth   = payload.maxWidth;   // 최대너비
            state.dialog.transition = payload.transition; // 표현방식
            state.dialog.isOverlay  = payload.isOverlay;  // Overlay
            state.dialog.scrollable = payload.scrollable; // scrollable
            state.dialog.vm         = payload.vm;         // openPopup을 수행한 영역의 this 객체
        },
        /**
         * 팝업종료
         * @param state
         * @param payload
         */
        closePopup(state, payload)
        {
            state.dialog.vm.closeCallback(payload); // 호출된 영역에서의 콜백함수 수행

            state.dialog.isOpen     = false; // 팝업종료
            state.dialog.params     = null;  // 파라미터초기화
            state.dialog.vm         = null;  // openPopup을 수행한 영역의 this 객체 초기화
        },
    },
    modules: {},
})
