import axios from "axios";

let ASYNC   = true;
let ERRTRX  = true;
let SENDURL = "";
let PARAMS  = {};

const AxiosPlugin = {
    createAxios : function(url)
    {
        ASYNC   = true;
        ERRTRX  = true;
        SENDURL = url;
        PARAMS  = {};

        return this;
    },
    setAsync : function(isAsync)
    {
        ASYNC  = isAsync;
    },
    setErrTrx : function (isErrTrx)
    {
        ERRTRX  = isErrTrx;
    },
    set : function()
    {
        if( arguments.length === 1 )
        {
            PARAMS = arguments[0];
        }
        else if( arguments.length === 2 )
        {
            PARAMS[arguments[0]] = arguments[1];
        }
    },
    execute : async function (callback)
    {
        let headers = {
            "headers" : {
                "timeout"      : "60000",
                "cache-control": "no-cache",
                "pragma"       : "no-cache",
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        };

        let parameters = new FormData();
        parameters.append("_JSON_", encodeURIComponent(JSON.stringify(PARAMS)));

        if( ASYNC === false )
        {
            await axios.post(SENDURL, parameters, headers).then((result) => {
                if( ERRTRX === false )
                {
                    callback(result.data, this);
                }
                else
                {
                    alert(result.data.COMMON_HEAD.MESSAGE)
                }
            }).catch(e => {
                alert(e);
            });
        }
        else
        {
            axios.post(SENDURL, parameters, headers).then((result) => {
                if( ERRTRX === false )
                {
                    callback(result.data, this);
                }
                else
                {
                    alert(result.data.COMMON_HEAD.MESSAGE)
                }
            }).catch(e => {
                alert(e);
            });
        }
    }
}

export default AxiosPlugin;