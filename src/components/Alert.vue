<template>
    <v-card>
        <v-card-title class="headline">
            {{ title }}
        </v-card-title>
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" outlined @click="close()">Disagree</v-btn>
            <v-btn color="success" @click="closeDialog()">Agree</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "alert",

    props: {
        isOpen: {type: Boolean, default: false},
        params: {type: Object},
    },
    methods: {
        closeDialog() {
            let param = {A: "1"}
            this.$common().closePopup(param);
        },
        close() {
            this.$common().closePopup();
        }
    },
    data() {
        let title   = "안내메시지";
        let message = "";
        if( this.params )
        {
            if( this.params.title )
            {
                title = this.params.title;
            }
            if( this.params.message )
            {
                message = this.params.message;
            }
        }

        return {
            title   : title,
            message : message,
        }
    }
}
</script>

<style scoped>

</style>