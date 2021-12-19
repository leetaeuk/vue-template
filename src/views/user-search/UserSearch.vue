<template>
    <v-card>
        <v-card-title>사용자조회</v-card-title>

        <!---------------------------------------------------->
        <!-- 입력 영역 시작 -->
        <!---------------------------------------------------->
        <!-- 입력정보 -->
        <v-form ref="form" lazy-validation>
            <v-row class="ma-0 px-2">
                <v-col cols="12">
                    <v-radio-group v-model="searchType" row class="mt-0" hide-details>
                        <v-radio value="01" label="사용자ID"></v-radio>
                        <v-radio value="02" label="고객번호"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        v-model="user_info"
                        :rules="[
                            v => !!v || (searchType == '01' ? '사용자ID' : '고객번호') + '는 필수 입력사항입니다.',
                            v => (v && v.length <= 10) || (searchType == '01' ? '사용자ID' : '고객번호') + '는 10자리 이하로 입력하세요',
                        ]"
                        required hide-details="auto"
                        :prepend-inner-icon="icons.mdiAccountOutline" dense outlined
                        :label="searchType == '01' ? '사용자ID' : '고객번호'"
                    >
                    </v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-select
                        v-model="search_reason"
                        :rules="[
                            v => !!v || '조회사유는 필수 입력사항입니다.',
                        ]"
                        required hide-details="auto"
                        :prepend-inner-icon="icons.mdiFileMultipleOutline" outlined dense
                        label="조회사유"
                        :items="['고객요청','여신심사']"
                    >
                    </v-select>
                </v-col>

                <v-col sm="6" cols="12">
                    <Calendar
                        ref="sdt"
                        :rules="[
                            v => !!v || '조회시작일자는 필수 입력사항입니다.',
                        ]"
                        required hide-details="auto"
                        :date="new Date().toISOString().substr(0, 10)"
                        label="조회시작일자"
                    >
                    </Calendar>
                </v-col>
                <v-col sm="6" cols="12">
                    <Calendar
                        ref="edt"
                        :rules="[
                            v => !!v || '조회종료일자는 필수 입력사항입니다.',
                        ]"
                        required hide-details="auto"
                        :date="new Date().toISOString().substr(0, 10)"
                        label="조회종료일자"
                    >
                    </Calendar>
                </v-col>
            </v-row>
        </v-form>

        <!-- 실행버튼 -->
        <v-row class="ma-0 pb-5 px-2">
            <v-col cols="12">
                <v-btn color="primary" :disabled="isTrxLoading" :loading="isTrxLoading" class="me-3" @click.prevent="uf_search">조회</v-btn>
                <v-btn color="error" outlined type="reset" @click.prevent="uf_reset">초기화</v-btn>
            </v-col>
        </v-row>
        <!---------------------------------------------------->
        <!-- 입력 영역 종료 -->
        <!---------------------------------------------------->


        <!---------------------------------------------------->
        <!-- 실행결과 영역 시작 -->
        <!---------------------------------------------------->
        <v-row class="ma-0 px-2" v-show="isSearch">
            <v-col cols="12">
                <v-simple-table height="250" fixed-header>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-center text-uppercase">매체</th>
                            <th class="text-center text-uppercase">성명</th>
                            <th class="text-center text-uppercase">아이디</th>
                            <th class="text-center text-uppercase">고객번호</th>
                            <th class="text-center text-uppercase">보안매체</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in desserts" :key="item.desserts" :value="JSON.stringify(item)" @click.prevent="uf_open">
                            <td class="text-center">{{ item.dessert }}</td>
                            <td class="text-center">{{ item.calories }}</td>
                            <td class="text-left">{{ item.fat }}</td>
                            <td class="text-center">{{ item.carbs }}</td>
                            <td class="text-left">{{ item.protein }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <!---------------------------------------------------->
        <!-- 실행결과 영역 종료 -->
        <!---------------------------------------------------->
    </v-card>
</template>

<script>
import { mdiAccountOutline, mdiFileMultipleOutline } from '@mdi/js'

export default {
    data() {
        return {
            isTrxLoading  : false,
            isSearch      : false,
            searchType    : "01",
            search_reason : "",
            user_info     : "",
            desserts      : [],
            // icons
            icons: {
                mdiAccountOutline,
                mdiFileMultipleOutline,
            },
        }
    },
    methods : {
        uf_reset : function()
        {
            this.$refs.form.resetValidation();

            this.isTrxLoading  = false;
            this.isSearch      = false;
            this.searchType    = "01";
            this.search_reason = "";
            this.user_info     = "";
            this.desserts      = [];

            this.$refs.sdt.init();
            this.$refs.edt.init();
        },
        uf_search : function()
        {
            this.isSearch = false;
            if( this.$refs.form.validate() )
            {
                //this.isTrxLoading = true;
                this.$common().loading({isLoading:true, value:"isTrxLoading"});

                setTimeout(()=> {
                    this.desserts = [
                        {
                            dessert: "INT",
                            calories: "이태욱",
                            fat: "KINDLY007",
                            carbs: "123456789-1001",
                            protein: "OTP(033123123)",
                        },
                        {
                            dessert: 'PON',
                            calories: "이태욱",
                            fat: "KINDLY007",
                            carbs: "123456789-1001",
                            protein: "보안카드(033123123)",
                        },
                    ];

                    //alert(this.$refs.sdt.day)
                    this.isSearch = true;
                    this.$common().loading({isLoading:false, value:"isTrxLoading"});
                }, 2000);
            }

        },
        uf_open : function (e)
        {
            //alert(e.currentTarget.getAttribute("value"))
            /*
            this.$common().openPopup("/user-search/UserDetail", {a:"1"}, function () {
                alert(1)
            });
            */
            this.$common().openPopup("/views/user-search/UserDetail", {a:"1"});
        },
        closeCallback : function(params)
        {
            alert(JSON.stringify(params))
        }
    }
}
</script>
