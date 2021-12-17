<template>
    <v-card>
        <v-card-title>사용자조회</v-card-title>

        <v-row class="ma-0 px-2">
            <v-col cols="12">
                <v-radio-group v-model="searchType" row class="mt-0" hide-details>
                    <v-radio value="01" label="사용자ID"></v-radio>
                    <v-radio value="02" label="행번"></v-radio>
                </v-radio-group>
                <v-text-field v-model="user_info" class="mt-5" :label="searchType == '01' ? '사용자ID' : '행번'" dense outlined ></v-text-field>
                <v-select v-model="search_reason" outlined dense label="조회사유" :items="['고객요청','여신심사']"></v-select>
            </v-col>
        </v-row>

        <v-row class="ma-0 pb-5 px-2">
            <v-col cols="12">
                <v-btn color="primary" class="me-3" @click.prevent="uf_search">조회</v-btn>
                <v-btn color="error" outlined type="reset" @click.prevent="uf_reset">초기화</v-btn>
            </v-col>
        </v-row>

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
                        <tr v-for="item in desserts" :key="item.dessert" @click.prevent="uf_open">
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
    </v-card>
</template>

<script>
export default {
    setup() {

    },
    data() {
        return {
            isSearch      : false,
            searchType    : "01",
            search_reason : "",
            user_info     : "",
            desserts      : [],
            //
            /*
            isOpen : false,
            params : null,
            dialogComponent : null,
            */
        }
    },
    methods : {
        uf_reset : function()
        {
            this.isSearch      = false;
            this.searchType    = "01";
            this.search_reason = "";
            this.user_info     = "";
            this.desserts      = [];
        },
        uf_search : function()
        {
            this.$common().alert();
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

            this.isSearch = true;
        },
        uf_open : function ()
        {
            this.$common().openPopup("/user-search/UserDetail");
        },
        closeCallback : function(params)
        {
        }
    }
}
</script>
