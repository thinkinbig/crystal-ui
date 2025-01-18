<template>
  <div :class="themeClass">
    <CrystalLayout v-model:currentComponent="currentComponent">
      <component :is="currentComponent" />
    </CrystalLayout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useThemeStore } from '@/stores/themeStore'
import CrystalLayout from './components/Layout/CrystalLayout.vue'
import Component1 from './components/Component1.vue'
import Component2 from './components/Component2.vue'

export default defineComponent({
  name: 'CrystalDashboard',
  components: {
    CrystalLayout,
    Component1,
    Component2
  },
  setup() {
    const currentComponent = ref('Component1')
    const themeStore = useThemeStore()
    themeStore.initTheme()

    return {
      currentComponent,
      themeClass: themeStore.themeClass
    }
  }
})
</script>