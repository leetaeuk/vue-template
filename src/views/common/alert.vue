<template>
    <v-card>
        <v-card-title class="headline">
            Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even
            when no apps are running.
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" outlined @click="closeDialog()">Disagree</v-btn>
            <v-btn color="success" @click="closeDialog()">Agree</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "alert",

    props: {
        isOpen: {type: Boolean, default: false},
    },
    methods: {
        closeDialog() {
            let param = {A: "1"}
            this.$common().closeAlert(param);
        },
        close() {
            //this.$emit('close');
            this.$common().closeAlert();
        }
    }
}
</script>

<style scoped>

</style>