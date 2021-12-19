<template>
    <v-card color="primary" dark>
        <v-card-text class="pt-3">
            데이터를 처리중입니다...
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
    methods: {
    },
}
</script>