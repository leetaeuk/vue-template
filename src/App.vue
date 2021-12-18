<template>
    <component :is="resolveLayout">
        <!-- 공통영역에 띄울 팝업컴포넌트 정의 -->
        <v-dialog
            v-for="component in this.$store.state.dialog"
            v-model       = "component.isOpen"
            :fullscreen   = "component.fullscreen"
            :persistent   = "component.persistent"
            :max-width    = "component.maxWidth"
            :hide-overlay = "component.isOverlay"
            :transition   = "component.transition"
            :scrollable   = "component.scrollable"
        >
            <component
                v-if    = "component.component"
                :is     = "component.component"
                :params = "component.params"
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
