<template>
    <v-card tile>
        <v-toolbar
            flat
            dark
            color="primary"
        >
            <v-btn
                icon
                dark
                @click="close()"
            >
                <v-icon>{{ icons.mdiClose }}</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn
                    dark
                    text
                    class="my-auto"
                    @click="closeDialog()"
                >
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        Tool Tip Activator
                    </v-btn>
                </template>
                Tool Tip
            </v-tooltip>
            <v-list
                three-line
                subheader
            >
                <v-subheader>User Controls</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Content filtering</v-list-item-title>
                        <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Password</v-list-item-title>
                        <v-list-item-subtitle>Require password for purchase or use password to restrict purchase
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list
                three-line
                subheader
            >
                <v-subheader>General</v-subheader>
                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="notifications"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Notifications</v-list-item-title>
                        <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="sound"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Sound</v-list-item-title>
                        <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-action>
                        <v-checkbox v-model="widgets"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Auto-add widgets</v-list-item-title>
                        <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
    </v-card>
</template>

<script>
import {mdiClose} from '@mdi/js'

export default {
    name: "UserDetail",
    props: {
        isOpen: {type: Boolean, default: false},
        params: {type: Object, default: false},
    },
    setup() {
        return {
            // icon
            icons: {
                mdiClose,
            },
        }
    },
    data() {
        return {
            notifications: false,
            sound: true,
            widgets: false,
            items: [
                {
                    title: 'Click Me',
                },
                {
                    title: 'Click Me',
                },
                {
                    title: 'Click Me',
                },
                {
                    title: 'Click Me 2',
                },
            ],
            select: [
                {text: 'State 1'},
                {text: 'State 2'},
                {text: 'State 3'},
                {text: 'State 4'},
                {text: 'State 5'},
                {text: 'State 6'},
                {text: 'State 7'},
            ],
        }
    },
    methods: {
        closeDialog() {
            let param = {A: "1"}
            //this.$common().closePopup(param);
            this.$common().alert({message:"데이터를 확인하세요"});
        },
        close() {
            //this.$emit('close');
            this.$common().closePopup();
        },
        closeCallback : function(params)
        {
        }
    }
}
</script>
