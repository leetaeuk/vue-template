<template>
    <v-dialog
        ref="dialog"
        v-model="isOpen"
        :return-value.sync="day"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="day"
                :label="label"
                :prepend-icon="icons.mdiCalendar"
                v-bind="attrs"
                v-on="on"
                @blur="day = parseDate(day)"
            ></v-text-field>
        </template>

        <v-date-picker
            v-model="day"
            scrollable
            color="primary"
            locale="ko"
        >
            <v-btn text color="primary" @click="isOpen = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(day)">OK</v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
import {mdiCalendar} from "@mdi/js";

export default {
    name: "Calendar",

    props: {
        label: {type: String},
        date : {type: String},
    },
    data() {
        const isOpen = false;

        return {
            day : this.date,
            isOpen,

            // icons
            icons: {
                mdiCalendar,
            },
        }
    },
    methods : {
        init : function () {
            this.day = this.date;
        },
        parseDate : function(dates)
        {
            if (!dates || dates.replaceAll("-", "").length != 8 )
            {
                return this.date;
            }

            dates = dates.replaceAll("-", "");
            return dates.substring(0,4) + "-" + dates.substring(4,6) + "-" + dates.substring(6);
        }
    }
}
</script>