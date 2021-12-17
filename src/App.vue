<template>
    <component :is="resolveLayout">
        <!-- 공통영역에 띄울 팝업컴포넌트 정의 -->
        <v-dialog
            v-model="this.$store.state.dialog.isOpen"
            :fullscreen="this.$store.state.dialog.screen"
            :persistent="this.$store.state.dialog.persistent"
            :max-width="this.$store.state.dialog.maxWidth"
            :hide-overlay="this.$store.state.dialog.isOverlay"
            :transition="this.$store.state.dialog.transition"
            :scrollable="this.$store.state.dialog.scrollable"
        >
            <component
                v-if="this.$store.state.dialog.component"
                :is="this.$store.state.dialog.component"
                :params="this.$store.state.dialog.params"
            >
            </component>
        </v-dialog>

        <router-view></router-view>
    </component>
</template>

<script>
import {computed} from '@vue/composition-api'
import {useRouter} from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'

export default {
    components: {
        LayoutBlank,
        LayoutContent,
    },
    setup() {
        const {route} = useRouter()

        const resolveLayout = computed(() => {
            // Handles initial route
            if (route.value.name === null)
            {
                return null;
            }

            if (route.value.meta.layout === 'blank')
            {
                return 'layout-blank';
            }

            return 'layout-content';
        })

        return {
            resolveLayout,
        }
    },
}
</script>
