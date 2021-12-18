import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dialog : []
    },
    mutations: {
        /**
         * 팝업호출
         * @param state
         * @param payload
         */
        openPopup(state, payload)
        {
            let dialog = {};
            dialog.isOpen     = true;               // 팝업오픈
            dialog.component  = payload.component;  // 동적컴포넌트 할당
            dialog.dialogType = payload.dialogType; // 타입
            dialog.params     = payload.params;     // 파라미터
            dialog.fullscreen = payload.fullscreen; // 스크린종류
            dialog.persistent = payload.persistent; // 팝업이외 영역클릭시 닫히지 않게하는 여부
            dialog.maxWidth   = payload.maxWidth;   // 최대너비
            dialog.transition = payload.transition; // 표현방식
            dialog.callback   = payload.callback;   // 콜백함수
            dialog.isOverlay  = payload.isOverlay;  // overlay 여부
            dialog.scrollable = payload.scrollable; // 고정 header 여부
            dialog.vm         = payload.vm;         // openPopup을 수행한 영역의 this 객체

            state.dialog.push(dialog);

            // 팝업이 떠있는 경우는 메인 스크롤을 히든처리하고 모든 팝업이 종료된 경우는 기존대로 되돌린다.
            if( state.dialog.length == 0 )
            {
                document.getElementsByTagName('html')[0].style.overflowY = 'auto'
            }
            else
            {
                document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
            }
        },
        /**
         * 팝업종료
         * @param state
         * @param payload
         */
        closePopup(state, payload)
        {
            let dialogInfo = state.dialog[state.dialog.length-1];

            if( dialogInfo.callback && typeof dialogInfo.callback === "function" )
            {
                //dialogInfo.vm.closeCallback(payload); // 호출된 영역에서의 콜백함수 수행
                dialogInfo.callback(payload); // 호출된 영역에서의 콜백함수 수행
            }

            dialogInfo.isOpen     = false; // 팝업종료
            //dialogInfo.params     = null;  // 파라미터초기화
            //dialogInfo.vm         = null;  // openPopup을 수행한 영역의 this 객체 초기화

            // 팝업이 떠있는 경우는 메인 스크롤을 히든처리하고 모든 팝업이 종료된 경우는 기존대로 되돌린다.
            // -1을 한 이유는 0.3초 이후에 dialog array가 pop이 되므로 화면떨림현상제거를 위해 스크롤은 미리 생성처리하기 위함
            if( state.dialog.length-1 === 0 )
            {
                document.getElementsByTagName('html')[0].style.overflowY = 'auto'
            }
            else
            {
                document.getElementsByTagName('html')[0].style.overflowY = 'hidden'
            }

            // dialog transition time이 0.3초 이므로 0.3초 이후에 컴포넌트를 삭제처리 함
            setTimeout(()=> {
                state.dialog.pop();
            }, 300);
        },
    },
    modules: {},
})
