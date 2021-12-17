import customHistory from "@/assets/js/history";

const CommonPlugin = {
    install(Vue)
    {
        /**
         * 뒤로가기 클릭시 처리(웹화면에서 처리)
         */
        window.onpopstate = function()
        {
            //this.locationBack();
        };
        /**
         * 공통함수 정의
         * @returns
         */
        Vue.prototype.$common = function()
        {
            let vm = this;

            return {
                location : function(pageId, params, options)
                {
                    //console.log('페이지 이동 :: ' + pageId);
                    //router.push({"name": pageId, "params": params});
                    let currentPageId   = vm.$router.currentRoute.name;
                    let isRedirect      = false;
                    let isHashChange    = false;

                    if( options != null && Object.keys(options).length > 0 )
                    {
                        // 페이지 로케이션 여부
                        if( options.isRedirect === true )
                        {
                            isRedirect = true;
                        }
                        // 페이지 로케이션 여부
                        if( options.isHashChange === true )
                        {
                            isHashChange = true;
                        }
                    }

                    // 페이지 로케이션
                    if( isRedirect )
                    {
                        //location.href = svcId + ".dptv";
                    }
                    // 페이지 로드
                    else
                    {
                        //let contElement = $("#page-content");

                        // 뒤로가기 처리시 hash정보가 남아있으면 show 처리만 한다.
                        if( isHashChange )
                        {
                            // 기존의 쌓여있는 hash가 있을 수 있으므로 모두 hide
                            //$(contElement).children().hide();

                            // hash가 false인 경우는 모두삭제처리
                            //$(contElement).find("[data-hash=false]").remove();

                            // 해당 페이지 show
                            //$("#" + svcId).show();
                            vm.$router.replace(pageId);
                        }
                        else
                        {
                            let test = false;
                            if( test )
                                //if( isNotAddcustomHistory )
                            {
                                // 히스토리 추가(현재페이지정보, 이동할페이지정보, 파라미터정보, 옵션)
                                customHistory.change(pageId, params, options);
                            }
                            else
                            {
                                // 히스토리 추가(현재페이지정보, 이동할페이지정보, 파라미터정보, 옵션)
                                customHistory.add(currentPageId, pageId, params, options);
                            }
                            vm.$router.replace({"name": pageId, "params": params});
                        }
                    }
                },
                locationBack : function(pageId, params, options)
                {
                    console.log("router.currentRoute.name :: [" + vm.$router.currentRoute.name + "]");
                    console.log("locationBack :: " + pageId);
                    /*
                    let pageInfo = DPF.com.getCurrentPageInfo();

                    // 팝업이 떠있는 상태에서 뒤로가기를 눌렀을 경우에는 팝업을 닫아준다.
                    if( pageInfo.PAGE_TYPE == "popup" )
                    {
                        //DPF.com.closePopup();
                        return;
                    }
                    */

                    // 서비스 아이디가 존재하는 경우는 인앱에서 사용자가 직접호출
                    if( pageId != null && pageId != undefined && pageId !== "" )
                    {
                        let lastSvcInfo = customHistory.getSvcInfo(vm.$router.currentRoute.name);

                        let param = {};
                        let opt   = {};
                        if( lastSvcInfo != null && lastSvcInfo != undefined )
                        {
                            param = lastSvcInfo.PARAMETER;
                            if( params )
                            {
                                param = params;
                            }

                            opt = lastSvcInfo.OPTIONS;
                            if( options )
                            {
                                opt = options;
                            }
                        }

                        // 히스토리 삭제
                        customHistory.removeFindSvcId(vm.$router.currentRoute.name);

                        // 페이지이동
                        this.location(vm.$router.currentRoute.name, param, opt, true);
                    }
                    // 서비스 아이디가 없는 경우는 모바일웹의 경우와 앱에서 백버튼 눌렀을 경우
                    else
                    {
                        let afterPopSvcInfo = customHistory.pop();

                        // 이전으로 갈 정보가 없으면 메인화면으로 이동처리
                        if( afterPopSvcInfo == null || afterPopSvcInfo == undefined )
                        {
                            // 페이지 이동
                            //this.goMain();
                            //router.replace("/")
                            //router.replace({"name": "index"});
                            vm.$router.push('/').catch(()=>{});
                        }
                        else
                        {
                            // 페이지 이동
                            this.location(afterPopSvcInfo.SVC_ID, afterPopSvcInfo.PARAMETER, afterPopSvcInfo.OPTIONS, true);
                        }
                    }
                },
                openPopup : function(pageId, params)
                {
                    //vm.dialogComponent = async () => (await import(`@/views${pageId}.vue`)).default
                    //vm.params          = params;
                    //vm.isOpen          = true;

                    let dialogComponent = async () => (await import(`@/views${pageId}.vue`)).default;
                    vm.$store.commit("openPopup", {
                        vm:vm,
                        params:params,
                        screen:true,
                        isOverlay:false,
                        scrollable:true,
                        transition:"dialog-bottom-transition",
                        component:dialogComponent
                    });
                },
                closePopup : function(params)
                {
                    if( params )
                    {
                        //vm.$emit('closeCallback', params);
                        vm.$store.commit("closePopup", params);
                    }
                    else
                    {
                        //vm.isOpen = false;
                        vm.$store.commit("closePopup");
                    }
                },
                alert : function(params)
                {
                    let dialogComponent = async () => (await import(`@/views/common/alert.vue`)).default;
                    vm.$store.commit("openPopup", {
                        vm:vm,
                        params:params,
                        screen:false,
                        persistent:true,
                        maxWidth:500,
                        component:dialogComponent
                    });
                },
                closeAlert : function(params)
                {
                    if( params )
                    {
                        //vm.$emit('closeCallback', params);
                        vm.$store.commit("closePopup", params);
                    }
                    else
                    {
                        //vm.isOpen = false;
                        vm.$store.commit("closePopup");
                    }
                }
            };
        };
    }
}

export default CommonPlugin;