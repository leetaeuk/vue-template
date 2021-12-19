<template>
    <v-card color="primary" dark>
        <v-card-text class="pt-3">
            {{ message }}
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Loading",

    props: {
        isOpen: {type: Boolean, default: false},
        params: {type: Object},
    },
    data() {
        let message = "데이터를 처리중입니다...";
        if( this.params )
        {
            if( this.params.message )
            {
                message = this.params.message;
            }
        }

        return {
            message : message,
        }
    },
    methods: {
    },
}
</script>