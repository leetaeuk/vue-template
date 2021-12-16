let _ARRAY_HISTORY = [];
const HistoryPlugin = {
    /**
     * 히스토리 초기화
     */
    init : function()
    {
        _ARRAY_HISTORY = [];
    },

    /**
     * 전체 히스토리 가져오기
     * @returns {*[]}
     */
    getAllHistory : function()
    {
        return _ARRAY_HISTORY;
    },

    /**
     * 히스토리 갯수
     * @returns {number}
     */
    getHistorySize : function()
    {
        return _ARRAY_HISTORY.length;
    },

    /**
     * 히스토리 추가
     * currentPageId              : 현재 페이지
     * svcId                      : 이동할 페이지
     * options
     */
    add : function(currentPageId, svcId, paramJson, options)
    {
        _ARRAY_HISTORY.push({
            CURRENT_PAGE_ID    : currentPageId,
            SVC_ID             : svcId,
            PARAMETER          : paramJson,
            OPTIONS            : options
        });
    },

    /**
     * 히스토리 변경
     * @param currentPageId
     * @param svcId
     * @param paramJson
     * @param options
     */
    change : function(svcId, paramJson, options)
    {
        for(let idx=this.getHistorySize()-1; idx>=0; idx--)
        {
            if( svcId == _ARRAY_HISTORY[idx]["SVC_ID"] )
            {
                _ARRAY_HISTORY[idx]["PARAMETER"] = paramJson;
                _ARRAY_HISTORY[idx]["OPTIONS"  ] = options;

                break;
            }
        }
    },

    /**
     * 해당 서비스 아이디 까지 히스토리 삭제(없을시 모두삭제)
     */
    removeFindSvcId : function(svcId)
    {
        for(let idx=this.getHistorySize()-1; idx>=0; idx--)
        {
            if( svcId == _ARRAY_HISTORY[idx]["SVC_ID"] )
            {
                break;
            }
            _ARRAY_HISTORY.pop();
        }
    },

    /**
     * 현재 active 된 화면의 이후 idx 모두 삭제하기
     * 1-2-3-4-5 화면에서 '3'으로 화면 이동시 '4','5' 히스토리 데이터는 삭제시킴
     */
    remove : function(idx)
    {
        let rIdx = idx+1;
        let historyLength = this.getAllHistory().length;

        for(let i=0; i<historyLength; i++)
        {
            // active 된 화면의 이후 history 제거
            if(i == historyLength-1)
            {
                this.getAllHistory().splice(rIdx, historyLength);
            }
        }
    },

    /**
     * 히스토리 마지막 1개 삭제(일반적 뒤로가기의 경우)
     */
    pop : function()
    {
        _ARRAY_HISTORY.pop();

        if( this.getHistorySize() > 0 )
        {
            return _ARRAY_HISTORY[_ARRAY_HISTORY.length-1];
        }

        return null;
    },
    /**
     * 히스토리 가장 마지막에 등록된 서비스 정보 가져오기
     */
    getLastSvcInfo : function()
    {
        let historySize = this.getHistorySize();
        if( _ARRAY_HISTORY && historySize > 0 )
        {
            return _ARRAY_HISTORY[historySize-1];
        }

        return null;
    },

    /**
     * 히스토리 SVC_ID에 등록된 정보
     * @param svcId
     * @returns {null|*}
     */
    getSvcInfo : function(svcId)
    {
        let historySize = this.getHistorySize();
        if( _ARRAY_HISTORY && historySize > 0 )
        {
            for(let idx=this.getHistorySize()-1; idx>=0; idx--)
            {
                if( svcId === _ARRAY_HISTORY[idx]["SVC_ID"] )
                {
                    return _ARRAY_HISTORY[idx];
                }
            }
        }

        return null;
    }
}

export default HistoryPlugin;